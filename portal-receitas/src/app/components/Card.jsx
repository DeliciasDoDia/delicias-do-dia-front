export default function Card({ name, description, imageUrl }) {

	return (
		<div className="max-w-sm bg-white rounded-lg shadow-xl">
			<img className="rounded-t-lg" src={imageUrl} alt="" />
			<div className="p-5">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-400">{name}</h5>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
			</div>
		</div>
	);
}


