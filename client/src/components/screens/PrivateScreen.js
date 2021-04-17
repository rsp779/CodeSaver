import { useState, useEffect } from "react";
import axios from "axios";
//import "./PrivateScreen.css";
import swal from 'sweetalert';
import AddCode from './AddCode';
import Code from './Code';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  
} from 'reactstrap';
import { Table } from 'reactstrap';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const PrivateScreen = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [allData,setAllData] = useState("");
  const [value,setValue] = useState('All');
  const fetchPrivateDate = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    //console.log(`error : ${authToken}`);
    try {
      const { data } = await axios.get("/api/private", config);
      setAllData(data.data);
      if(value === "All"){
        setPrivateData(data.data);}
        else{
        const curr = data.data.filter(x=>x.difficulty===value);
        setPrivateData(curr);
      }
      //setPrivateData(data.data);
      
     //console.log(data);
    } 
    catch (error) {
      localStorage.removeItem("authToken");
       setError("i hate Dev");
    }
  };
  useEffect(() => {
    if(!localStorage.getItem("authToken")){
      history.push("/login")
    }
    fetchPrivateDate();
  }, [history]);
  const handleClick = async(id)=>{
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    //console.log(`error : ${authToken}`);
    try {
      //console.log(id);
      const res = await axios.delete(`/api/private/${id}`, config);
      swal({
        title: "Code Deleted!",
        icon: "success",
        buttons: "Close"
      })
      fetchPrivateDate();
      }
    catch (error) {
      console.error(error)
      swal({
        title: "Code Not Deleted",
        icon: "error",
        buttons: "Close"
      })
    }
  }
  const logoutHandler=()=>{
    localStorage.removeItem("authToken");
    history.push("/login");
  };
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div>
      <div style={{height:"80px"}}>
        
      <Navbar color="success" light expand="md">
        <NavbarBrand><h3>Code Saver</h3></NavbarBrand>
          <Nav className="ml-auto">

          <NavItem style={{paddingRight:'10px'}}>
                 <AddCode fetchPrivateDate={fetchPrivateDate}/> 
            </NavItem>

            <NavItem>
                 <Button color="dark" onClick={logoutHandler}>Logout</Button>
                  
            </NavItem>
            </Nav>
      </Navbar>
      </div>
      <div style={{direction:'flex',justifyContent:'center',width:'100%'}}>
        <div style={{paddingLeft:'30%' ,width:'60%'}}>
        <Form>
        <FormGroup>
        <Label>Select Difficulty</Label>
        <Input type="select" name="difficulty" onChange={(e)=>{
          setValue(e.target.value);
          if(e.target.value === "All"){
          setPrivateData(allData);}
          else{
          const curr = allData.filter(x=>x.difficulty===e.target.value);
          setPrivateData(curr);
        }}}>
          <option value='All'>All</option>
          <option value='Easy'>Easy</option>
          <option value='Medium'>Medium</option>
          <option value='Hard'>Hard</option>
        </Input>
      </FormGroup>
      </Form>
        </div>
      </div>
      <div>{privateData.length?
      <Table>
      <thead>
        <tr>
          <th>S No.</th>
          <th>Title</th>
          <th>Difficulty</th>
          <th>Code</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {privateData.map((e,idx)=>(
        <tr>
          <th scope="row">{idx+1}</th>
          <td>{e.title}</td>
          <td>{e.difficulty}</td>
          <td><Code data = {e}/></td>
          <td><Button onClick={()=>{handleClick(e._id)}}> X </Button></td>
        </tr>))}
      </tbody>
    </Table>
      :<div>No Code Found</div>}</div>
    
    </div>
  );
};

export default PrivateScreen;