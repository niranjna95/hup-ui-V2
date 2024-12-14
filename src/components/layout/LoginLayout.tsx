import { NextPage } from "next";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";

interface LayoutProps {
  children: React.ReactNode;
}

const LoginLayout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Happy Utsaw Palace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="login_page">
        <Container fluid className="h-100">
          <Row className="h-100 align-items-center justify-content-center">
            <Col md="6" className="side_image h-100 d-none d-md-flex"></Col>
            <Col
              md="6"
              className="login_form_bg h-100 d-flex align-items-center justify-content-center"
            >
              {children}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default LoginLayout;
