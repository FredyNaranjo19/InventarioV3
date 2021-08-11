import React from "react";
import Navbar from "../components/sidebar/Navbar";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./menustyles.css";
function Menu() {
  return (
    <>
      <div>
        <Navbar />
        <div>
          <h1 style={{ textAlign: "center" }}>Menú</h1>
        </div>
        <div className="menustyle">
          <Container fluid="xl" item-align="center">
            <Row>
              <Col xs>
                <Card
                  bg="primary"
                  text="light"
                  style={{ width: "18rem" }}
                  className="mb-2"
                >
                  <Card.Body>
                    <Card.Title>Usuarios </Card.Title>
                    <Card.Text>
                      Ir hacia la pagina de administracion de usuarios.
                    </Card.Text>
                  </Card.Body>
                  <Card.Header>
                    <Button variant="primary" align="center">
                      <Link style={{ color: "white" }} to="/usuarios">
                        Ir
                      </Link>
                    </Button>
                  </Card.Header>
                </Card>
              </Col>
              <Col>
                <Card
                  bg="secondary"
                  text="light"
                  style={{ width: "18rem" }}
                  className="mb-2"
                >
                  <Card.Body>
                    <Card.Title>Bienes </Card.Title>
                    <Card.Text>
                      Ir hacia la pagina de administracion de bienes.
                    </Card.Text>
                  </Card.Body>
                  <Card.Header>
                    <Button variant="secondary" align="center">
                      <Link style={{ color: "white" }} to="/usuarios">
                        Ir
                      </Link>
                    </Button>
                  </Card.Header>
                </Card>
              </Col>
              <Col>
                <Card
                  bg="success"
                  text="light"
                  style={{ width: "18rem" }}
                  className="mb-2"
                >
                  <Card.Body>
                    <Card.Title>Proveedores</Card.Title>
                    <Card.Text>
                      Ir hacia la pagina de administracion de proveedores.
                    </Card.Text>
                  </Card.Body>
                  <Card.Header>
                    <Button variant="success" align="center">
                      <Link style={{ color: "white" }} to="/usuarios">
                        Ir
                      </Link>
                    </Button>
                  </Card.Header>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container fluid="xl" item-align="center">
            <Row>
              <Col xs>
                <Card
                  bg="danger"
                  text="light"
                  style={{ width: "18rem" }}
                  className="mb-2"
                >
                  <Card.Body>
                    <Card.Title>CONAC</Card.Title>
                    <Card.Text>
                      Ir hacia la pagina de administracion de categorias de conac
                    </Card.Text>
                  </Card.Body>
                  <Card.Header>
                    <Button variant="danger" align="center">
                      <Link style={{ color: "white" }} to="/usuarios">
                        Ir
                      </Link>
                    </Button>
                  </Card.Header>
                </Card>
              </Col>
              <Col>
                <Card
                  bg="warning"
                  text="light"
                  style={{ width: "18rem" }}
                  className="mb-2"
                >
                  <Card.Body>
                    <Card.Title>Modelos</Card.Title>
                    <Card.Text>
                      Ir hacia la pagina de administracion de modelos y marcas.
                    </Card.Text>
                  </Card.Body>
                  <Card.Header>
                    <Button variant="warning" align="center">
                      <Link style={{ color: "white" }} to="/usuarios">
                        Ir
                      </Link>
                    </Button>
                  </Card.Header>
                </Card>
              </Col>
              <Col>
                <Card
                  bg="info"
                  text="light"
                  style={{ width: "18rem" }}
                  className="mb-2"
                >
                  <Card.Body>
                    <Card.Title>Proyectos</Card.Title>
                    <Card.Text>
                      Ir hacia la pagina de administracion de proyectos.
                    </Card.Text>
                  </Card.Body>
                  <Card.Header>
                    <Button variant="info" align="center">
                      <Link style={{ color: "white" }} to="/usuarios">
                        Ir
                      </Link>
                    </Button>
                  </Card.Header>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container fluid="xl" item-align="center">
            <Row>
              <Col xs>
                <Card
                  bg="dark"
                  text="light"
                  style={{ width: "18rem" }}
                  className="mb-2"
                >
                  <Card.Body>
                    <Card.Title>Trimestres</Card.Title>
                    <Card.Text>
                      Ir hacia la pagina de administracion de trimestres.
                    </Card.Text>
                  </Card.Body>
                  <Card.Header>
                    <Button variant="dark" align="center">
                      <Link style={{ color: "white" }} to="/usuarios">
                        Ir
                      </Link>
                    </Button>
                  </Card.Header>
                </Card>
              </Col>
              <Col>
                <Card
                  bg="secondary"
                  text="light"
                  style={{ width: "18rem" }}
                  className="mb-2"
                >
                  <Card.Body>
                    <Card.Title>Catalogo de depreciacion </Card.Title>
                    <Card.Text>
                      Ir hacia la pagina de administracion del catalogo de depreciacion.
                    </Card.Text>
                  </Card.Body>
                  <Card.Header>
                    <Button variant="secondary" align="center">
                      <Link style={{ color: "white" }} to="/usuarios">
                        Ir
                      </Link>
                    </Button>
                  </Card.Header>
                </Card>
              </Col>
              <Col>
                <Card
                  bg="success"
                  text="light"
                  style={{ width: "18rem" }}
                  className="mb-2"
                >
                  <Card.Body>
                    <Card.Title>Areas </Card.Title>
                    <Card.Text>
                      Ir hacia la pagina de administracion de areas
                    </Card.Text>
                  </Card.Body>
                  <Card.Header>
                    <Button variant="success" align="center">
                      <Link style={{ color: "white" }} to="/usuarios">
                        Ir
                      </Link>
                    </Button>
                  </Card.Header>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container fluid="xl" item-align="center">
            <Row>
              <Col xs>
                <Card
                  bg="primary"
                  text="light"
                  style={{ width: "18rem" }}
                  className="mb-2"
                >
                  <Card.Body>
                    <Card.Title>Departamentos </Card.Title>
                    <Card.Text>
                      Ir hacia la pagina de administracion de departamentos
                    </Card.Text>
                  </Card.Body>
                  <Card.Header>
                    <Button variant="primary" align="center">
                      <Link style={{ color: "white" }} to="/usuarios">
                        Ir
                      </Link>
                    </Button>
                  </Card.Header>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Menu;
