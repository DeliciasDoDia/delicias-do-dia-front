'use client'

import { useEffect, useState } from "react";

import { addRecipe } from "@/util/apiRecipe";
import { getCategories } from "@/util/apiCategory";
import { addIngredient, getIngredientByName } from "@/util/apiIngredient";

import { StarIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

import Menu from "../components/Menu";
import SuccessModal from "../components/SuccessModal";

import { useRouter } from "next/navigation";


export default function SendRecipePagina() {
	const router = useRouter();

  const [showModal, setShowModal] = useState(false);

	const [name, setName] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [description, setDescription] = useState('');
	const [prepTimeMinutes, setPrepTimeMinutes] = useState('');
	const [servings, setServings] = useState('');
	const [objectCategory, setObjectCategory] = useState(null);
	const [authorId, setAuthor] = useState(1);
	const [ingredients, setIngredients] = useState('');

	const [categories, setCategories] = useState(null);
	useEffect(() => {
		getCategories()
			.then((data) => setCategories(data))
	}, [])
	const [selectedCategory, setSelectedCategory] = useState('null');

	const [steps, setSteps] = useState([""]);

	const handleAddStep = (event) => {
		event.preventDefault()
		setSteps([...steps, ""]);
	};

	const handleStepChange = (value, index) => {
		const newSteps = [...steps];
		newSteps[index] = value;
		setSteps(newSteps);
	};

	const formattedSteps = steps.join(';');

	const handleSubmit = async (event) => {
		event.preventDefault();

		const getOrCreateIngredientId = async (name) => {
			try {
				const existingIngredient = await getIngredientByName(name);

				if (existingIngredient) {
					return existingIngredient.id;
				} else {
					const newIngredient = { name };
					const createdIngredient = await addIngredient(newIngredient);
					return createdIngredient ? createdIngredient.id : null;
				}
			} catch (error) {
				console.log("Erro ao obter ou criar o ingrediente:", error);
				return null;
			}
		};

		const ingredientsWithIds = await Promise.all(
			ingredients.split("\n").map(async (ingredient) => {
				const ingredientName = ingredient.trim();
				const ingredientId = await getOrCreateIngredientId(ingredientName);
				if (ingredientId) {
					return { id: ingredientId };
				} else {
					console.error(`Erro ao obter ou criar o ingrediente: ${ingredientName}`);
					return null;
				}
			})
		);

		const validIngredients = ingredientsWithIds.filter(ingredient => ingredient !== null);

		const payload = {
			name,
			imageUrl,
			description,
			prepTimeMinutes: parseInt(prepTimeMinutes, 10),
			servings: parseInt(servings, 10),
			difficulty: selectedStars,
			cost: selectedCost,
			steps: formattedSteps,
			category: objectCategory ? { id: objectCategory.id, name: objectCategory.name } : { id: 11 },
			author: { id: authorId },
			ingredients: validIngredients,
		};

		console.log("Payload enviado:", payload);

		try {
			const status = await addRecipe(payload);
			if (status === 201) {
				setShowModal(true);
			} else {
				console.log("Erro ao criar a receita, status:", status);
			}
		} catch (error) {
			console.log("Erro ao enviar a receita:", error);
		}
	};

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
					<form onSubmit={handleSubmit}>
						<div className="mb-5">
							<label htmlFor="titulo" className="block mb-2 text-sm font-normal text-black">Título da Receita</label>
							<input required type="text" id="titulo" className="bg-white border border-gray text-black text-sm rounded-lg block w-full p-2.5 focus:outline-none"
								value={name}
								onChange={(e) => setName(e.target.value)} />
						</div>
						<div className="mb-5">
							<label htmlFor="url" className="block mb-2 text-sm font-normal text-black">URL da Imagem</label>
							<input type="text" id="url" className="bg-white border border-gray text-black text-sm rounded-lg block w-full p-2.5 focus:outline-none"
								required
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="apresent" className="block mb-2 text-sm font-normal text-black">Apresentação</label>
							<textarea id="apresent" rows="4" className="block bg-white border border-gray text-black text-sm rounded-lg block w-full p-2.5 resize-none focus:outline-none"
								required
								value={description}
								onChange={(e) => setDescription(e.target.value)}></textarea>
						</div>

						<h3 className="mb-5 mt-6">Categoria</h3>
						<div className="flex flex-wrap justify-center gap-4">
							{categories ? (
								categories.map((category) => (
									<div key={category.id}
										value={objectCategory}
										onClick={() => setObjectCategory(category)}>
										< Menu
											key={category.id}
											{...category}
											selectedCategory={selectedCategory}
											setSelectedCategory={setSelectedCategory}
										/>
									</div>
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
									<input type="text" id="pessoas" className="bg-white border border-gray text-black text-sm rounded-lg block w-[80px] p-2.5 focus:outline-none"
										required
										value={servings}
										onChange={(e) => setServings(e.target.value)} />
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
										<input type="text" id="tempo" className="bg-white border border-gray text-black text-sm rounded-lg block w-[80px] p-2.5 focus:outline-none"
											required
											value={prepTimeMinutes}
											onChange={(e) => setPrepTimeMinutes(e.target.value)} />
										<p className="text-sm">Minuto(s)</p>
									</div>
								</div>
							</div>

							<div>
								<h3 className="mb-5 mt-6">Ingredientes</h3>
								<div className="mb-5">
									<textarea id="ingredientes" rows="19" className="block bg-white border border-gray text-black text-sm rounded-lg block w-full p-2.5 resize-none focus:outline-none" placeholder="Insira um ingrediente por linha"
										required
										value={ingredients}
										onChange={(e) => setIngredients(e.target.value)}>
									</textarea>
								</div>
							</div>
						</div>

						<h3 className="mb-5 mt-6">Preparo</h3>
						{steps.map((step, index) => (
							<div key={index} className="mb-4">
								<label>Passo {index + 1}</label>
								<textarea
									required
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
						<button
              className="bg-yellow text-black font-semibold py-3 px-5 rounded-full hover:bg-yellow hover:shadow-sm hover:shadow-yellow"
							type="submit"
						>
							Enviar receita
						</button>
					</form>
				</div>
			</section>

			<SuccessModal
				text={"Receita enviada!"}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => router.push('/myRecipes')}
      />
		</main>
	);
}
