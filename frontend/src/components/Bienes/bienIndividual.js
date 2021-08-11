import React from "react";
import Navbar from "../sidebar/Navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axios } from "../../services/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import {Link} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
function BienIndividual(props) {
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const {id} = useParams();
    const [bien,setBien] = useState([]);
    const [comentarios,setComentarios] = useState([]);
    const [comentarioSelect,setComentarioSelect] = useState({
        titulo:"",
        comentario:"",
        estado:"",
        id_Bien: id
});

    useEffect(() => {
        fetchBien();
    }, [id]);

    const insertComentario = async()=>{
        await axios
            .post("comentarios",comentarioSelect)
            .then((response)=>setComentarios(
                comentarios.concat(response.data)),
                OpenCloseModalInsert(),
                setComentarioSelect(null)
            
            )
    }
    const fetchBien = async()=>{
        await axios
        .get("bienes/bienes/" + id)
        .then((response)=>{
            setBien(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
        fetchComentarios();
    }
    const fetchComentarios = async()=>{
        await axios
        .get("comentarios/search/" +id)
        .then((response)=>{
            setComentarios(response.data);
        })
    }

    const downloadEtiqueta = async()=>{
        
    }
    const deleteComentario = async()=>{
      await axios.delete("comentarios/" + comentarioSelect.id_Comentario).then((response) => {
        setComentarios(comentarios.filter((comentarios) => comentarios.id_Comentario !== comentarioSelect.id_Comentario));
        setComentarioSelect(null);
        OpenCloseModalDelete();
      });
    }

    const editComentario = async()=>{
      await axios
      .put("comentarios/" + comentarioSelect.id_Comentario, comentarioSelect)
      .then((response) => {
        var dataNueva = comentarios;
        dataNueva.map((comentarios) => {
          if (comentarioSelect.id_Comentario === comentarios.id_Comentario) {
            comentarios.titulo = comentarioSelect.titulo;
            comentarios.comentario = comentarioSelect.comentario;
            comentarios.estado = comentarioSelect.estado;
            comentarios.id_Bien = comentarioSelect.id_Bien;
          }
        });
        setComentarios(dataNueva);
        setComentarioSelect(null);
        OpenCloseModalEdit();
      });
    }
    const OpenCloseModalInsert = () => {
        setModalInsert(!modalInsert);
      };
      const OpenCloseModalEdit = () => {
        setModalEdit(!modalEdit);
      };
      const OpenCloseModalDelete = () => {
        setModalDelete(!modalDelete);
      };
      const handleChange = (e) => {
        const { name, value } = e.target;
        setComentarioSelect((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      const selectComentario = (comentario, caso) =>{
        setComentarioSelect(comentario);
        caso === "Editar" ? OpenCloseModalEdit() : OpenCloseModalDelete();
      }
    return (
        <>
        <div>
            <Navbar/>

        </div>
        <div>
            <Container fluid>
            <h1 style={{ textAlign: "center" }}>Bien Individual</h1>
            </Container>
        </div>
        <div>
            <Container>
                <Row>
                  <Col>
                  <Image
                  style={{ height: 400, width: 400 }}
                  src={"http://localhost:4000/" + bien.fotografiaBien}
                  rounded/>
                  </Col>  
                  <Col>
                <h4>Nombre del bien: {bien.nombreBien}</h4>
                <h4>Clave de control: {bien.claveControl}</h4>
                <h4>Numero Inventario Armonizado: {bien.numeroInventarioArmonizado}</h4>
                <h4>Numero Inventario Anterior: {bien.numeroInventarioAnterior}</h4>
                <h4>Descripcion del bien: {bien.descripcionBien}</h4>
                <h4>Fecha del alta: {bien.fechaAlta}</h4>
                <h4>Estatus: {bien.estatusBien}</h4>
                <h4>Costo Contable: {bien.costoBien}</h4>
                <Button  href={`http://localhost:4000/${bien.etiquetaBien}`} variant="primary" download>
                    Descargar Etiqueta
                    </Button>
                  </Col>
                </Row>
            </Container>
        </div>
        <div>
            
        </div>
        <div>
            <h4>Comentarios</h4>
            <Button
            style={{}}
            variant="primary"
            onClick={() => OpenCloseModalInsert()}
          >
            Nuevo Comentario
          </Button>
            <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titulo</th>
                <th>Comentario</th>
                <th>Estado</th>
                <th>Funciones</th>
              </tr>
            </thead>
            <tbody>
                {comentarios.map((comentarios)=>(
                    <tr key={comentarios.id_Comentario}>
                        <td>{comentarios.id_Comentario}</td>
                        <td>{comentarios.titulo}</td>
                        <td>{comentarios.comentario}</td>
                        <td>{comentarios.estado}</td>
                        <td>
                        <Button
                      variant="success"
                      onClick={() => selectComentario(comentarios, "Editar")}
                    >
                      Editar
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={() => selectComentario(comentarios, "Eliminar")}
                    >Eliminar
                    </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
        </div>

        <Modal show={modalInsert} onHide={OpenCloseModalInsert}>
        <Modal.Header>
          <Modal.Title> Insertar Nuevo comentario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Titulo del comentario</Form.Label>
              <Form.Control name="titulo" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Comentario</Form.Label>
              <Form.Control name="comentario" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Control name="estado" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => insertComentario()}>
            Guardar
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={OpenCloseModalInsert}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      

      <Modal show={modalDelete} onHide={() => OpenCloseModalDelete()}>
        <Modal.Header>
          <Modal.Title>Eliminar Comentario</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta seguro de que desea eliminar este Comentario?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteComentario()}>
            Confirmar
          </Button>
          <Button variant="secondary" onClick={() => OpenCloseModalDelete()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={modalEdit} onHide={() => OpenCloseModalEdit()}>
        <Modal.Header>
          <Modal.Title>Editar Comentario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Titulo del comentario</Form.Label>
              <Form.Control value={comentarioSelect && comentarioSelect.titulo} name="titulo" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Comentario</Form.Label>
              <Form.Control value={comentarioSelect && comentarioSelect.comentario} name="comentario" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Control value={comentarioSelect && comentarioSelect.estado} name="estado" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => editComentario()}>
            Guardar
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

export default BienIndividual;