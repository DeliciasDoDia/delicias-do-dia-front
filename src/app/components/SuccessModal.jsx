'use client'

import { useRouter } from 'next/navigation';

export default function SuccessModal({ text, isOpen, onClose }) {
  const router = useRouter();

  const handleBack = () => {
		router.push('/myRecipes'); 
  };

  if (!isOpen) return null;

	return (
		<div id="popup-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow">
					<button type="button" onClick={onClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center">
						<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
						</svg>
						<span className="sr-only">Fechar</span>
					</button>
					<div className="p-4 md:p-5 text-center">
						<svg className="mx-auto mb-4 text-yellow w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" >
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
						</svg>
						<h3 className="mb-5 text-lg font-normal text-black">
							{text}
						</h3>
						<button onClick={handleBack} className="text-white bg-yellow hover:bg-yellow hover:shadow-sm hover:shadow-yellow focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
							Voltar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
