export async function getProjects(userId) {
  try {
    const response = await fetch(`https://raashid.pythonanywhere.com/tasknest/projects/?user=${userId}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}
