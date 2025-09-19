const API_BASE_URL = "http://10.0.2.162:25000";

// ----- READ -----
export async function getCategories() {
  try {
    const response = await fetch(API_BASE_URL + "/api/categories");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

export async function getCategoryById(id) {
  try {
    const response = await fetch(API_BASE_URL + "/api/categories/" + id);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}