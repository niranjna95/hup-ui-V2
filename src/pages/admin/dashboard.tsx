import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

const AdminDashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin | Admin List - Education DNA</title>
      </Head>

      <h1>Admin List Page</h1>
    </>
  );
};

export default AdminDashboardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
