from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import HttpResponse, JsonResponse
from django.utils.dateparse import parse_date
from .models import *
from django.db.models import Q
from django.shortcuts import get_object_or_404
import json
from datetime import date

@csrf_exempt
def signup_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            name = data.get('name')
            email = data.get('email')
            password = data.get('password')

            # Check if user with the email already exists
            if Users.objects.filter(email=email).exists():
                return JsonResponse({"success": False, "message": "Email already exists."}, status=400)

            # Create and save user
            new_user = Users.objects.create(
                name=name,
                email=email,
                password=password  # NOTE: stored in plain text — for your personal project it's fine
            )

            return JsonResponse({"success": True, "user_id": new_user.id}, status=201)

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)

    return JsonResponse({"error": "POST method required"}, status=405)

def login_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            if not email or not password:
                return JsonResponse({"success": False, "message": "Email and password are required."}, status=400)

            try:
                user = Users.objects.get(email=email)
            except Users.DoesNotExist:
                return JsonResponse({"success": False, "message": "Invalid email or password."}, status=401)

            if user.password == password:
                return JsonResponse({
                    "success": True,
                    "user": {
                        "id": user.id,
                        "name": user.name,
                        "email": user.email
                    }
                })
            else:
                return JsonResponse({"success": False, "message": "Invalid email or password."}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "Invalid JSON format."}, status=400)

    return HttpResponse("This is a POST-only endpoint.", status=405)

#-----------------------------------------------------------------------------------------------------------
#get user projects 
def get_user_projects(request):
    user_id = request.GET.get("user")

    if user_id:
        try:
            user = Users.objects.get(pk=user_id)
        except Users.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)

        # Get projects where user is creator or member
        project_ids = ProjectMembers.objects.filter(user=user).values_list('project', flat=True)
        projects = Projects.objects.filter(
            Q(created_by=user) | Q(id__in=project_ids)
        ).distinct()
    else:
        # If no user param, return empty or handle accordingly
        return JsonResponse({"error": "User ID required"}, status=400)

    projects_serialized = []
    for project in projects:
        projects_serialized.append({
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "created_by": project.created_by.name if project.created_by else None,
            "created_at": project.created_at,
            "due_date": project.due_date,
            "icon": project.icon
        })

    return JsonResponse({"projects": projects_serialized})
#-------------------------------------------------------------------------------------------------------------
#create personal tasks 
# def create_personal_task(request):
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)

#             user = Users.objects.get(pk=data["user_id"])

#             task = Tasks.objects.create(
#                 title=data["title"],
#                 description=data.get("description", ""),
#                 due_date=parse_date(data["due_date"]),
#                 created_by=user,
#                 assigned_to=user,
#                 project=None  # personal task => no project
#             )

#             return JsonResponse({
#                 "success": True,
#                 "task_id": task.id,
#                 "title": task.title,
#                 "due_date": task.due_date,
#                 "created_by": user.name
#             })

#         except Users.DoesNotExist:
#             return JsonResponse({"success": False, "message": "User not found"}, status=404)
#         except KeyError as e:
#             return JsonResponse({"success": False, "message": f"Missing field: {str(e)}"}, status=400)
#         except Exception as e:
#             return JsonResponse({"success": False, "message": str(e)}, status=500)

#     return HttpResponse("Only POST allowed", status=405)


#personals tasks function 

