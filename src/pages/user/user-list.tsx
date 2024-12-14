import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import Head from "next/head";

const UserList: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin | User List - Education DNA</title>
      </Head>

      <div className="container">
        <h1>User List Page</h1>
      </div>
    </>
  );
};

export default UserList;
