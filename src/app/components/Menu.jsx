import Image from 'next/image';

export default function Menu({id, name, iconUrl, selectedCategory, setSelectedCategory}) {
  
  const handleClick = () => {
    if (selectedCategory === name) {
      setSelectedCategory(null); 
    } else {
      setSelectedCategory(name); 
    }
  };

  return (
    <button
      type="button"
      className={`text-black bg-transparent gap-5 border border-gray hover:bg-yellow hover:shadow-sm hover:shadow-yellow hover:border-yellow font-medium rounded-full text-sm px-2 py-2.5 text-center inline-flex items-center me-2 mb-2 w-64 ${selectedCategory === name ? 'bg-yellow' : ''}`}
      onClick={handleClick}
    >
      <div className="flex content-center justify-center items-center bg-white rounded-full p-1 h-10 w-10">
        <Image src={iconUrl} alt={name} width={24} height={24} />
      </div>
      {name}
    </button>
  );
}
