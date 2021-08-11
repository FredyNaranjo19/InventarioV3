import React from "react";
import Navbar from "../sidebar/Navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axios } from "../../services/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function Profile(props) {
  const { id } = useParams();
  const [usuario, setUsuario] = useState([]);
  const [departamento, setDepartamento] = useState([]);
  const [area, setArea] = useState([]);

  useEffect(() => {
    console.log(usuario);
    async function fetchData() {
      await axios
        .get("usuarios/users/" + id)
        .then((response) => {
          setUsuario(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [id]);

  const fetchDepartamento = async () => {
    if (usuario === []) {
      console.log("no ejecutar");
    } else {
      console.log(usuario);
      await axios
        .get("departamentos/departamento/" + usuario.id_Departamento)
        .then((response) => {
          setDepartamento(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div>
          <h1 style={{ textAlign: "center" }}>Perfil</h1>
          <Container>
            <Row>
              <Col xs={6} md={4}>
                <Image
                  style={{ height: 400, width: 400 }}
                  src={"http://localhost:4000/" + usuario.fotoUsuario}
                  rounded
                />
              </Col>
              <Col>
                <h4>
                  Nombre Completo: {usuario.nombreUsuario}{" "}
                  {usuario.apellidoPUsuario} {usuario.apellidoMUsuario}
                </h4>
                <h4>Matricula: {usuario.matriculaUsuario}</h4>
                <h4>Tipo de Usuario: {usuario.tipoUsuario}</h4>
                <h4>Correo Electronico: {usuario.correoUsuario}</h4>
                <h4>Perfil Academico: {usuario.perfilAcademicoUsuario}</h4>
                <h4>Puesto: {usuario.puestoUsuario}</h4>
                <h4>Estatus Laboral: {usuario.estatusLaboralUsuario}</h4>
              </Col>
            </Row>
          </Container>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Profile;
