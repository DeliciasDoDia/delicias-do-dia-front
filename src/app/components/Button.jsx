import Link from "next/link";

export default function Button({ text, href }) {
	return (
		<Link href={href}>
      <button
        type="button"
        className="bg-yellow text-black font-semibold py-3 px-5 rounded-full hover:bg-yellow hover:shadow-sm hover:shadow-yellow"
      >
        {text}
      </button>
    </Link>
	);
}