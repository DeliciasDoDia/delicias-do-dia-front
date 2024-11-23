// GET
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

export async function getRecipeByCategory(categoryName) {
	try {
		const response = await fetch("http://localhost:8080/api/recipes/category/" + categoryName);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("ERROR: " + error);
	}
}

export async function getRecipeByIngredient(categoryName) {
	try {
		const response = await fetch("http://localhost:8080/api/recipes/ingredient/" + categoryName);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("ERROR: " + error);
	}
}