import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalPopUp({ title, body, onHide }){
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onHide();
  };
  

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPopUp;
