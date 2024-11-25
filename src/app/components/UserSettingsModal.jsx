import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { getUserById, updateUser } from "@/util/apiUser";
import Toast from "./Toast";

export default function UserSettingsModal({ onClose }) {
	const { user } = useContext(UserContext);

	const [userAtt, setUserAtt] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [showToast, setShowToast] = useState(null);

	useEffect(() => {
		getUserById(user.id)
			.then((data) => {
				setUserAtt(data);
				setName(data.name);
				setEmail(data.email);
			})
			.catch((err) => console.error("Erro ao buscar usuário:", err));
	}, [user.id]);

	const handleEdicao = (e) => {
		e.preventDefault();
		const payload = {
			name: name,
			email: email,
		};
		updateUser(user.id, payload).then((status) => {
			if (status === 200) {
				setShowToast({ message: "Atualização realizada com sucesso!", type: "success" });
			} else {
				setShowToast({ message: "Erro ao realizar o atualização. Tente novamente.", type: "error" });
				console.log('Erro na atualização:', status);
			}
			setTimeout(() => setShowToast(false), 4000);
		});
	};

	return (
		<>
			{showToast && (
				<Toast
					message={showToast.message}
					type={showToast.type}
					onClose={() => setShowToast(null)}
				/>
			)}
			<div
				id="authentication-modal"
				tabIndex="-1"
				className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
				onClick={onClose}
			>
				<div
					className="relative w-full max-w-md bg-white rounded-lg shadow"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex items-center justify-between p-4 md:p-5 border-b border-gray rounded-t">
						<h3 className="text-xl font-semibold text-yellow">Edição de dados</h3>
						<button
							type="button"
							className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
							onClick={onClose}
						>
							<svg
								className="w-3 h-3"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Fechar modal</span>
						</button>
					</div>
					<div className="p-4 md:p-5">
						<form className="space-y-4" onSubmit={handleEdicao}>
							<div>
								<label htmlFor="nome" className="block mb-2 text-sm font-medium text-black">
									Nome
								</label>
								<input
									type="text"
									id="nome"
									className="bg-white border border-gray text-black text-sm rounded-lg focus:outline-none block w-full p-2.5"
									placeholder="Nome completo"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
									E-mail
								</label>
								<input
									type="email"
									id="email"
									className="bg-white border border-gray text-black text-sm rounded-lg focus:outline-none block w-full p-2.5"
									placeholder="nome@email.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="justify-center flex pt-2">
								<button
									type="submit"
									className="w-36 text-black bg-yellow hover:shadow-sm hover:shadow-yellow focus:outline-none font-medium rounded-full text-sm px-5 py-2.5"
								>
									Salvar
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
