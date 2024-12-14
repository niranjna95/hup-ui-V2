import Login from "@/components/account/Login";
import LoginLayout from "@/components/layout/LoginLayout";
import CommonProps from "@/models/CommonProps";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

interface LoginPageProps extends CommonProps {}

const LoginPage: NextPage<LoginPageProps> & {
  Layout: React.ComponentType;
} = () => {
  return (
    <>
      <Head>
        <title>Login - Education DNA</title>
      </Head>

      <div className="login_form_block w-100">
        <img
          src={`${process.env.NEXT_PUBLIC_CDN_PATH}/images/EDNA-long-logo.jpg`}
          alt="Education DNA"
          title="Education DNA Logo"
        />
        <h1>Welcome To EDNA</h1>

        <Login />
      </div>
    </>
  );
};

LoginPage.Layout = LoginLayout as React.ComponentType;
export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
