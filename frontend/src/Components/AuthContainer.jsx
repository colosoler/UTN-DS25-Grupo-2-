import { Container, Row, Col, Image, Form } from "react-bootstrap";
import "./styles/Auth.css";

export const AuthContainer = ({ type, children, onSubmit }) => {
  return (
    <div className={`${type}-container`}>
      <Form
        className={`${type}-form`}
        onSubmit={onSubmit}
        noValidate
      >
        <Container>
          <Row className="justify-content-center mb-3">
            <Col xs={5} md={4}>
              <Image
                src="/images/UTNotas.png"
                fluid
                className="login-logo"
              />
            </Col>
          </Row>
        </Container>

        {children}
      </Form>
    </div>
  );
};
