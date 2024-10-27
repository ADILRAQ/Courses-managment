'use client';
import Parent from "@/app/Parent";
import _axios from "@/lib/_axios";
import { usePathname } from "next/navigation";

const AuthRoute :React.FC<{children: React.ReactNode}> = ({children}) => {

  const router = usePathname();
  const unprotected = ['/login', '/signip'];

  return <>{unprotected.includes(router) ? children : <Parent>{children}</Parent>}</>;
}

export default AuthRoute;