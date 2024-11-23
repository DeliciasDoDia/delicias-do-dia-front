import { UserIcon, ClockIcon } from '@heroicons/react/24/solid';

export default function Card({ name, prepTimeMinutes, servings, imageUrl }) {

	return (
		<div className="max-w-sm bg-white rounded-lg shadow-xl w-80 h-72 md:h-96 lg:h-72">
			<div className="p-4">
				<img className="rounded-lg h-32 w-80 object-cover" src={imageUrl} alt="" />
			</div>
			<div className="px-4">
				<h5 className="mb-5 font-bold	text-xl tracking-tight text-gray-900 dark:text-gray-400 text-ellipsis overflow-hidden">{name}</h5>
				<div className="grid grid-cols-2 gap-8 md:grid-cols-1 lg:grid-cols-2">
					<div className='border-e border-gray md:border-0 lg:border-e'>
						<h6 className="font-semibold text-sm mb-2">Quantidade</h6>
						<p className='flex text-sm'>
							<UserIcon className='size-5 mr-1' />
							{servings} Porções
						</p>
					</div>
					<div>
						<h6 className="font-semibold text-sm mb-2">Tempo</h6>
						<p className='flex text-sm'>
							<ClockIcon className='size-5 mr-1' />
							{prepTimeMinutes} Minutos
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}


