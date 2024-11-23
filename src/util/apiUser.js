// ----- READ -----
export async function getUsers() {
  try {
    const response = await fetch("http://localhost:8080/api/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

export async function getUserById(id) {
  try {
    const response = await fetch("http://localhost:8080/api/users/" + id);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}