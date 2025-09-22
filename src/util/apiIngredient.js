// ----- CREATE -----
export async function addIngredient(ingredient) {
  try {
    const response = await fetch("/api/ingredients",
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ingredient)
      });
    if (response.status === 201) {
      const responseBody = await response.text();
      return responseBody ? JSON.parse(responseBody) : null
    } else {
      console.error("Erro ao criar ingrediente:", response.status);
      return null;
    }
  } catch (error) {
    console.log("Erro ao adicionar ingrediente: " + error);
    return null;
  }
}

// ----- READ -----
export async function getIngredients() {
  try {
    const response = await fetch("/api/ingredients");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

export async function getIngredientById(id) {
  try {
    const response = await fetch("/api/ingredients/" + id);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

export async function getIngredientByName(name) {
  try {
    const response = await fetch("/api/ingredients/name/" + name);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

export async function getOrCreateIngredientId(name) {
  const existingIngredient = await getIngredientByName(name);

  if (existingIngredient) {
    return existingIngredient.id;
  } else {
    const newIngredient = { name };
    const newIngredientId = await addIngredient(newIngredient);
    return newIngredientData ? newIngredientData.id : null;
  }
}