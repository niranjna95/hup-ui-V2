import CommonProps from "@/models/CommonProps";
import { NextPage } from "next";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import AdminLeftMenu from "../common/AdminLeftMenu";

interface AdminLayoutProps extends CommonProps {}

const AdminLayout: NextPage<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Happy Utsaw Palace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="dashboard_wrapper" id="colorMode">
        <div id="DashboardPage" className="mr-5">
          <div className="container-fuild">
            <div className="row">
              <div className="col-md-3">
                <AdminLeftMenu />
              </div>
              <div className="col-md-9 mr-5">
                <div className="eachPage_wrap">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
