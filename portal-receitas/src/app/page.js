"use client"

import { useEffect, useState } from "react";
import Card from "./components/Card";
import Menu from "./components/Menu";
import Search from "./components/Search";
import Header from "./components/Header";
import Link from "next/link";

import { getRecipes } from "@/util/apiRecipe";
import { getCategories } from "@/util/apiCategory";
import Footer from "./components/Footer";


export default function Home() {

  const [recipes, setRecipes] = useState(null);
  useEffect(() => {
    getRecipes()
      .then((data) => setRecipes(data))
  }, [])

  const [categories, setCategories] = useState(null);
  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
  }, [])

  return (
    <body>
      <Header />
      <main>

        <Search />

        <aside>
          {categories ? (categories.map((category) => (
            <Menu key={category.id} {...category} />
          ))) : <p>Loading</p>}
        </aside>


        <section>
          {recipes ? (recipes.map((recipe) => (
            <Link key={recipe.id} href={"/recipe/?id=" + recipe.id}>
              <Card key={recipe.id} {...recipe} />
            </Link>
          ))) : <p>Loading</p>}
        </section>
      </main>
      <Footer />
    </body>
  );
}
