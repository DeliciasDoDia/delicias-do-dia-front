'use client';

import { UserIcon, ClockIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useRouter } from "next/navigation";

export default function MyCard({ name, prepTimeMinutes, servings, imageUrl, onDelete }) {
	const router = useRouter();

	return (
		<div className="max-w-sm bg-white rounded-lg shadow-xl w-80 h-80 md:h-[392px]">
			<div className="p-4">
				<img className="rounded-lg h-32 w-80 object-cover" src={imageUrl} alt="" />
			</div>
			<div className="px-4">
				<h5 className="mb-5 font-bold text-xl text-black truncate overflow-hidden whitespace-nowrap w-56">{name}</h5>
				<div className="grid grid-cols-2 gap-8 md:grid-cols-1 md:gap-5">
					<div className="border-e border-gray md:border-0">
						<h6 className="font-semibold text-sm mb-2">Quantidade</h6>
						<p className="flex text-sm">
							<UserIcon className="h-5 w-5 mr-1" />
							{servings} Porções
						</p>
					</div>
					<div>
						<h6 className="font-semibold text-sm mb-2">Tempo</h6>
						<p className="flex text-sm">
							<ClockIcon className="h-5 w-5 mr-1" />
							{prepTimeMinutes} Minutos
						</p>
					</div>
				</div>
			</div>
			<div className="px-4 flex justify-end gap-2 mt-4">
				<button
					onClick={onDelete}
					className="p-2 bg-red-100 rounded-full hover:bg-red-200"
				>
					<TrashIcon className="h-5 w-5 text-red-500" />
				</button>
				<button
					onClick={() => router.push('/sendRecipe')}
					className="p-2 bg-blue-100 rounded-full hover:bg-blue-200"
				>
					<PencilIcon className="h-5 w-5 text-blue-500" />
				</button>
			</div>
		</div>
	);
}