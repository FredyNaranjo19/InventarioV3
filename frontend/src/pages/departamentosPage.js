import React from "react";
import Navbar from "../components/sidebar/Navbar";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { axios } from "../services/axios";

function Departamentos() {
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const [departamentoSelected, setDepartamentoSelected] = useState({
    nombreDepartamento:"",
    ubicacionDepartamento:""
  }
  )
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartamentoSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
//*funciones axios
const insertDepartamento = async () => {
  await axios
    .post("departamentos", departamentoSelected)
    .then(
      (response) => setDepartamentos(departamentos.concat(response.data)),
      OpenCloseModalInsert(),
      setDepartamentoSelected(null)
      
    );
};
const editDepartamento = async () => {
  await axios.put('departamentos/'+departamentoSelected.id_Departamento,departamentoSelected)
  .then((response)=>{
    var dataNueva = departamentos;
    dataNueva.map((departamentos)=>{
      if(departamentoSelected.id_Departamento === departamentos.id_Departamento){
        departamentos.nombreDepartamento= departamentoSelected.nombreDepartamento;
        departamentos.ubicacionDepartamento = departamentoSelected.ubicacionDepartamento;
        
      }
    })
  setDepartamentos(dataNueva);
  setDepartamentoSelected(null);
  OpenCloseModalEdit();
  })
}
const deleteDepartameto = async () => {
  await axios.delete("departamentos/"+departamentoSelected.id_Departamento)
  .then((response)=>{
    setDepartamentos(departamentos.filter(departamentos =>departamentos.id_Departamento !== departamentoSelected.id_Departamento));
    setDepartamentoSelected(null);
    OpenCloseModalDelete();
  })
}
//*hook efectos de la pagina
useEffect(() => {
  async function fetchData() {
    await axios
      .get("departamentos")
      .then((response) => {
        setDepartamentos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  fetchData();
}, []);
//*Funciones Modales
const selectDepartamento = (departamento,caso) => {
  setDepartamentoSelected(departamento);
  caso === "Editar" ? OpenCloseModalEdit():OpenCloseModalDelete()
}
const OpenCloseModalInsert = () => {
  setModalInsert(!modalInsert);
};
const OpenCloseModalEdit=()=>{
  setModalEdit(!modalEdit);
}
const OpenCloseModalDelete = () => {
  setModalDelete(!modalDelete);
}
  return (
    <>
      <div>
        <Navbar />
        <div className="menu">
          <h1 style={{textAlign: 'center'}}>Departamentos</h1>
          <Button variant="primary" onClick={() =>OpenCloseModalInsert()}>Insertar Nuevo Departamento</Button>
        </div>
        <div>
          <Table striped bordered hover variant ="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Departamento</th>
                <th>Ubicacion del departamento</th>
                <th>Funciones</th>
              </tr>
            </thead>
            <tbody>
            {departamentos.map((departamentos)=>(
                <tr key={departamentos.id_Departamento}>
                  <td>{departamentos.id_Departamento}</td>
                  <td>{departamentos.nombreDepartamento}</td>
                  <td>{departamentos.ubicacionDepartamento}</td>
                  <td>
                  <Button
                      variant="success"
                      onClick={()=>selectDepartamento(departamentos,"Editar")}
                    >
                      Editar
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={()=>selectDepartamento(departamentos,"Eliminar")}
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
          <Modal.Title>Insertar Un Nuevo Departamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre Del Departamento</Form.Label>
              <Form.Control name="nombreDepartamento" onChange={handleChange} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Ubicacion Del Departamento</Form.Label>
              <Form.Control name="ubicacionDepartamento" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => insertDepartamento()}>
            Guardar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={OpenCloseModalInsert}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={modalEdit} onHide={()=>OpenCloseModalEdit()}>
        <Modal.Header>
          <Modal.Title>Editar  Departamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre Del Departamento</Form.Label>
              <Form.Control name="nombreDepartamento" value={departamentoSelected && departamentoSelected.nombreDepartamento} onChange={handleChange} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Ubicacion Del Departamento</Form.Label>
              <Form.Control name="ubicacionDepartamento" value={departamentoSelected && departamentoSelected.ubicacionDepartamento} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => editDepartamento()}>
            Guardar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={()=>OpenCloseModalEdit()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={modalDelete} onHide={()=>OpenCloseModalEdit()}>
        <Modal.Header>
          <Modal.Title>Eliminar Departamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta seguro de que desea eliminar este Departamento ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>deleteDepartameto()}>
            Confirmar
          </Button>
          <Button variant="secondary" onClick={()=>OpenCloseModalDelete()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Departamentos;
