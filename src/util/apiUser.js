const API_BASE_URL = "http://10.0.2.162:25000";

// ----- CREATE -----
export async function addUser(user) {
  try {
    const response = await fetch(API_BASE_URL + "/api/users",
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
    const response = await fetch(API_BASE_URL + "/api/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

export async function getUserById(id) {
  try {
    const response = await fetch(API_BASE_URL + "/api/users/" + id);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

export async function getUserLogin(email, password) {
  try {
    const response = await fetch(API_BASE_URL + "/api/users/" + email + "/" + password);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

// ---------- UPDATE ------------
export async function updateUser(userId, user) {
  try {
    const response = await fetch(API_BASE_URL + "/api/users/" + userId,
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