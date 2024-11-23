"use client"

import { useEffect, useState } from "react";
import Card from "./components/Card";
import Menu from "./components/Menu";
import Search from "./components/Search";
import Header from "./components/Header";
import Link from "next/link";

import { getRecipes, getRecipeByCategory } from "@/util/apiRecipe";
import { getCategories } from "@/util/apiCategory";
import Footer from "./components/Footer";


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

  const handleCategoryClick = (categoryName) => {
    console.log('cliquei')
    setSelectedCategory(categoryName);
  };

  return (
    <body>
      <Header />
      <main>

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

          <section className="grid grid-cols-1 gap-4 w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes ? (recipes.map((recipe) => (
              <Link className="justify-center flex" key={recipe.id} href={"/recipe/?id=" + recipe.id}>
                <Card key={recipe.id} {...recipe} />
              </Link>
            ))) : <p>Loading</p>}
          </section>
        </div>
      </main>
      <Footer />
    </body>
  );
}
