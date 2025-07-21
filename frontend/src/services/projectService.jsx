export async function getProjects(userId) {
  try {
    const response = await fetch(`http://localhost:8000/tasknest/projects/?user=${userId}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}
