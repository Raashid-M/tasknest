from django.urls import include, path
from .views import *



urlpatterns = [
    
    #singup
    path('signup/', signup_user),

    #login 
    path('login/', login_user),

    #test
    path('test/', simple_test),
    path('post_test/', simple_post_test),
    
    #GET
    path('return_users/', return_users),
    path('project_members/',project_members),
    path('users/<int:user_id>/tasks/',return_tasks_by_user),
    
    
    #post 
    path('users/create/', create_user),
    
    #delete 
    path('user/delete/<int:user_id>/', delete_user),    
    
    #update
    #patch method
    path('users/<int:user_id>/update/', update_user),
    
    #create project
    path('projects/<int:user_id>/create_project/', create_project),
    path('projects/<int:project_id>/delete_project/', delete_project),
    path('projects/<int:project_id>/update_project/', update_project),    
    
    #get all projects 
    path('allprojects/', get_projects),
    
    #getuserprojects
    path('projects/', get_user_projects),
    
    #personal tasks 
    
    # path('tasks/personal/create/', create_personal_task),

    path('tasks/create/', create_task),

    path('tasks/personal/<int:user_id>/', get_personal_tasks),
    
    path('tasks/update/<int:task_id>/', update_task),
    
    path('tasks/delete/<int:task_id>/', delete_task),



]



