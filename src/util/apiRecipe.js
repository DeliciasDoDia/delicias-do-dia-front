// ----- CREATE -----
export async function addRecipe(recipe) {
  try {
    const response = await fetch("http://localhost:8080/api/recipes",
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe)
      });
    return response.status;
  } catch (error) { console.log("ERROR: " + error); }
}

// ----- READ -----
export async function getRecipes() {
  try {
    const response = await fetch("http://localhost:8080/api/recipes");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

export async function getRecipeById(id) {
  try {
    const response = await fetch("http://localhost:8080/api/recipes/" + id);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

export async function getRecipesByName(name) {
  try {
    const response = await fetch("http://localhost:8080/api/recipes/name/" + name);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

export async function getRecipeByCategory(categoryName = "") {
  try {
    const url = categoryName
      ? `http://localhost:8080/api/recipes?catName=${categoryName}`
      : "http://localhost:8080/api/recipes";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

// ---------- UPDATE ------------
export async function updateRecipe(recipeId, recipe) {
  try {
    const response = await fetch("http://localhost:8080/api/recipes/" + recipeId,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe)
      }
    );
    return response.status;
  } catch (error) {
    console.log("ERROR: " + error)
  }
}

// ---------- DELETE ------------
export async function deleteRecipe(id) {
  try {
    const response = await fetch("http://localhost:8080/api/recipes/" + id,
      {
        method: "DELETE",
      }
    );
    return response.status;
  } catch (error) {
    console.log("ERROR: " + error)
  }
}