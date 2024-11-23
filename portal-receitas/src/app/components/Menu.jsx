import Image from 'next/image';
export default function Menu({ name, iconUrl}) {
  return (
    <button type="button" className="text-black bg-transparent gap-5 border border-gray hover:bg-yellow font-medium rounded-full text-sm px-2 py-2.5 text-center inline-flex items-center me-2 mb-2 w-64">
      <div className='flex content-center justify-center items-center bg-white rounded-full p-1 h-10 w-10'>
        <Image src={iconUrl} alt="" width={24} height={24} />
      </div>
      {name}
    </button>
  );
}
