import React, { useState, useEffect } from "react";
import Boton from "../dash/boton";
import { EyeIcon } from "@heroicons/react/24/outline";
import Modal from "react-modal";
import axios from "axios";
// Establecemos la referencia al elemento raíz de la aplicación para React Modal

export default function AlertaVer(props) {
  const { idSeleccionado, tooltip } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [datosMostrados, setDatosMostrados] = useState(null);
  const [deshabilitado, setDeshabilitado] = useState(false);

  const customStyles = {
    content: {
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "90%",
      maxWidth: "100%",
      padding: "10px",
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };



  useEffect(() => {
    setDeshabilitado(!(idSeleccionado !== null && idSeleccionado));
  }, [idSeleccionado]);

  const handleMensajeClick = async () => {
    try {
      const result = await axios.get(`http://localhost:4321/groomer/${idSeleccionado}`);

      setDatosMostrados(result.data);
      setModalIsOpen(true);
    } catch (error) {
      console.log('Error' + error.message);
      // Manejar el error adecuadamente, mostrar un mensaje al usuario, etc.
    }
  };

  return (
    <>
      <>
        <Boton
          bgColor="secondary"
          icon={<EyeIcon className="w-6 h-6" />}
          tooltip={tooltip}
          onClick={handleMensajeClick}
          desable={deshabilitado}
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {datosMostrados && (
            <div>
              <h2 style={{ color: "#333", textAlign: "center", fontSize: "24px", marginBottom: "20px" }}>Información del registro seleccionado</h2>
              <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: "10px", overflow: "hidden" }}>
                  <thead style={{ backgroundColor: "#f0f0f0" }}>
                    <tr>
                      <th>Nombre cliente</th>
                      <th>Fecha</th>
                      <th>Servicio Finalizado</th>
                      <th>Nombre Mascota</th>
                      <th>Servicio</th>
                      <th>Observaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={datosMostrados.id}>
                      <td style={{ ...styles.tableData, maxWidth: "150px" }}>{datosMostrados.primer_nombre_cliente} {datosMostrados.primer_apellido_cliente}</td>
                      <td style={{ ...styles.tableData, maxWidth: "150px" }}>{datosMostrados.fecha_servicio_groomer}</td>
                      <td style={{ ...styles.tableData, maxWidth: "150px" }}>{datosMostrados.servicio_finalizado_groomer === 1 ? 'Finalizado' : 'En proceso'}</td>
                      <td style={{ ...styles.tableData, maxWidth: "150px" }}>{datosMostrados.nombre_mascota}</td>
                      <td style={{ ...styles.tableData, maxWidth: "150px" }}>{datosMostrados.descripcion_servicio}</td>
                      <td style={{ ...styles.tableData, maxWidth: "350px " }}>{datosMostrados.contenido_servicio_groomer}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <button style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", display: "block", marginLeft: "auto", marginRight: "auto" }} onClick={() => setModalIsOpen(false)}>Cerrar</button>
        </Modal>
      </>
    </>



  );
}

const styles = {
  tableHeader: {
    padding: "12px 8px",
    fontWeight: "bold",
    textAlign: "left",
    borderBottom: "1px solid #ccc",
  },
  tableRow: {
    borderBottom: "1px solid #ccc",
  },
  tableData: {
    padding: "12px 8px",
    borderBottom: "1px solid #ccc",
  },
};
