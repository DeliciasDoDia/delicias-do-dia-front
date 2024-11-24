'use client'

import Link from "next/link";
import { getRecipeById } from "@/util/apiRecipe";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { UserIcon, ClockIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/outline';
import Button from "../components/Button";

export default function RecipePagina() {
  const params = useSearchParams();
  const id = params.get("id");

  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    getRecipeById(id).then((data) => setRecipe(data));
  }, []);

  if (recipe === null) {
    return <main>Carregando...</main>;
  }

  const renderStars = (difficulty) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div key={`star-${i}`} className={`mr-2 flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-200 ${i <= difficulty ? 'border-yellow text-yellow' : 'border-gray text-gray'}`}>
          <StarIcon
            className={`h-5 w-5 ${i <= difficulty ? 'text-yellow' : 'text-gray'}`}
          />
        </div>
      );
    }
    return stars;
  };

  const renderCost = (cost) => {
    const dollars = [];
    for (let i = 1; i <= 5; i++) {
      dollars.push(
        <div key={`dollar-${i}`} className={`mr-2 flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-200 ${i <= cost ? 'border-yellow' : 'border-gray'}`}>
          <CurrencyDollarIcon
            className={`h-5 w-5 ${i <= cost ? 'border-yellow text-yellow' : 'border-gray text-gray'}`}
          />
        </div>
      );
    }
    return dollars;
  };

  return (
    <main>
      <section>
        <h1>{recipe.name}</h1>
        <p className="font-normal my-6">{recipe.description}</p>
        <section className="grid grid-cols-1 md:grid-cols-2 md:gap-7">
          <img className="rounded-xl w-[800px] h-[450px] object-cover" src={recipe.imageUrl} alt="Imagem da receita" />
          <div>
            <h3 className="my-4 md:mb-6 md:my-0">Informações</h3>
            <h4 className="font-medium">Número de pessoas ou porções</h4>
            <p className="flex font-regular items-center mb-4 md:mb-8">
              <UserIcon className="h-6 w-6 mr-1 text-yellow" />
              {recipe.servings} Porções
            </p>

            <h4 className="font-medium">Dificuldade</h4>
            <div className="flex mb-4 md:mb-8">
              {renderStars(recipe.difficulty)}
            </div>

            <h4 className="font-medium">Custo</h4>
            <div className="flex mb-4 md:mb-8">
              {renderCost(recipe.cost)}
            </div>

            <h4 className="font-medium">Tempo de preparo</h4>
            <p className="flex font-regular items-center mb-4 md:mb-8">
              <ClockIcon className="h-6 w-6 mr-1 text-yellow" />
              {recipe.prepTimeMinutes} Minuto(s)
            </p>
          </div>
        </section>

        <h3 className="my-4 md:mb-6">Ingredientes</h3>
        <ul className="leading-7">
          {recipe.ingredients && recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.name}</li>
          ))}
        </ul>

        <h3 className="my-4 md:mb-6">Modo de Preparo</h3>
        <ul className="leading-7">
          {recipe.steps.split('\n').map((step, index) => (
            <li key={index} className="flex items-start mb-2 border-gray border-b-[1px] pb-2">
              <span className="font-bold text-yellow border border-yellow rounded-full flex items-center justify-center w-8 h-8 mr-4">
                {index + 1}.
              </span>
              {step}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col items-center mb-8 md:justify-between md:items-start	md:flex-row">
          <div className="flex mb-4 md:mb-0">
            <span className="text-yellow font-semibold">Escrito por: </span>
            <p className="text-black font-normal">&nbsp;{recipe.author.name}</p>
          </div>
          <Button text="Voltar" href="/" />
        </div>
      </section>
    </main>
  );
}
