"use client"

import { getRecipeById } from "@/util/apiRecipe";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Card() {
	const params = useSearchParams();
  const id = params.get("id");


  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    getRecipeById(id)
      .then((data) => setRecipe(data))

  }, [])

  if (recipe === null) {
    return <main>carregando...</main>
  }

	return (
		<div className="max-w-sm bg-white rounded-lg shadow-xl">
			<img className="rounded-t-lg" src="{recipe.imageUrl}" alt="" />
			<div className="p-5">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.name}</h5>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{recipe.description}</p>
			</div>
		</div>
	);
}
