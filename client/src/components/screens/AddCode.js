import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col} from 'reactstrap';
import axios from 'axios';
import swal from 'sweetalert';
const AddCode = (props) => {
  
   const [modal, setModal] = useState(false);
   const [title, setTitle] = useState('');
   const [code, setCode] = useState('');
   const [url, setUrl] = useState('');
   const [difficulty, setDifficulty] = useState('');
   const [notes, setNotes] = useState('');
   const [focus, setFocus] = useState('');
  const toggle = () => setModal(!modal);
  const onSubmit = async (event) => {
    event.preventDefault();
    const newCode = {
        title,code,url,difficulty,notes
    };
    try{
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
        };

        const body = JSON.stringify(newCode);

        const res = await axios.post('/api/private',body, config);
        //.setItem('token', res.data.token);
        //console.log(res.data);
        //setAuthenticated(true);
        //onAdd({cardNo, expiryDate, name})
        //console.log(props);
        props.fetchPrivateDate();
        swal({
            title: "Code Added",
            icon: "success",
            buttons: "Close"
          })
        setTitle('');
        setCode('');
        setUrl('');
        setDifficulty('Easy');
        setNotes('');
        setFocus('');
        toggle();
    }
    catch(err){
        console.error(err);
        swal({
            title: "Code Not Added",
            icon: "error",
            buttons: "Close"
          })
    }
    //alert("Card Added");
    
}


  return (
    <div>
      <Button color="dark" onClick={toggle}>Add Code</Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Code</ModalHeader>
        <ModalBody>
        <Form onSubmit={onSubmit}>
        <Container>

            <Row>
                <Col>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input 
                            type="text"
                            name="title"
                            placeholder="Title"  
                            value={title} 
                            onChange={(e)=>{setTitle(e.target.value)}} 
                            onFocus={(event) => setFocus(event.target.name)}
                            required
                        />
                </FormGroup>
                </Col>
            </Row>
        
            <Row>
                <Col>
                    <FormGroup>
                        <Label>Url</Label>
                        <Input 
                            type="text" 
                            name="url"
                            placeholder="Url" 
                            value={url} 
                            onChange={(e)=>{setUrl(e.target.value)}} 
                            onFocus={(event) => setFocus(event.target.name)}
                            required
                        />
                    </FormGroup>
                </Col>
            </Row>
        
            <Row>
                <Col>
                    <FormGroup>
                        <Label>Difficulty</Label>
                        <Input type="select" name="difficulty" onChange={(e)=>setDifficulty(e.target.value)} onFocus={(event) => setFocus(event.target.name)}>
                            <option value='Easy'>Easy</option>
                            <option value='Medium'>Medium</option>
                            <option value='Hard'>Hard</option>
                            required
                       </Input>
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col>
                    <FormGroup>
                        <Label>Code</Label>
                        <Input 
                            type="textarea" 
                            name="code"
                            placeholder="Code" 
                            value={code} 
                            onChange={(e)=>{setCode(e.target.value)}} 
                            onFocus={(event) => setFocus(event.target.name)}
                            required
                        />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col>
                    <FormGroup>
                        <Label>Notes</Label>
                        <Input 
                            type="textarea" 
                            name="notes"
                            placeholder="Notes" 
                            value={notes} 
                            onChange={(e)=>{setNotes(e.target.value)}} 
                            onFocus={(event) => setFocus(event.target.name)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col style={{width:'100%', display: 'flex',justifyContent: 'center'}}>
                    <Button color="success">Add Code</Button>
                </Col>
            </Row>
        </Container>
    </Form>
        </ModalBody>
        
      </Modal>
    </div>
  );
}

export default AddCode;