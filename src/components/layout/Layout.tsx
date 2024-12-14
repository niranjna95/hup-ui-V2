import CommonProps from "@/models/CommonProps";
import { NextPage } from "next";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";

interface LayoutProps extends CommonProps {}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Happy Utsaw Palace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="login_page">
        <Container fluid className="h-100">
          <h1>Default Layout</h1>
          <Row className="h-100 align-items-center justify-content-center">
            <Col md="12" className="h-100 d-none d-md-flex">
              {children}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Layout;
