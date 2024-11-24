// ----- READ -----
export async function getCategories() {
  try {
    const response = await fetch("http://localhost:8080/api/categories");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

export async function getCategoryById(id) {
  try {
    const response = await fetch("http://localhost:8080/api/categories/" + id);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}