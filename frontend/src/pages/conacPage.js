import React from "react";
import Navbar from "../components/sidebar/Navbar";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { axios } from "../services/axios";

function Conac() {
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [conac, setConac] = useState([]);
  const [conacSelected, setConacSelected] = useState({
    nombre: "",
    grupoBienes: "",
    subcategoria: "",
    categoria: "",
    descripcion: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConacSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
//*Funciones Base de Datos
  const InserConac = async () => {
    await axios
      .post("conac", conacSelected)
      .then(
        (response) => setConac(conac.concat(response.data)),
        OpenCloseModalInsert()
      );
  };
  const editConac = async () => {
    await axios.put('conac/'+conacSelected.id_clasificacionConac,conacSelected)
    .then((response)=>{
      var dataNueva = conac;
      dataNueva.map((conac)=>{
        if(conacSelected.id_clasificacionConac === conac.id_clasificacionConac){
          conac.nombre = conacSelected.nombre;
          conac.grupoBienes = conacSelected.grupoBienes;
          conac.categoria = conacSelected.categoria;
          conac.subcategoria = conacSelected.subcategoria;
          conac.descripcion = conacSelected.descripcion;
        }
      })
    setConac(dataNueva);
    setConacSelected(null);
    OpenCloseModalEdit();
    })
  }

  const deleteConac = async () => {
    await axios.delete("conac/"+conacSelected.id_clasificacionConac)
    .then((response)=>{
      setConac(conac.filter(conac=>conac.id_clasificacionConac !== conacSelected.id_clasificacionConac));
      setConacSelected(null);
      OpenCloseModalDelete();
    })
  }
//* Hook efectos de la pagina
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("conac")
        .then((response) => {
          setConac(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  const selectConac = (conac,caso) => {
    setConacSelected(conac);
    caso === "Editar" ? OpenCloseModalEdit():OpenCloseModalDelete()
  }
  //*Control de Apertura de Modales
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
          <h1 style={{textAlign: 'center'}}>CONAC</h1>
          <Button variant="primary" onClick={OpenCloseModalInsert}>
            Nueva Clasificacion de CONAC
          </Button>
        </div>
        <div>
          <Table striped bordered hover variant ="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre de Clasificación</th>
                <th>Grupo de Bienes</th>
                <th>Categoria</th>
                <th>SubCategoria</th>
                <th>Descripción</th>
                <th>Funciones</th>
              </tr>
            </thead>
            <tbody>
              {conac.map((conacs)=>(
                <tr key={conacs.id_clasificacionConac}>
                  <td>{conacs.id_clasificacionConac}</td>
                  <td>{conacs.nombre}</td>
                  <td>{conacs.grupoBienes}</td>
                  <td>{conacs.categoria}</td>
                  <td>{conacs.subcategoria}</td>
                  <td>{conacs.descripcion}</td>
                  <td>
                  <Button
                      variant="success"
                      onClick={()=>selectConac(conacs,"Editar")}
                    >
                      Editar
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={()=>selectConac(conacs,"Eliminar")}
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
          <Modal.Title>Insertar Una Nueva Clasificacion de Conac</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre Clasificacion</Form.Label>
              <Form.Control name="nombre" onChange={handleChange} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Grupo de Bienes</Form.Label>
              <Form.Control name="grupoBienes" onChange={handleChange} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Categoria</Form.Label>
              <Form.Control name="categoria" onChange={handleChange} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Subcategoria</Form.Label>
              <Form.Control name="subcategoria" onChange={handleChange} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Descripcion</Form.Label>
              <Form.Control name="descripcion" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => InserConac()}>
            Guardar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={OpenCloseModalInsert}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalDelete} onHide={()=>OpenCloseModalDelete()}>
        <Modal.Header>
          <Modal.Title>Eliminar Clasificacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta seguro de que desea eliminar esta Clasificacion de CONAC ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>deleteConac()}>
            Confirmar
          </Button>
          <Button variant="secondary" onClick={()=>OpenCloseModalDelete()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalEdit} onHide={()=>OpenCloseModalEdit()}>
        <Modal.Header>
          <Modal.Title>Editar una clasificacion de CONAC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre Clasificacion</Form.Label>
              <Form.Control
              value={conacSelected && conacSelected.nombre}
               name="nombre" onChange={handleChange} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Grupo de Bienes</Form.Label>
              <Form.Control name="grupoBienes" 
              value={conacSelected && conacSelected.grupoBienes}
              onChange={handleChange} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Categoria</Form.Label>
              <Form.Control name="categoria" 
              value={conacSelected && conacSelected.categoria}
              onChange={handleChange} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Subcategoria</Form.Label>
              <Form.Control name="subcategoria" 
              value={conacSelected && conacSelected.subcategoria}
              onChange={handleChange} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Descripcion</Form.Label>
              <Form.Control name="descripcion" 
              value={conacSelected && conacSelected.descripcion}
              onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => editConac()}>
            Modificar
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

export default Conac;
