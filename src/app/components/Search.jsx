'use client'
import { useState } from "react";
import { getRecipesByName, getRecipeByCategory } from "@/util/apiRecipe";

export default function Search({ setRecipes, setSelectedCategory }) {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (searchTerm) => {
		setSelectedCategory("");

		if (searchTerm) {
			getRecipesByName(searchTerm).then((data) => setRecipes(data));
		} else {
			getRecipeByCategory("").then((data) => setRecipes(data));
		}
	};

	const handleChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
		handleSearch(value);
	};

	return (
		<div className="flex flex-col content-center text-center mb-4 sm:gap-32 sm:mb-0 sm:flex-row items-center">
			<h1>Receitas</h1>

			<div className="relative flex items-center w-full h-12 border-[1px] border-gray rounded-full focus-within:shadow-lg bg-white overflow-hidden">
				<div className="grid place-items-center h-full w-12 text-gray">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>

				<input
					className="peer h-full w-full outline-none text-sm text-gray pr-2"
					type="text"
					id="search"
					placeholder="Pesquisar..."
					value={searchTerm}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}