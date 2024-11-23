"use client"

import { useEffect, useState } from "react";
import Card from "./components/Card";
import Menu from "./components/Menu";
import Search from "./components/Search";
import Link from "next/link";

import { getRecipes } from "@/util/apiRecipe";


export default function Home() {

  const [recipes, setRecipes] = useState(null);
  useEffect(() => {
    getRecipes()
      .then((data) => setRecipes(data))
  }, [])

  return (
    <>
      <main>
        <Search />

        <aside>
          <Menu />
        </aside>

        <section>
          {recipes ? (recipes.map((recipe) => (
            <Link key={recipe.id} href={"/recipe/?id=" + recipe.id}>
              <Card key={recipe.id} {...recipe} />
            </Link>
          ))) : <p>Loading</p>}
        </section>
        {children}
      </main>
    </>
  );
}
