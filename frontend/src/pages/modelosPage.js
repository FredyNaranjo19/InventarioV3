import React from "react";
import Navbar from "../components/sidebar/Navbar";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { axios } from "../services/axios";

function Modelos() {
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modelos, setModelos] = useState([]);
  const [modeloSelected, setModeloSelected] = useState({
    marca: "",
    submarca: "",
    modelo: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setModeloSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //*funciones axios
  const insertModelo = async () => {
    await axios
      .post("modelos", modeloSelected)
      .then(
        (response) => setModelos(modelos.concat(response.data)),
        OpenCloseModalInsert(),
        setModeloSelected(null)
      );
  };
  const editModelo = async () => {
    await axios
      .put("modelos/" + modeloSelected.id_Modelo, modeloSelected)
      .then((response) => {
        var dataNueva = modelos;
        dataNueva.map((modelos) => {
          if (modeloSelected.id_Modelo === modelos.id_Modelo) {
            modelos.marca = modeloSelected.marca;
            modelos.submarca = modeloSelected.submarca;
            modelos.modelo = modeloSelected.modelo;
          }
        });
        setModelos(dataNueva);
        setModeloSelected(null);
        OpenCloseModalEdit();
      });
  };
  const deleteModelo = async () => {
    await axios
      .delete("modelos/" + modeloSelected.id_Modelo)
      .then((response) => {
        setModelos(
          modelos.filter(
            (modelos) => modelos.id_Modelo !== modeloSelected.id_Modelo
          )
        );
        setModeloSelected(null);
        OpenCloseModalDelete();
      });
  };
  //*hook efectos de la pagina
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("modelos")
        .then((response) => {
          setModelos(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);
  //*Funciones Modales
  const selectModelo = (modelo, caso) => {
    setModeloSelected(modelo);
    caso === "Editar" ? OpenCloseModalEdit() : OpenCloseModalDelete();
  };
  const OpenCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  };
  const OpenCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  };
  const OpenCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="menu">
          <h1 style={{textAlign: 'center'}}>Modelos</h1>
          <Button variant="primary" onClick={() => OpenCloseModalInsert()}>
            Nuevo Modelo
          </Button>
        </div>
        <div>
          <Table striped bordered hover variant ="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Marca </th>
                <th>SubMarca</th>
                <th>Modelo</th>
                <th>Funciones</th>
              </tr>
            </thead>
            <tbody>
              {modelos.map((modelos) => (
                <tr key={modelos.id_Modelo}>
                  <td>{modelos.id_Modelo}</td>
                  <td>{modelos.marca}</td>
                  <td>{modelos.submarca}</td>
                  <td>{modelos.modelo}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => selectModelo(modelos, "Editar")}
                    >
                      Editar
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={() => selectModelo(modelos, "Eliminar")}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={modalInsert} onHide={() => OpenCloseModalInsert()}>
        <Modal.Header>
          <Modal.Title>Insertar Un Nuevo Modelo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre De La Marca</Form.Label>
              <Form.Control name="marca" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>SubMarca</Form.Label>
              <Form.Control name="submarca" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Modelo</Form.Label>
              <Form.Control name="modelo" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => insertModelo()}>
            Guardar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={OpenCloseModalInsert}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalEdit} onHide={() => OpenCloseModalEdit()}>
        <Modal.Header>
          <Modal.Title>Editar Modelo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre De La Marca</Form.Label>
              <Form.Control
                name="marca"
                value={modeloSelected && modeloSelected.marca}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>SubMarca</Form.Label>
              <Form.Control
                name="submarca"
                value={modeloSelected && modeloSelected.submarca}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                name="modelo"
                value={modeloSelected && modeloSelected.modelo}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => editModelo()}>
            Guardar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={OpenCloseModalEdit}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalDelete} onHide={() => OpenCloseModalEdit()}>
        <Modal.Header>
          <Modal.Title>Eliminar Modelo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta seguro de que desea eliminar este modelo ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteModelo()}>
            Confirmar
          </Button>
          <Button variant="secondary" onClick={() => OpenCloseModalDelete()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modelos;
