import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login - Happy Utsaw Palace</title>
      </Head>

      <div className="page_not_found">
        <img
          src={`${process.env.NEXT_PUBLIC_CDN_PATH}/images/happy-utsav-palace.png`}
          alt="Happy Utsaw Palace"
          title="Happy Utsaw Palace Logo"
        />
        <h1 className="my-3">
          Oops! The page you are looking for does not exist!
        </h1>
        <Link href="/account/login" className="btn_main" passHref>
          Go Back
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
