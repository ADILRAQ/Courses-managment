import Image from "next/image";

const Card = () => {
  return (
    <div className="w-[300px] h-[350px] bg-white rounded flex flex-col items-center shadow-card gap-4">
      <Image src={'Studying.svg'} alt="Student studying" width={0} height={0} className="rounded w-[200px]"/>
      <div className="flex-1 w-full pl-5">
        <h2 className="font-semibold">Title</h2>
        <p className="font-normal text-sm text-gray-600">Description</p>
      </div>
    </div>
  );
}

export default Card;