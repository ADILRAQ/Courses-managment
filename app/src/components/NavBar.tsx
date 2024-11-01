'use client';
import _axios from "@/lib/_axios";
import { unprotected } from "@/lib/unprotected";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Button from "./Button";

const NavBar = () => {

  const router = useRouter();
  const path = usePathname();

  const handleLogout = async () => {
    await _axios.post('/logout');
  }

  return (
    <div className="w-full px-8 py-6 flex justify-between">
      <Image src={'logo.svg'} alt="Coursify Logo" width={40} height={40} />
      {/* <p></p> */}
      {
        !unprotected.includes(path) &&
        <div className="flex gap-3">
        <button 
          type="button"
          className="px-3 py-2 border-transparent border-2 hover:border-b-blue-500 hover:border-b-2 transition-all duration-75 ease-in"
          onClick={()=>router.push('/courses')}
          >
          Courses
        </button>

        <button 
          type="button"
          className="px-3 py-2 border-transparent border-2 hover:border-b-blue-500 hover:border-b-2 transition-all duration-75 ease-in"
          onClick={()=>router.push('/dashboard')}
        >
          Dashbord
        </button>

        <Button
          type="button"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      }
    </div>
  )
}

export default NavBar;