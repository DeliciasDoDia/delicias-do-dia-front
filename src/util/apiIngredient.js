// ----- READ -----
export async function getIngredients() {
  try {
    const response = await fetch("http://localhost:8080/api/ingredients");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

export async function getIngredientById(id) {
  try {
    const response = await fetch("http://localhost:8080/api/ingredients/" + id);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}