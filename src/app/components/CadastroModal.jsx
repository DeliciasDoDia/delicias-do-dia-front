'use client';

import { addUser } from "@/util/apiUser";
import { useState } from "react";
import Toast from "./Toast";

export default function CadastroModal({ isOpen, onClose, openLoginModal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(null);

  const handleCadastro = (e) => {
    e.preventDefault();
    const payload = {
      name: name,
      email: email,
      password: password,
    }
    addUser(payload).then((status) => {
      if (status === 201) {
        setShowToast({ message: "Cadastro realizado com sucesso!", type: "success" });
      } else {
        setShowToast({ message: "Erro ao realizar o cadastro. Tente novamente.", type: "error" });
        console.log('Erro no cadastro:', status);
      }

      setTimeout(() => setShowToast(false), 4000);
    })
  };

  if (!isOpen) return null;

  return (
    <>
      {showToast && (
        <Toast
          message={showToast.message}
          type={showToast.type}
          onClose={() => setShowToast(null)}
        />
      )}

      <div id="authentication-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50" onClick={onClose}>
        <div className="relative w-full max-w-md bg-white rounded-lg shadow" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray rounded-t">
            <h3 className="text-xl font-semibold text-yellow">
              Cadastro
            </h3>
            <button type="button" className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8" onClick={onClose}>
              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Fechar modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleCadastro}>
              <div>
                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-black">
                  Nome
                </label>
                <input type="text" id="nome" className="bg-white border border-gray text-black text-sm rounded-lg focus:outline-none block w-full p-2.5" placeholder="Nome completo"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
                  E-mail
                </label>
                <input type="email" id="email" className="bg-white border border-gray text-black text-sm rounded-lg focus:outline-none block w-full p-2.5" placeholder="nome@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">
                  Senha
                </label>
                <input type="password" id="password" placeholder="••••••••" className="bg-white border border-gray text-black text-sm rounded-lg focus:outline-none block w-full p-2.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
              <div className="justify-center flex pt-2">
                <button type="submit" className="w-36 text-black bg-yellow hover:shadow-sm hover:shadow-yellow focus:outline-none font-medium rounded-full text-sm px-5 py-2.5" >
                  Criar conta
                </button>
              </div>
              <div className="w-full flex justify-center">
                <p className="font-normal text-xs w-52 text-center my-3 text-slate-400">Ao clicar em Criar conta, você concorda com as Política de privacidade.</p>
              </div>
              <div className="flex justify-center text-sm text-black">
                Já tem uma conta?&nbsp;
                <button className="text-blue-700 font-medium hover:underline" onClick={openLoginModal}>
                  Fazer login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}