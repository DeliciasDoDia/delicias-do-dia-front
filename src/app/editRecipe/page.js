'use client';

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { getRecipeById, updateRecipe } from "@/util/apiRecipe";
import { getCategories } from "@/util/apiCategory";
import { addIngredient, getIngredientByName } from "@/util/apiIngredient";

import { StarIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import Menu from "../components/Menu";
import SuccessModal from "../components/SuccessModal";

function EditRecipeContent() {
  const params = useSearchParams();
  const recipeId = params.get("id");
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [prepTimeMinutes, setPrepTimeMinutes] = useState('');
  const [servings, setServings] = useState('');
  const [objectCategory, setObjectCategory] = useState(null);
  const [step, setStep] = useState('');
  const [authorId, setAuthor] = useState(1);
  const [ingredients, setIngredients] = useState('');
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('null');
  const [steps, setSteps] = useState([""]);
  const [selectedStars, setSelectedStars] = useState(0);
  const [selectedCost, setSelectedCost] = useState(0);

  useEffect(() => {
    if (recipeId) {
      getRecipeById(recipeId).then((data) => {
        setRecipe(data);
        setName(data.name);
        setPrepTimeMinutes(data.prepTimeMinutes);
        setServings(data.servings);
        setImageUrl(data.imageUrl);
        setDescription(data.description);
        setSelectedCategory(data.category.name);
        setSelectedStars(data.difficulty);
        setIngredients(data.ingredients.map((i) => i.name).join("\n"));
        setSelectedCost(data.cost);
        setAuthor(data.author.id);
        setStep(data.steps);
        setSteps(data.steps.split(';'));
      });
    }
  }, [recipeId]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  const handleAddStep = (event) => {
    event.preventDefault();
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
        if (existingIngredient) return existingIngredient.id;
        const createdIngredient = await addIngredient({ name });
        return createdIngredient ? createdIngredient.id : null;
      } catch (error) {
        console.log("Erro ao obter ou criar o ingrediente:", error);
        return null;
      }
    };

    const ingredientsWithIds = await Promise.all(
      ingredients.split("\n").map(async (ingredient) => {
        const ingredientName = ingredient.trim();
        const ingredientId = await getOrCreateIngredientId(ingredientName);
        return ingredientId ? { id: ingredientId } : null;
      })
    );

    const validIngredients = ingredientsWithIds.filter((ingredient) => ingredient !== null);

    const payload = {
      name,
      imageUrl,
      description,
      prepTimeMinutes: parseInt(prepTimeMinutes, 10),
      servings: parseInt(servings, 10),
      difficulty: selectedStars,
      cost: selectedCost,
      steps: formattedSteps,
      category: objectCategory
        ? { id: objectCategory.id, name: objectCategory.name }
        : { id: 11 },
      ingredients: validIngredients,
    };

    try {
      const status = await updateRecipe(recipeId, payload);
      if (status === 200 || status === 201) {
        setShowModal(true);
      } else {
        console.log("Erro ao criar a receita, status:", status);
      }
    } catch (error) {
      console.log("Erro ao enviar a receita:", error);
    }
  };

  const difficultyLabels = ["Muito Baixa", "Baixa", "Média", "Alta", "Muito Alta"];
  const costLabels = ["Muito Baixo", "Baixo", "Médio", "Alto", "Muito Alto"];

  return (
    <main className="px-16">
      {/* ... o resto do seu JSX exatamente como está */}
      <SuccessModal
        text={"Receita editada!"}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => router.push('/myRecipes')}
      />
    </main>
  );
}

export default function EditRecipe() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <EditRecipeContent />
    </Suspense>
  );
}