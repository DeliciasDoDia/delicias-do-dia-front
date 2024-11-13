"use client"
import Link from "next/link";
import { getRecipeById } from "@/util/api";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function RecipePagina() {
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
    <main>
      <section className="livro">
        <h1>{recipe.name}</h1>
        <p>Description: {recipe.description}</p>
        <section>
          <img src="#" alt={recipe.imageUrl} />
          <div>
            <h3>Informações</h3>
            <h4>Número de pessoas ou porções</h4>
            <p>{recipe.servings} porções</p>
            <h4>Dificuldade</h4>
            <p>{recipe.difficulty}</p>
            <h4>Tempo de preparo</h4>
            <p>{recipe.prepTimeMinutes} Minutos</p>
          </div>
        </section>
        <h3>Ingredientes</h3>
        <ul>
          {recipe.ingredients && recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.name}</li>
          ))}
        </ul>
        <p>Autor: {recipe.author.name}</p>
      </section>
      <Link href="/">Voltar</Link>
    </main>
  )
}