import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    let redirectUrl = "account/login";
    router.push(`${redirectUrl}`);
  }, []);
  return (
    <>
      <h1>Happy Utsaw Palace</h1>
    </>
  );
}
