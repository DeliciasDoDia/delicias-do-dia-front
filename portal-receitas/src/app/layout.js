"use client"

import Link from "next/link";

import { useEffect, useState } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Search from "./components/Search";
import Card from "./components/Card";

import { getRecipes } from "@/util/apiRecipe";

import "./globals.css";

export default function RootLayout() {
  const [recipes, setRecipes] = useState(null);
  useEffect(() => {
    getRecipes()
      .then((data) => setRecipes(data))
  }, [])

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&family=Exo:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Yeseva+One&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&family=Exo:ital,wght@0,100..900;1,100..900&family=Yeseva+One&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <Header />

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

        </main>
        <Footer />
      </body>
    </html>
  );
}
