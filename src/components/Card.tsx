import Image from "next/image";
import Button from "./Button";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Card :React.FC<{id: number, title: string, description: string}> = ({id, title, description}) => {

  const [modify, setModify] = useState<boolean>(false);
  const [Mtitle, setTitle] = useState<string>(title);
  const [Mdescription, setDescription] = useState<string>(description);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleModify = async () => {
    if (Mdescription.length > 50)
      toast.error("Keep description under 50");
    else if (!Mtitle && !Mdescription)
      toast.error("Seriously, no updates ");
    else {
      
    }
  }

  return (
    <div className="w-[300px] h-[400px] bg-white rounded flex flex-col items-center shadow-card gap-4">
      <Image src={'Studying.svg'} alt="Student studying" width={200} height={200} priority/>
      <div className="flex-1 w-full px-5">
        {
          !modify ?
          <>
            <h2 className="font-semibold mb-1">{title}</h2>
            <p className="font-normal text-sm h-[60px] text-gray-600">{description}</p>
          </>
          :
          <>
            <input
              type="text"
              placeholder="title"
              className="font-semibold py-1 px-2 mb-1 w-full h-[40px] border border-1 border-black"
              value={Mtitle}
              onChange={(e) => handleTitle(e)}
            />
            <input
              placeholder="description"
              className="text-sm h-[60px] py-[2px] px-2 w-full border border-1 border-black"
              value={Mdescription}
              onChange={(e) => handleDesc(e)}
            />
          </>
        }
      </div>
      <div className="self-end py-2 px-2 gap-3 flex">
        {
          modify &&
          <Button type="button" onClick={() => setModify(true)}>Submit</Button>
        }
        <Button type="button" onClick={() => setModify(true)}>Modify</Button>
      </div>
      <Toaster />
    </div>
  );
}

export default Card;