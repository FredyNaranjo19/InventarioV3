import React from "react";
import Navbar from "../components/sidebar/Navbar";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { axios } from "../services/axios";
import Alert from "react-bootstrap/Alert";

function Areas() {
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [areas, setAreas] = useState([]);
  const [areaSelect, setAreaSelect] = useState({
    nombreArea: "",
    ubicacionArea: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAreaSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //*funciones axios
  const insertArea = async () => {
    await axios
      .post("areas", areaSelect)
      .then(
        (response) => setAreas(areas.concat(response.data)),
        OpenCloseModalInsert(),
        setAreaSelect(null)
      );

    <Alert  variant="success">
      Se ha insertado esta area con exito!
    </Alert>;
  };
  const editArea = async () => {
    await axios
      .put("areas/" + areaSelect.id_Area, areaSelect)
      .then((response) => {
        var dataNueva = areas;
        dataNueva.map((areas) => {
          if (areaSelect.id_Area === areas.id_Area) {
            areas.nombreArea = areaSelect.nombreArea;
            areas.ubicacionArea = areaSelect.ubicacionArea;
          }
        });
        setAreas(dataNueva);
        setAreaSelect(null);
        OpenCloseModalEdit();
      });
  };
  const deleteArea = async () => {
    await axios.delete("areas/" + areaSelect.id_Area).then((response) => {
      setAreas(areas.filter((areas) => areas.id_Area !== areaSelect.id_Area));
      setAreaSelect(null);
      OpenCloseModalDelete();
    });
  };
  //*hook efectos de la pagina
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("areas")
        .then((response) => {
          setAreas(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);
  //*Funciones Modales
  const selectArea = (departamento, caso) => {
    setAreaSelect(departamento);
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
          <h1 style={{ textAlign: "center" }}>Areas</h1>
          <Button
            style={{}}
            variant="primary"
            onClick={() => OpenCloseModalInsert()}
          >
            Nuevo Area
          </Button>
        </div>
        <div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Area</th>
                <th>Ubicacion del Area</th>
                <th>Funciones</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((areas) => (
                <tr key={areas.id_Area}>
                  <td>{areas.id_Area}</td>
                  <td>{areas.nombreArea}</td>
                  <td>{areas.ubicacionArea}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => selectArea(areas, "Editar")}
                    >
                      Editar
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={() => selectArea(areas, "Eliminar")}
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

      <Modal show={modalInsert} onHide={OpenCloseModalInsert}>
        <Modal.Header>
          <Modal.Title> Insertar Nueva Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre Del Area</Form.Label>
              <Form.Control name="nombreArea" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ubicacion Del Area</Form.Label>
              <Form.Control name="ubicacionArea" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => insertArea()}>
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
          <Modal.Title>Editar Un Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre Del Area</Form.Label>
              <Form.Control
                name="nombreArea"
                value={areaSelect && areaSelect.nombreArea}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ubicacion Del Area</Form.Label>
              <Form.Control
                name="ubicacionArea"
                value={areaSelect && areaSelect.ubicacionArea}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => editArea()}>
            Guardar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={() => OpenCloseModalEdit()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalDelete} onHide={() => OpenCloseModalDelete()}>
        <Modal.Header>
          <Modal.Title>Eliminar Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta seguro de que desea eliminar esta Area?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteArea()}>
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

export default Areas;
