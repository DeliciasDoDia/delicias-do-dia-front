"use client"

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { getRecipes } from "@/util/api";
import CardRecipe from "./components/CardRecipe/CardRecipe";


export default function Home() {

  const [recipes, setRecipes] = useState(null);
  useEffect(() => {
    getRecipes()
      .then((data) => setRecipes(data))
  }, [])

  return (
    <div className={styles.page}>
      <h1>Receitas</h1>
      <div>
        {recipes ? (recipes.map((recipe) => (
          <Link key={recipe.id} href={"/recipe/?id=" + recipe.id}>
            <CardRecipe key={recipe.id} {...recipe} />
          </Link>
        ))) : <p>Loading</p>}
      </div>
    </div>
  );
}
