import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const AccessDeniedPage: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <title>Access Denied - Forbidden</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div id="header">
        <h1>Access Denied</h1>
      </div>
      <div id="content">
        <div className="content-container">
          <fieldset>
            <h3>Your are not allowed to access this page.</h3>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default AccessDeniedPage;
