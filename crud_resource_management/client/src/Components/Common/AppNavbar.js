import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Modal,Button,Row,Col ,Container,Form} from "react-bootstrap";
import { errorToast, isEmpty, successToast } from "../../Helper/ValidationHelper";
import { Create } from "../../APIServices/CRUDServices";

export default function AppNavbar({setId}) {
  const [showBasic, setShowBasic] = useState(false);
  const [show, setShow] = useState(false);
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [img,setImg]=useState("")
  const [subject,setSubject]=useState("");
  const [semester,setSemester]=useState("")
  const [year,setYear]=useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleResource=()=>{
    if(isEmpty(title)||isEmpty(description)|| isEmpty(img)||isEmpty(subject)||isEmpty(semester)|| isEmpty(year)){
      errorToast("Input field doesn't empty !")
    }else{
      const data={
        "ResourceTitle":title,
        "ResourceDes":description,
        "ResourceImg":img,
        "SubjectName":subject,
        "SemesterName":semester,
        "Year":year
      }
      Create(data).then((res)=>{
        if(res){
          successToast("Resources Create Success !");
          setShow(false)
          setId(true)
        }else{
          errorToast("Something went wrong !")
        }
      })
    }
    
  }

  return (
    <MDBNavbar expand="lg" light bgColor="light">
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Resources</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
        <Container>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Resource Title</Form.Label>
        <Form.Control type="text" onChange={(e)=> setTitle(e.target.value)} placeholder="Resource title" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Resource Description</Form.Label>
        <Form.Control type="text" onChange={(e)=> setDescription(e.target.value)} placeholder="Description...." />
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Resource Image</Form.Label>
        <Form.Control type="text" onChange={(e)=> setImg(e.target.value)} placeholder="Images URL...." />
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Resource Subject</Form.Label>
        <Form.Control type="text" onChange={(e)=>setSubject(e.target.value)} placeholder="Subject Name...." />
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Resource Semester</Form.Label>
        <Form.Control type="text" onChange={(e)=>setSemester(e.target.value)} placeholder="Semester...." />
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Year</Form.Label>
        <Form.Control type="text" onChange={(e)=>setYear(e.target.value)} placeholder="Year...." />
      </Form.Group>
      </Form>
        </Container>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={handleResource} >Add Resource</Button>
        </Modal.Footer>
      </Modal>

      <MDBContainer fluid>
        <MDBNavbarBrand href="#">RESOURCE MANAGEMENT</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic} className="justify-content-center">
          <MDBNavbarNav fullWidth={false} className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
            <Button className="btn btn-primary">  <MDBNavbarLink aria-current="page" active  onClick={handleShow}>
                Add RESOURCE
              </MDBNavbarLink></Button>
            
            </MDBNavbarItem>

            {/* <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle  tag="a" className="nav-link" role="button">
                  SEMESTER
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                
            <LinkContainer to="/home">
              
                  <MDBDropdownItem link>Home</MDBDropdownItem>
              </LinkContainer>
              <LinkContainer to="/another">
                
                  <MDBDropdownItem link>Another action</MDBDropdownItem>
              </LinkContainer>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem> */}
          </MDBNavbarNav>

          {/* <form className="d-flex input-group ml-0 w-auto">
            <input
              type="search"
              className="form-control"
              placeholder="Search your needs..."
              aria-label="Search"
            />
            <MDBBtn color="primary">Search</MDBBtn>
          </form> */}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
