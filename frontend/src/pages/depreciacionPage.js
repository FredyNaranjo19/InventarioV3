import React from "react";
import Navbar from "../components/sidebar/Navbar";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { axios } from "../services/axios";

function Depreciacion() {
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [depreciaciones, setDepreciaciones] = useState([]);
  const [depreciacionSelected, setDepreciacionSelected] = useState({
    concepto: "",
    vidaUtil: "",
    porcentajeDepreciacionAnuall: "",
    porcentajeDepreciacionMensual: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepreciacionSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //*funciones axios
  const insertDepreciacion = async () => {
    await axios
      .post("depreciacion", depreciacionSelected)
      .then(
        (response) => setDepreciaciones(depreciaciones.concat(response.data)),
        OpenCloseModalInsert(),
        setDepreciacionSelected(null)
      );
  };
  const editDepreciacion = async () => {
    await axios
      .put(
        "depreciacion/" + depreciacionSelected.id_CatalogoDepreciacion,
        depreciacionSelected
      )
      .then((response) => {
        var dataNueva = depreciaciones;
        dataNueva.map((depreciaciones) => {
          if (
            depreciacionSelected.id_CatalogoDepreciacion ===
            depreciaciones.id_CatalogoDepreciacion
          ) {
            depreciaciones.concepto = depreciacionSelected.concepto;
            depreciaciones.vidaUtil = depreciacionSelected.vidaUtil;
            depreciaciones.porcentajeDepreciacionAnuall =
              depreciacionSelected.porcentajeDepreciacionAnuall;
            depreciaciones.porcentajeDepreciacionMensual =
              depreciacionSelected.porcentajeDepreciacionMensual;
          }
        });
        setDepreciaciones(dataNueva);
        setDepreciacionSelected(null);
        OpenCloseModalEdit();
      });
  };
  const deleteDepreciacion = async () => {
    await axios
      .delete("depreciacion/" + depreciacionSelected.id_CatalogoDepreciacion)
      .then((response) => {
        setDepreciaciones(
          depreciaciones.filter(
            (depreciaciones) =>
              depreciaciones.id_CatalogoDepreciacion !==
              depreciacionSelected.id_CatalogoDepreciacion
          )
        );
        setDepreciacionSelected(null);
        OpenCloseModalDelete();
      });
  };
  //*hook efectos de la pagina
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("depreciacion")
        .then((response) => {
          setDepreciaciones(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);
  //*Funciones Modales
  const selectDepreciacion = (depreciacion, caso) => {
    setDepreciacionSelected(depreciacion);
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
          <h1 style={{textAlign: 'center'}}>Catalogo de Depreciación</h1>
          <Button variant="primary" onClick={() => OpenCloseModalInsert()}>
            Nuevo Elemento del Catalogo de Depreciación
          </Button>
        </div>
        <div>
          <Table striped bordered hover variant ="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Concepto</th>
                <th>Tiempo de vida Util en Años</th>
                <th>Porcentaje de Depreciación Anual</th>
                <th>Porcentaje de Depreciación Mensual</th>
                <th>Funciones</th>
              </tr>
            </thead>
            <tbody>
            {depreciaciones.map((depreciaciones)=>(
                <tr key={depreciaciones.id_CatalogoDepreciacion}>
                  <td>{depreciaciones.id_CatalogoDepreciacion}</td>
                  <td>{depreciaciones.concepto}</td>
                  <td>{depreciaciones.vidaUtil}</td>
                  <td>{depreciaciones.porcentajeDepreciacionAnuall}</td>
                  <td>{depreciaciones.porcentajeDepreciacionMensual}</td>
                  <td>
                  <Button
                      variant="success"
                      onClick={()=>selectDepreciacion(depreciaciones,"Editar")}
                    >
                      Editar
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={()=>selectDepreciacion(depreciaciones,"Eliminar")}
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
          <Modal.Title>Insertar Un Nuevo Catalogo de Depreciacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Concepto</Form.Label>
              <Form.Control name="concepto" onChange={handleChange} />
            </Form.Group>
            
            <Form.Group >
              <Form.Label>Años de vida util.</Form.Label>
              <Form.Control name="vidaUtil"  onChange={handleChange}  as="select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
              </Form.Control>
            </Form.Group>
          
            <Form.Group>
              <Form.Label>Depreciacion Anual %</Form.Label>
              <Form.Control
                name="porcentajeDepreciacionAnuall"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Depreciacion Mensual %</Form.Label>
              <Form.Control
                name="porcentajeDepreciacionMensual"
                onChange={handleChange}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => insertDepreciacion()}>
            Guardar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={() => OpenCloseModalInsert()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalDelete} onHide={() => OpenCloseModalDelete()}>
        <Modal.Header>
          <Modal.Title>Eliminar Catalogo de Depreciacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta seguro de que desea eliminar este catalogo ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteDepreciacion()}>
            Confirmar
          </Button>
          <Button variant="secondary" onClick={() => OpenCloseModalDelete()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={modalEdit} onHide={() => OpenCloseModalEdit()}>
        <Modal.Header>
          <Modal.Title>Editar Catalogo de Depreciacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Concepto</Form.Label>
              <Form.Control name="concepto" value={depreciacionSelected && depreciacionSelected.concepto} onChange={handleChange} />
            </Form.Group>
            
            <Form.Group >
              <Form.Label>Años de vida util.</Form.Label>
              <Form.Control name="vidaUtil" value={depreciacionSelected && depreciacionSelected.vidaUtil} onChange={handleChange}   as="select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
              </Form.Control>
            </Form.Group>
          
            <Form.Group>
              <Form.Label>Depreciacion Anual %</Form.Label>
              <Form.Control
                name="porcentajeDepreciacionAnuall"
                value={depreciacionSelected && depreciacionSelected.porcentajeDepreciacionAnuall}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Depreciacion Mensual %</Form.Label>
              <Form.Control
                name="porcentajeDepreciacionMensual"
                value={depreciacionSelected && depreciacionSelected.porcentajeDepreciacionMensual}
                onChange={handleChange}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => editDepreciacion()}>
            Actualizar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={() => OpenCloseModalEdit()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Depreciacion;
