import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import copy from 'copy-to-clipboard';
import swal from 'sweetalert';
const Code = (props) => {
  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle}>Code</Button>
      <Modal isOpen={modal} scrollable={true} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        toggle={toggle} className='modal-lg'>
        <ModalHeader toggle={toggle}>{props.data.title}</ModalHeader>
        <ModalBody>
          <h5>Url:</h5>
          {props.data.url}
          <br></br>
          <br></br>
          <h5>Code:</h5>
          <div style={{whiteSpace:'pre-wrap',backgroundColor:'#d1e0e0'}}>{props.data.code}</div>
          <br></br>
          <br></br>
          <h5>Notes:</h5>
          {props.data.notes}
        </ModalBody>
        <ModalFooter style={{direction:'flex',justifyContent:'center'}}>
        <Button color="success" onClick={()=>{copy(props.data.code); swal({
            title: "Code Copied",
            icon: "success",
            buttons: "Close"
          })}}>Copy Code</Button>
        <Button color="success" onClick={()=>{window.open(props.data.url)}}>Open Url</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Code;