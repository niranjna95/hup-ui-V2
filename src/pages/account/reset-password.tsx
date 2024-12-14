import ResetPassword from "@/components/account/ResetPassword";
import LoginLayout from "@/components/layout/LoginLayout";
import CommonProps from "@/models/CommonProps";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

interface ResetPasswordPageProps extends CommonProps {}

const ResetPasswordPage: NextPage<ResetPasswordPageProps> & {
  Layout: React.ComponentType;
} = (props) => {
  const router = useRouter();

  const { userId, token } = router.query as { userId: string; token: string };

  return (
    <>
      <Head>
        <title>Reset Password - Education DNA</title>
      </Head>

      <div className="login_form_block w-100">
        <img
          src={`${process.env.NEXT_PUBLIC_CDN_PATH}/images/EDNA-long-logo.jpg`}
          alt="Education DNA"
          title="Education DNA Logo"
        />

        <ResetPassword token={token} userId={userId} />
      </div>
    </>
  );
};

ResetPasswordPage.Layout = LoginLayout as React.ComponentType;
export default ResetPasswordPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};