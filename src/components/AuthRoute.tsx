'use client';
import Parent from "@/app/Parent";
import { unprotected } from "@/lib/unprotected";
import { usePathname } from "next/navigation";

const AuthRoute :React.FC<{children: React.ReactNode}> = ({children}) => {

  const router = usePathname();

  return <>{unprotected.includes(router) ? children : <Parent>{children}</Parent>}</>;
}

export default AuthRoute;