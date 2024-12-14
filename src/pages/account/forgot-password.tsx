import ForgotPassword from "@/components/account/ForgotPassword";
import LoginLayout from "@/components/layout/LoginLayout";
import CommonProps from "@/models/CommonProps";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

interface ForgotPasswordPageProps extends CommonProps {}

const ForgotPasswordPage: NextPage<ForgotPasswordPageProps> & {
  Layout: React.ComponentType;
} = () => {
  return (
    <>
      <Head>
        <title>Forgot Password - Education DNA</title>
      </Head>

      <div className="login_form_block w-100">
        <img
          src={`${process.env.NEXT_PUBLIC_CDN_PATH}/images/EDNA-long-logo.jpg`}
          alt="Education DNA"
          title="Education DNA Logo"
        />

        <ForgotPassword />
      </div>
    </>
  );
};

ForgotPasswordPage.Layout = LoginLayout as React.ComponentType;
export default ForgotPasswordPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};