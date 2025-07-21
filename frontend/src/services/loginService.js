export async function loginUser(email, password) {
  try {
    const response = await fetch("http://localhost:8000/tasknest/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data; // { success: true, user: {...} } or error
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Something went wrong." };
  }
}
