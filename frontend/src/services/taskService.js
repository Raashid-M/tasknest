export async function createTask(taskData) {
  try {
    const response = await fetch("https://raashid.pythonanywhere.com/tasknest/tasks/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Task creation failed:", data.error);
      return null;
    }

    return data; // contains success, task_id, title
  } catch (error) {
    console.error("Error while creating task:", error);
    return null;
  }
}



export async function getPersonalTasks(userId) {
  try {
    const response = await fetch(`https://raashid.pythonanywhere.com/tasknest/tasks/personal/${userId}/`);
    const data = await response.json();
    return data.personal_tasks || [];
  } catch (error) {
    console.error("Failed to fetch personal tasks:", error);
    return [];
  }
}

export async function updateTaskStatus(taskId, updatedFields) {
  try {
    const response = await fetch(`https://raashid.pythonanywhere.com/tasknest/tasks/update/${taskId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to update task:", err);
    return null;
  }
}

export async function deleteTask(taskId) {
  try {
    const response = await fetch(`https://raashid.pythonanywhere.com/tasknest/tasks/delete/${taskId}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to delete task:", error);
    return null;
  }
}

