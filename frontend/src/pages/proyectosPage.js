import React from "react";
import Navbar from "../components/sidebar/Navbar";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { axios } from "../services/axios";

function Proyectos() {
  
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [proyectos, setProyectos] = useState([]);
  const [proyectoSelected, setProyectoSelected] = useState({
    claveProyecto: "",
    nombrProyecto: "",
    partidaPresupuestal:"",
    fuenteFinanciamiento:"",
    numeroCuenta:""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyectoSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //*funciones axios
  const insertProyecto = async () => {
    await axios
      .post("proyectos", proyectoSelected)
      .then(
        (response) => setProyectos(proyectos.concat(response.data)),
        OpenCloseModalInsert(),
        setProyectoSelected(null)
      );
  };
  const editProyecto = async () => {
    await axios
      .put("proyectos/" + proyectoSelected.id_Proyecto, proyectoSelected)
      .then((response) => {
        var dataNueva = proyectos;
        dataNueva.map((proyectos) => {
          if (proyectoSelected.id_Proyecto === proyectos.id_Proyecto) {
            proyectos.claveProyecto = proyectoSelected.claveProyecto;
            proyectos.nombrProyecto = proyectoSelected.nombrProyecto;
            proyectos.partidaPresupuestal = proyectoSelected.partidaPresupuestal;
            proyectos.fuenteFinanciamiento = proyectoSelected.fuenteFinanciamiento;
            proyectos.numeroCuenta = proyectoSelected.numeroCuenta;
          }
        });
        setProyectos(dataNueva);
        setProyectoSelected(null);
        OpenCloseModalEdit();
      });
  };
  const deleteProyecto = async () => {
    await axios.delete("proyectos/" + proyectoSelected.id_Proyecto).then((response) => {
      setProyectos(proyectos.filter((proyectos) => proyectos.id_Proyecto !== proyectoSelected.id_Proyecto));
      setProyectoSelected(null);
      OpenCloseModalDelete();
    });
  };
  //*hook efectos de la pagina
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("proyectos")
        .then((response) => {
          setProyectos(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);
  //*Funciones Modales
  const selectProyecto = (proyecto, caso) => {
    setProyectoSelected(proyecto);
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
      <Navbar/>
      <div className='menu'>
      <h1 style={{textAlign: 'center'}}>Proyectos</h1>

      <Button variant="primary" onClick={()=>OpenCloseModalInsert()} >
            Nuevo Proyecto
          </Button>
    </div>
    <div>
    <Table striped bordered hover variant ="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Clave Proyecto</th>
                <th>Nombre Proyecto</th>
                <th>Partida Presupuestal</th>
                <th>Fuente de Financiamiento</th>
                <th>Numero de la cuenta</th>
                <th>Funciones</th>
              </tr>
            </thead>
            <tbody>
            {proyectos.map((proyectos)=>(
                <tr key={proyectos.id_Proyecto}>
                  <td>{proyectos.id_Proyecto}</td>
                  <td>{proyectos.claveProyecto}</td>
                  <td>{proyectos.nombrProyecto}</td>
                  <td>{proyectos.partidaPresupuestal}</td>
                  <td>{proyectos.fuenteFinanciamiento}</td>
                  <td>{proyectos.numeroCuenta}</td>
                  <td>
                  <Button
                      variant="success"
                      onClick={()=>selectProyecto(proyectos,"Editar")}
                    >
                      Editar
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={()=>selectProyecto(proyectos,"Eliminar")}
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
          <Modal.Title>Insertar Un Nuevo Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Clave del Proyecto</Form.Label>
              <Form.Control name="claveProyecto" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre del Proyecto</Form.Label>
              <Form.Control name="nombrProyecto" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Partida Presupuestal</Form.Label>
              <Form.Control name="partidaPresupuestal" onChange={handleChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Fuente de financiamiento</Form.Label>
              <Form.Control name="fuenteFinanciamiento" onChange={handleChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Numero de cuenta.</Form.Label>
              <Form.Control name="numeroCuenta" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => insertProyecto()}>
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
          <Modal.Title>Eliminar Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta seguro de que desea eliminar este Proyecto ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteProyecto()}>
            Confirmar
          </Button>
          <Button variant="secondary" onClick={() => OpenCloseModalDelete()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>




      <Modal show={modalEdit} onHide={() => OpenCloseModalEdit()}>
        <Modal.Header>
          <Modal.Title>Editar El Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Clave del Proyecto</Form.Label>
              <Form.Control name="claveProyecto" value={proyectoSelected && proyectoSelected.claveProyecto} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre del Proyecto</Form.Label>
              <Form.Control name="nombrProyecto" value={proyectoSelected && proyectoSelected.nombrProyecto} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Partida Presupuestal</Form.Label>
              <Form.Control name="partidaPresupuestal" value={proyectoSelected && proyectoSelected.partidaPresupuestal} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Fuente de financiamiento</Form.Label>
              <Form.Control name="fuenteFinanciamiento" value={proyectoSelected && proyectoSelected.fuenteFinanciamiento} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Numero de cuenta.</Form.Label>
              <Form.Control name="numeroCuenta" value={proyectoSelected && proyectoSelected.numeroCuenta} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => editProyecto()}>
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

export default Proyectos;