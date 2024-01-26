import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const ViewModal = ({ show, handleClose, handleShow, singleStude }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={"fade"}>
        <Modal.Header closeButton>
          <Modal.Title>Student Info</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
            }}
            src={singleStude.photo}
            alt=""
          />
          <h1>{singleStude.name}</h1>
          <hr />
          <div className="d-flex justify-content-between mx-4">
            <span>
              <b>Email:</b> {singleStude.email}
            </span>
            <span>
              <b>Roll:</b> {singleStude.Roll}
            </span>
          </div>
          <hr />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewModal;
