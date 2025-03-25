// import { container } from "@/config/ioc";
// import { TYPES } from "@/config/types";
// import IUnitOfService from "@/services/interfaces/IUnitOfService";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  //const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
  const router = useRouter();
  useEffect(() => {
    router.push("/account/login");
  }, []);
  return (
    <>
      <h1>Happy Utsaw Palace</h1>
    </>
  );
}