def create_task(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            title = data.get('title')
            if not title:
                return JsonResponse({"error": "Title is required"}, status=400)

            description = data.get('description')
            due_date = data.get('due_date')
            created_by_id = data.get('created_by')
            assigned_to_id = data.get('assigned_to')  # optional
            project_id = data.get('project_id')       # optional

            created_by = get_object_or_404(Users, pk=created_by_id)

            assigned_to = (
                get_object_or_404(Users, pk=assigned_to_id)
                if assigned_to_id else created_by
            )

            project = (
                get_object_or_404(Projects, pk=project_id)
                if project_id else None
            )

            task = Tasks.objects.create(
                title=title,
                description=description,
                due_date=due_date,
                created_by=created_by,
                assigned_to=assigned_to,
                project=project
            )

            return JsonResponse({
                "success": True,
                "task_id": task.id,
                "title": task.title
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "POST only endpoint"}, status=405)



def get_personal_tasks(request, user_id):
    user = get_object_or_404(Users, pk=user_id)

    tasks = Tasks.objects.filter(
        created_by=user,
        assigned_to=user,
        project__isnull=True
    )

    tasks_serialized = []
    today = date.today()

    for task in tasks:
        # Check if the task is overdue
        if task.status == "pending" and task.due_date and task.due_date < today:
            task.status = "overdue"
            task.save()

        tasks_serialized.append({
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "due_date": task.due_date,
            "status": task.status
        })

    return JsonResponse({
        "user_id": user_id,
        "user_name": user.name,
        "personal_tasks": tasks_serialized
    })
    
    
#update the tasks 
def update_task(request, task_id):
    if request.method != "PATCH":
        return JsonResponse({"error": "This endpoint only accepts PATCH requests."}, status=405)

    task = get_object_or_404(Tasks, pk=task_id)
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    updated_fields = []

    if 'title' in data:
        task.title = data['title']
        updated_fields.append("title")
    if 'description' in data:
        task.description = data['description']
        updated_fields.append("description")
    if 'due_date' in data:
        task.due_date = data['due_date']
        updated_fields.append("due_date")
    if 'status' in data:
        task.status = data['status']
        updated_fields.append("status")

    task.save()

    return JsonResponse({
        "success": True,
        "updated_fields": updated_fields,
        "task": {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "due_date": task.due_date,
            "status": task.status
        }
    })
    
#delete tasks 
def delete_task(request, task_id):
    if request.method == "DELETE":
        task = get_object_or_404(Tasks, pk=task_id)
        task.delete()
        return JsonResponse({"success": True, "message": f"Task {task_id} deleted successfully."})
    else:
        return HttpResponse("This is a DELETE-only endpoint", status=405)

#---------------------------------------------------------------------------------------------------------

#get all projects 
def get_projects(request):
    if request.method == "GET":
        projects = Projects.objects.all()
        projects_serialized = []

        for project in projects:
            projects_serialized.append({
                "name": project.name,
                "description": project.description,
                "created_by": project.created_by.name if project.created_by else None,
                "created_at": project.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                "due_date": project.due_date,
                "icon": project.icon,
                
            })

        return JsonResponse({"projects": projects_serialized}, safe=False)

    return JsonResponse({"error": "GET only"}, status=405)

#create project
def create_project(request, user_id):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Fetch required user
            user = get_object_or_404(Users, pk=user_id) 

            # Create project with all fields
            project = Projects.objects.create(
                name=data['name'],
                description=data.get('description'),  # Optional
                created_by=user,
                due_date=data.get('due_date'),        # Expecting format 'YYYY-MM-DD'
                icon=data.get('icon')                 # icon name (e.g., 'ico2.svg')
            )

            return JsonResponse({
                "id": project.id,
                "name": project.name,
                "description": project.description,
                "created_by": user.name,
                "created_at": project.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                "due_date": project.due_date,
                "icon": project.icon
            })

        except KeyError as e:
            return JsonResponse({"error": f"Missing key: {str(e)}"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    else:
        return HttpResponse("This is a POST-only endpoint", status=405)
    
    
    
    
def delete_project(request, project_id):
        if request.method == 'DELETE':
            #check if the user exist 
            project = get_object_or_404(Projects, pk=project_id)
            #delete the user
            project.delete()
            
            return HttpResponse(f"the user with {project.name} has been deleted", status=200)
        
        else:
            return HttpResponse("this is a delete only endpoint", status=405)
    
def update_project(request, project_id):
    if request.method == "PATCH":
        project = get_object_or_404(Projects , pk=project_id)
        data = json.loads(request.body)
        
        if 'name' in data:
            project.name = data['name']
        
        if 'description' in data: 
            project.description = data['description']
        
        
        project.save()
        
        return JsonResponse(
           { 
            "id" : project.id,
            'name': project.name,
            'description': project.description
            }
        )
   
    else:
        return HttpResponse("this is a PATCH only page")




def update_user(request, user_id):
    if request.method == "PATCH":
        user = get_object_or_404(Users , pk=user_id)
        data = json.loads(request.body)
        
        if 'name' in data:
            user.name = data['name']
        
        if 'email' in data: 
            user.email = data['email']
        
        if 'password' in data:
            user.password= data['password']
        
        user.save()
        
        return JsonResponse(
           { 
            "id" : user.id,
            'name': user.name,
            'eamil': user.email
            }
        )
   
    else:
        HttpResponse("this is a PATCH only page")
    


def delete_user(request, user_id):
    if request.method == 'DELETE':
        #check if the user exist 
        user = get_object_or_404(Users, pk=user_id)
        #delete the user
        user.delete()
        
        return HttpResponse(f"the user with {user_id} has been deleted", status=200)
        
    else:
        return HttpResponse("this is a delete only endpoint", status=405)
        

def create_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print('data:', data['name'])
        
        user= Users.objects.create(
            name= data['name'],
            email= data['email'],
            password= data['password']
        )
        return JsonResponse(
           { 
            "id" : user.id,
            'name': user.name,
            'eamil': user.email
            }
        )
    
    else:
        return HttpResponse('this is a POSt only endpoint', status=405)



def return_tasks_by_user(request, user_id):
    user = get_object_or_404(Users, pk=user_id)
    tasks = Tasks.objects.filter(created_by=user)
    tasks_serialized = []   
    for task in tasks:
        tasks_serialized.append(
            {
                "id":task.id,
                'title':task.title,
                'discription':task.description,
                'project':task.project.name if task.project else "personal",
                'assigned_to':task.assigned_to.name if task.assigned_to else "unassigned"
            }
        )
        
    return JsonResponse({
       "user_id": user_id,
       "user_name":user.name,
       "user_email":user.email,
       "tasks": tasks_serialized
    })




def simple_test(a):
    return  HttpResponse("Hello world, this is the est page!")

def simple_post_test(abc):
    if abc.method == "POST":
        decoded_data = abc.body.decode('utf-8') #if we dont use this line the data will be printed as byte code 
        print(decoded_data)
        return HttpResponse("data has been recived")
    else:
        return HttpResponse("this is a post only page", status=405)
    

def return_users(request):
    users=Users.objects.all()
     #now the values will be returned as Users object(1) Users Object(2)......and os on
    users_serialized = []   #initialized an empty list to store all the users data in it
    for user in users:
        users_serialized.append(
            {
                "id":user.id,
                'name':user.name,
                'email':user.email,
            }
        )
    return JsonResponse(users_serialized, safe=False)
    
    
def project_members(project_id): 
    try:
        selected_project = Projects.objects.get(id=1)
    except Projects.DoesNotExist:
        return JsonResponse({"error": "Project not found"}, status=404)

    # Getting members of that selected project

    members = ProjectMembers.objects.filter(project=selected_project)

    member_list = []
    for member in members:
        member_list.append(
            {
            "id": member.user.id,
            "name": member.user.name,
            "email": member.user.email,
            }
            )

    return JsonResponse(member_list, safe=False)



