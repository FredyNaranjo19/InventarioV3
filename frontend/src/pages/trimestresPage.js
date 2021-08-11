import React from "react";
import Navbar from "../components/sidebar/Navbar";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { axios } from "../services/axios";

function Trimestres() {
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [trimestres, setTrimestres] = useState([]);
  const [trimestreSelected, setTrimestreSelected] = useState({
    ejercicio: "",
    fechaInicio: "",
    fechaFin: "",
    numeroTrimestre: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrimestreSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //*funciones axios
  const insertTrimestre = async () => {
    await axios
      .post("trimestre", trimestreSelected)
      .then(
        (response) => setTrimestres(trimestres.concat(response.data)),
        OpenCloseModalInsert(),
        setTrimestreSelected(null)
      );
  };
  const editTrimestre = async () => {
    await axios
      .put("trimestre/" + trimestreSelected.id_Trimestre, trimestreSelected)
      .then((response) => {
        var dataNueva = trimestres;
        dataNueva.map((trimestres) => {
          if (trimestreSelected.id_Trimestre === trimestres.id_Trimestre) {
            trimestres.ejercicio = trimestreSelected.ejercicio;
            trimestres.fechaInicio = trimestreSelected.fechaInicio;
            trimestres.fechaFin = trimestreSelected.fechaFin;
            trimestres.numeroTrimestre = trimestreSelected.numeroTrimestre;
          }
        });
        setTrimestres(dataNueva);
        setTrimestreSelected(null);
        OpenCloseModalEdit();
      });
  };
  const deleteTrimestre = async () => {
    await axios
      .delete("trimestre/" + trimestreSelected.id_Trimestre)
      .then((response) => {
        setTrimestres(
          trimestres.filter(
            (trimestres) =>
              trimestres.id_Trimestre !== trimestreSelected.id_Trimestre
          )
        );
        setTrimestreSelected(null);
        OpenCloseModalDelete();
      });
  };
  //*hook efectos de la pagina
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("trimestre")
        .then((response) => {
          setTrimestres(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);
  //*Funciones Modales
  const selectTrimestre = (trimestre, caso) => {
    setTrimestreSelected(trimestre);
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
          <h1 style={{textAlign: 'center'}}>Trimestres</h1>
          <Button variant="primary" onClick={() => OpenCloseModalInsert()}>
            Nuevo Trimestre Agregado
          </Button>
        </div>
        <div>
          <Table striped bordered hover variant ="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ejercicio Fiscal</th>
                <th>Fecha de Comienzo</th>
                <th>Fecha de Finalización</th>
                <th>Numero de trimestre Correspondiente</th>
                <th>Funciones</th>
              </tr>
            </thead>
            <tbody>
              {trimestres.map((trimestres) => (
                <tr key={trimestres.id_Trimestre}>
                  <td>{trimestres.id_Trimestre}</td>
                  <td>{trimestres.ejercicio}</td>
                  <td>{trimestres.fechaInicio}</td>
                  <td>{trimestres.fechaFin}</td>
                  <td>Q{trimestres.numeroTrimestre}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => selectTrimestre(trimestres, "Editar")}
                    >
                      Editar
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={() => selectTrimestre(trimestres, "Eliminar")}
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
          <Modal.Title>Insertar Un Nuevo Trimestre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Ejercicio</Form.Label>
              <Form.Control name="ejercicio"  onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control name="fechaInicio" type="date" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de Fin</Form.Label>
              <Form.Control name="fechaFin" type="date" onChange={handleChange} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Example select</Form.Label>
              <Form.Control name="numeroTrimestre"  onChange={handleChange} as="select">
                <option value="1">Q1</option>
                <option value="2">Q2</option>
                <option value="3">Q3</option>
                <option value="4">Q4</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => insertTrimestre()}>
            Guardar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={()=>OpenCloseModalInsert()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalDelete} onHide={() => OpenCloseModalDelete()}>
        <Modal.Header>
          <Modal.Title>Eliminar Trimestre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta seguro de que desea eliminar este trimestre ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteTrimestre()}>
            Confirmar
          </Button>
          <Button variant="secondary" onClick={() => OpenCloseModalDelete()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>




      <Modal show={modalEdit} onHide={()=>OpenCloseModalDelete()}>
        <Modal.Header>
          <Modal.Title>Insertar Un Nuevo Trimestre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Ejercicio</Form.Label>
              <Form.Control name="ejercicio" value={trimestreSelected && trimestreSelected.ejercicio} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control name="fechaInicio"  value={trimestreSelected && trimestreSelected.fechaInicio} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de Fin</Form.Label>
              <Form.Control name="fechaFin" value={trimestreSelected && trimestreSelected.fechaFin} onChange={handleChange} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Example select</Form.Label>
              <Form.Control name="numeroTrimestre" value={trimestreSelected && trimestreSelected.numeroTrimestre} onChange={handleChange} as="select">
                <option value="1">Q1</option>
                <option value="2">Q2</option>
                <option value="3">Q3</option>
                <option value="4">Q4</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => editTrimestre()}>
            Guardar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={()=>OpenCloseModalEdit()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Trimestres;
