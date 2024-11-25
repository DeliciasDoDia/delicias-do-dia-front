'use client';

import { useContext, useState } from 'react';

import LoginModal from './LoginModal';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';

import Image from 'next/image';
import CadastroModal from './CadastroModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import { UserContext } from '../context/UserContext';
import Header from './Header';

export default function HeaderLogin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isModalCadastroOpen, setIsModalCadastroOpen] = useState(false);
  const [isModalForgotPasswordOpen, setIsModalForgotPasswordOpen] = useState(false); // Novo estado para o modal de recuperação de senha
  const { user } = useContext(UserContext)

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const openLoginModal = () => {
    setIsModalLoginOpen(true);
    setIsModalCadastroOpen(false);
  };

  const openCadastroModal = () => {
    setIsModalCadastroOpen(true);
    setIsModalLoginOpen(false);
  };

  const openForgotPasswordModal = () => {
    setIsModalForgotPasswordOpen(true);
    setIsModalLoginOpen(false);
  };

  return (
    <>
      {user ? <Header />
        : (
          <header className="bg-yellow rounded-md m-4">
            <nav className="mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
              <a href="/">
                <span className="sr-only">Delicias do Dia</span>
                <Image src="/logo.png" alt="" width={80} height={80} />
              </a>
              <div className="flex lg:hidden">
                <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black" onClick={() => setMobileMenuOpen(true)}>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="hidden items-center lg:flex lg:gap-x-6">
                <span className="text-sm font-semibold text-black cursor-pointer" onClick={() => setIsModalLoginOpen(true)}>
                  Entrar
                </span>
                <button className="bg-white text-black px-4 py-3 rounded-full text-sm font-semibold hover:bg-background" onClick={() => setIsModalCadastroOpen(true)}>
                  Cadastre-se
                </button>
              </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
              <div className="fixed inset-0 z-10" />
              <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-yellow px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <Image src="/logo.png" alt="Logo" width={50} height={50} />
                  </a>
                  <button type="button" className="-m-2.5 rounded-md p-2.5 text-black" onClick={() => setMobileMenuOpen(false)}>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="py-6 flex flex-col gap-4">
                      <span className="text-base font-semibold text-black cursor-pointer" onClick={() => { setIsModalLoginOpen(true); closeMobileMenu(); }}>
                        Entrar
                      </span>
                      <button className="bg-white text-black px-4 py-2 rounded-full text-base font-semibold hover:bg-background" onClick={() => { setIsModalCadastroOpen(true); closeMobileMenu(); }}>
                        Cadastre-se
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>

            <LoginModal isOpen={isModalLoginOpen} onClose={() => setIsModalLoginOpen(false)} openCadastroModal={openCadastroModal} openForgotPasswordModal={openForgotPasswordModal} />
            <CadastroModal isOpen={isModalCadastroOpen} onClose={() => setIsModalCadastroOpen(false)} openLoginModal={openLoginModal} />
            <ForgotPasswordModal isOpen={isModalForgotPasswordOpen} onClose={() => setIsModalForgotPasswordOpen(false)} openLoginModal={openLoginModal} />
          </header>
        )}
    </>
  );
}
