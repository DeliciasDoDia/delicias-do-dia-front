// ----- CREATE -----
export async function addUser(user) {
  try {
    const response = await fetch("http://localhost:8080/api/users",
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });
    return response.status;
  } catch (error) { console.log("ERROR: " + error); }
}

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

export async function getUserLogin(email, password) {
  try {
    const response = await fetch("http://localhost:8080/api/users/" + email + "/" + password);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

// ---------- UPDATE ------------
export async function updateUser(userId, user) {
  try {
    const response = await fetch("http://localhost:8080/api/users/" + userId,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      }
    );
    return response.status;
  } catch (error) {
    console.log("ERROR: " + error)
  }
}