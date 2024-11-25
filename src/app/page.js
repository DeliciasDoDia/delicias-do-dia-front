// Geovanna da Silva Lima - 10420059
// Pedro Henrique Mansano Fernandes - 10388037

"use client"

import { useEffect, useState } from "react";

import Card from "./components/Card";
import Menu from "./components/Menu";
import Search from "./components/Search";

import Link from "next/link";

import { getRecipeByCategory } from "@/util/apiRecipe";
import { getCategories } from "@/util/apiCategory";
import Banner from "./components/Banner";

export default function Home() {

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

  return (
    <main>
      <Banner />

      <div className="px-16">
        <Search setRecipes={setRecipes} setSelectedCategory={setSelectedCategory} />

        <div className="flex flex-col gap-10 sm:flex-row">
          <aside className="flex flex-col items-center">
            {categories ? (categories.map((category) => (
              <Menu key={category.id} {...category}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            ))) : <p>Loading</p>}
          </aside>

          <section className="grid grid-cols-1 gap-4 w-full h-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes ? (recipes.map((recipe) => (
              <Link className="justify-center flex" key={recipe.id} href={"/recipe/?id=" + recipe.id}>
                <Card key={recipe.id} {...recipe} />
              </Link>
            ))) : <p>Loading</p>}
          </section>
        </div>
      </div>
    </main>
  );
}
