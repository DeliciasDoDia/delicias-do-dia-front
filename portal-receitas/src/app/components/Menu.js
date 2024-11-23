'use client'
import Image from 'next/image';
import { getCategoryById } from "@/util/apiCategory";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Menu() {
  const params = useSearchParams();
  const id = params.get("id");

  const [categories, setCategories] = useState(null);
  useEffect(() => {
    getCategoryById(id)
      .then((data) => setCategories(data))
  }, [])

  if (categories === null) {
    return <main>carregando...</main>
  }

  return (
    <button type="button" className="text-black bg-transparent gap-5 border border-gray hover:bg-yellow font-medium rounded-full text-sm px-2 py-2.5 text-center inline-flex items-center me-2 mb-2 w-64">
      <div className='flex content-center justify-center items-center bg-white rounded-full p-1 h-10 w-10'>
        <Image src="/bolos.png" alt="" width={24} height={24} />
      </div>
      {categories.name}
    </button>
  );
}
