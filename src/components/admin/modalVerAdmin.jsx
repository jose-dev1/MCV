import React, { useState, useEffect } from "react";
import Boton from "../dash/boton";
import { EyeIcon } from "@heroicons/react/24/outline";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

export default function AlertaVer(props) {
  const { idSeleccionado, tooltip } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [datosMostrados, setDatosMostrados] = useState(null);
  const [deshabilitado, setDeshabilitado] = useState(true);

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
    setDeshabilitado(idSeleccionado.length === 0 || idSeleccionado === -1);
  }, [idSeleccionado]);

  const handleMensajeClick = async () => {
    try {
      const result = await axios.get(`http://localhost:4321/admin/${idSeleccionado}`);
      if (result.data && result.data.length > 0) {
        setDatosMostrados(result.data[0]);
        setModalIsOpen(true);
      } else {
        // No hay datos disponibles para mostrar
        console.log("No se encontraron datos para mostrar");
      }
    } catch (error) {
      console.log('Error' + error.message);
      // Manejar el error adecuadamente, mostrar un mensaje al usuario, etc.
    }
  };

  return (
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
        <div>
          <h2 style={{ color: "#333", textAlign: "center", fontSize: "24px", marginBottom: "20px" }}>Información del registro seleccionado</h2>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {datosMostrados && (
              <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: "10px", overflow: "hidden" }}>
                <thead style={{ backgroundColor: "#f0f0f0" }}>
                  <tr>
                    <th>Correo</th>
                    <th>Password</th>
                    <th>Estado</th>
                    <th>Tipo Usuario</th>
                    <th>Número Documento</th>
                    <th>Tipo Documento</th>
                    <th>Primer Nombre</th>
                    <th>Segundo Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={datosMostrados.id}>
                    <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center", padding: "10px" }}>{datosMostrados.correo_usuario}</td>
                    <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center", padding: "10px" }}>{datosMostrados.password_usuario}</td>
                    <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center", padding: "10px" }}>{datosMostrados.estado_usuario === 1 ? 'Activo' : 'Desactivado'}</td>
                    <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center", padding: "10px" }}>{datosMostrados.descripcion_usuario}</td>
                    <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center", padding: "10px" }}>{datosMostrados.numero_documento_empleado}</td>
                    <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center", padding: "10px" }}>{datosMostrados.id_tipo_documento}</td>
                    <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center", padding: "10px" }}>{datosMostrados.primer_nombre_empleado}</td>
                    <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center", padding: "10px" }}>{datosMostrados.segundo_nombre_empleado}</td>
                    <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center", padding: "10px" }}>{datosMostrados.primer_apellido_empleado}</td>
                    <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center", padding: "10px" }}>{datosMostrados.segundo_apellido_empleado}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
        <button style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", display: "block", marginLeft: "auto", marginRight: "auto" }} onClick={() => setModalIsOpen(false)}>Cerrar</button>
      </Modal>
    </>
  );
}
