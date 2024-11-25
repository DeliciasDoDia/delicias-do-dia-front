"use client"

import { useContext, useEffect, useState } from "react";
import Menu from "../components/Menu";
import Search from "../components/Search";
import MyCard from "../components/MyCard";

import { deleteRecipe, getRecipeByUserAndCategory } from "@/util/apiRecipe";
import { getCategories } from "@/util/apiCategory";
import DeleteModal from "../components/DeleteModal";
import { UserContext } from "../context/UserContext";

export default function MyRecipesPagina() {
	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedRecipeId, setSelectedRecipeId] = useState(null);
	const [recipeId, setRecipeId] = useState(null);
	const { user } = useContext(UserContext)


	const handleDeleteClick = (id) => {
		setSelectedRecipeId(id);
		setRecipeId(id)
		setModalOpen(true);
	};

	const reloadRecipes = async () => {
		const data = await getRecipeByUserAndCategory(user?.id, selectedCategory);
		setRecipes(data);
	}

	const handleConfirmDelete = async () => {
		console.log('Deletando receita com ID:', selectedRecipeId);
		setModalOpen(false);
		await deleteRecipe(recipeId);
		reloadRecipes();
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setSelectedRecipeId(null);
	};

	const [selectedCategory, setSelectedCategory] = useState('');
	const [recipes, setRecipes] = useState(null);

	useEffect(() => {
		getRecipeByUserAndCategory(user?.id, selectedCategory).then((data) => setRecipes(data));
	}, [selectedCategory]);

	const [categories, setCategories] = useState(null);
	useEffect(() => {
		getCategories()
			.then((data) => setCategories(data))
	}, [])

	const handleCategoryClick = (categoryName) => {
		console.log('cliquei')
		setSelectedCategory(categoryName);
	};

	return (
		<main className="px-16">
			<DeleteModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onConfirm={handleConfirmDelete}
			/>

			<Search setRecipes={setRecipes} setSelectedCategory={setSelectedCategory} />

			<div className="flex gap-10">
				<aside className="flex flex-col">
					{categories ? (categories.map((category) => (
						<Menu key={category.id} {...category} onClick={() => handleCategoryClick(category.name)}
							selectedCategory={selectedCategory} // Passa a categoria selecionada
							setSelectedCategory={setSelectedCategory} // Passa a função para atualizar a categoria selecionada
							setRecipes={setRecipes} // Passa a função para atualizar as receitas
						/>
					))) : <p>Loading</p>}
				</aside>

				<section className="grid grid-cols-1 gap-4 w-full h-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{recipes ? recipes?.map((recipe) => (
						<MyCard key={recipe.id} {...recipe} onDelete={() => handleDeleteClick(recipe.id)} />
					)) : 'Loading...'}
				</section>
			</div>
		</main>
	);
}
