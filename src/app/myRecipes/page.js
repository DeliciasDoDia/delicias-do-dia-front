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

	const [loadingRecipes, setLoadingRecipes] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [recipes, setRecipes] = useState(null);

	const handleDeleteClick = (id) => {
		setSelectedRecipeId(id);
		setRecipeId(id)
		setModalOpen(true);
	};

	const reloadRecipes = async () => {
		setLoadingRecipes(true);
		const data = await getRecipeByUserAndCategory(user?.id, selectedCategory);
		setRecipes(data);
		setLoadingRecipes(false);
	};

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

	useEffect(() => {
		setLoadingRecipes(true);
		getRecipeByUserAndCategory(user?.id, selectedCategory).then((data) => {
			setRecipes(data);
			setLoadingRecipes(false);
		});
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

			<div className="flex flex-col gap-10 sm:flex-row">
				<aside className="flex flex-col items-center">
					{categories ? (categories.map((category) => (
						<Menu key={category.id} {...category} onClick={() => handleCategoryClick(category.name)}
							selectedCategory={selectedCategory} // Passa a categoria selecionada
							setSelectedCategory={setSelectedCategory} // Passa a função para atualizar a categoria selecionada
							setRecipes={setRecipes} // Passa a função para atualizar as receitas
						/>
					))) : <p>Loading</p>}
				</aside>

				<section className={`w-full h-full ${recipes && recipes.length > 0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "flex justify-center items-center"}`}>
					{loadingRecipes ? (
						<p className="text-black text-center">Carregando receitas...</p>
					) : recipes && recipes.length > 0 ? (
						recipes.map((recipe) => (
							<MyCard key={recipe.id} {...recipe} onDelete={() => handleDeleteClick(recipe.id)} />
						))
					) : (
						<div className="flex flex-col justify-center items-center">
							<img className="w-80" src="/cozinhar.png" />
							<p className="text-black text-center">Nenhuma receita encontrada. Que tal adicionar sua primeira?</p>
						</div>
					)}
				</section>
			</div>
		</main>
	);
}
