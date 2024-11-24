'use client'

import { useEffect, useState } from "react";

import { getRecipeByCategory } from "@/util/apiRecipe";
import { getCategories } from "@/util/apiCategory";
import { StarIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

import Menu from "../components/Menu";

export default function SendRecipePagina() {
	const [selectedCategory, setSelectedCategory] = useState('');

	const [recipes, setRecipes] = useState(null);
	useEffect(() => {
		getRecipeByCategory(selectedCategory)
			.then((data) => setRecipes(data))
	}, [selectedCategory])

	const [categories, setCategories] = useState(null);
	useEffect(() => {
		getCategories()
			.then((data) => setCategories(data))
	}, [])

	const [steps, setSteps] = useState([""]);

	const handleAddStep = () => {
		setSteps([...steps, ""]);
	};

	const handleStepChange = (value, index) => {
		const newSteps = [...steps];
		newSteps[index] = value;
		setSteps(newSteps);
	};

	const handleSubmit = () => {
		const stepsString = steps.join("\n");
		const payload = {
			steps: stepsString,
		};
	}

	const [selectedStars, setSelectedStars] = useState(0);
	const [selectedCost, setSelectedCost] = useState(0);

	const difficultyLabels = ["Muito Baixa", "Baixa", "Média", "Alta", "Muito Alta"];
	const costLabels = ["Muito Baixo", "Baixo", "Médio", "Alto", "Muito Alto"];

	const handleStarClick = (value) => {
		setSelectedStars(value);
	};

	const handleCostClick = (value) => {
		setSelectedCost(value);
	};

	return (
		<main className="px-16">
			<section>
				<h1>Envie sua receita</h1>

				<div>
					<h3 className="mb-5 mt-6">Sua Receita</h3>
					<form>
						<div className="mb-5">
							<label htmlFor="titulo" className="block mb-2 text-sm font-normal text-black">Título da Receita</label>
							<input type="text" id="titulo" className="bg-white border border-gray text-black text-sm rounded-lg block w-full p-2.5 focus:outline-none" />
						</div>
						<div className="mb-5">
							<label htmlFor="url" className="block mb-2 text-sm font-normal text-black">URL da Imagem</label>
							<input type="text" id="url" className="bg-white border border-gray text-black text-sm rounded-lg block w-full p-2.5 focus:outline-none" />
						</div>
						<div className="mb-5">
							<label htmlFor="apresent" className="block mb-2 text-sm font-normal text-black">Apresentação</label>
							<textarea id="apresent" rows="4" className="block bg-white border border-gray text-black text-sm rounded-lg block w-full p-2.5 resize-none focus:outline-none"></textarea>
						</div>

						<h3 className="mb-5 mt-6">Categoria</h3>
						<div className="flex flex-wrap justify-center gap-4">
							{categories ? (
								categories.map((category) => (
									<Menu
										key={category.id}
										{...category}
										onClick={() => handleCategoryClick(category.name)}
										selectedCategory={selectedCategory}
										setSelectedCategory={setSelectedCategory}
										setRecipes={setRecipes}
									/>
								))
							) : (
								<p>Loading...</p>
							)}
						</div>

						<div className="grid md:grid-cols-[2fr_5fr] md:gap-6">
							<div>
								<h3 className="mb-5 mt-6">Informações</h3>
								<label htmlFor="pessoas" className="block mb-2 text-sm font-normal text-black">Número de pessoas ou porções</label>
								<div className="mb-5 flex gap-2">
									<input type="text" id="pessoas" className="bg-white border border-gray text-black text-sm rounded-lg block w-[80px] p-2.5 focus:outline-none" />
									<select id="countries" className="bg-white text-black border border-gray text-sm rounded-lg block p-2.5 focus:outline-none">
										<option>Porção</option>
										<option>Pessoas</option>
										<option>Fatias</option>
									</select>
								</div>

								<div className="mb-5">
									<label htmlFor="dificuldade" className="block mb-2 text-sm font-normal text-black">
										Dificuldade
									</label>
									<div className="flex">
										{[1, 2, 3, 4, 5].map((value) => (
											<button
												key={`star-${value}`}
												type="button"
												onClick={() => handleStarClick(value)}
												className={`mr-2 flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-200 ${value <= selectedStars
													? "border-yellow text-yellow"
													: "border-gray text-gray"
													}`}
											>
												<StarIcon className="h-5 w-5" />
											</button>
										))}
									</div>
									<p className="mt-2 text-sm font-normal text-gray-600">
										Dificuldade selecionada: <span className="font-medium">{selectedStars > 0 ? difficultyLabels[selectedStars - 1] : "Selecione a dificuldade"}</span>
									</p>
								</div>

								<div className="mb-5">
									<label htmlFor="custo" className="block mb-2 text-sm font-normal text-black">
										Custo
									</label>
									<div className="flex">
										{[1, 2, 3, 4, 5].map((value) => (
											<button
												key={`dollar-${value}`}
												type="button"
												onClick={() => handleCostClick(value)}
												className={`mr-2 flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-200 ${value <= selectedCost
													? "border-yellow text-yellow"
													: "border-gray text-gray"
													}`}
											>
												<CurrencyDollarIcon className="h-5 w-5" />
											</button>
										))}
									</div>
									<p className="mt-2 text-sm font-normal text-gray-600">
										Custo selecionado:  <span className="font-medium">{selectedCost > 0 ? costLabels[selectedCost - 1] : "Selecione o custo"}</span>
									</p>
								</div>

								<div className="mb-5">
									<label htmlFor="tempo" className="block mb-2 text-sm font-normal text-black">Tempo de preparo</label>
									<div className="flex gap-2 items-center">
										<input type="text" id="tempo" className="bg-white border border-gray text-black text-sm rounded-lg block w-[80px] p-2.5 focus:outline-none" />
										<p className="text-sm">Minuto(s)</p>
									</div>
								</div>
							</div>

							<div>
								<h3 className="mb-5 mt-6">Ingredientes</h3>
								<div className="mb-5">
									<textarea id="ingredientes" rows="19" className="block bg-white border border-gray text-black text-sm rounded-lg block w-full p-2.5 resize-none focus:outline-none" placeholder="Insira um ingrediente por linha"></textarea>
								</div>
							</div>
						</div>

						<h3 className="mb-5 mt-6">Preparo</h3>
						{steps.map((step, index) => (
							<div key={index} className="mb-4">
								<label>Passo {index + 1}</label>
								<textarea
									className="w-full rounded p-2 border border-gray focus:outline-none"
									value={step}
									onChange={(e) => handleStepChange(e.target.value, index)}
								/>
							</div>
						))}
						<div className="flex justify-center">
							<button
								className="bg-yellow text-white rounded-full px-4 py-2"
								onClick={handleAddStep}
							>
								+
							</button>
						</div>
					</form>
				</div>
			</section>
		</main>
	);
}
