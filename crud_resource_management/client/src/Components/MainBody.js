import React, { useEffect, useReducer,useState } from "react";
import { Container, Row, Col, Modal, Button ,Form,} from "react-bootstrap";
import { Delete, Read,ReadById, Update } from "../APIServices/CRUDServices";
import CardDesign from "./Card";
import PageLoader from "./Common/PageLoader";
import {isEmpty,errorToast,successToast} from '../Helper/ValidationHelper'
const Reducer = (state, action) => {
  switch (action.type) {
    case "fetchData": {
      return {
        ...state,
        allResource: action.payload,
        error: "",
        isLoading: true,
      };
    }
    case "modal_close": {
      return {
        ...state,
        showModal: false,
      };
    }
    case "modal_open": {
      return {
        ...state,
        showModal: true,
        modalTitle: action.payload.title,
        currentId: action.payload.id,
        isActive:action.payload.isActive
        
      };
    }
    case "modal_open_updatemode":{
      return{
        ...state,
        modalUpdateMode:true,
        showModal:true,
        modalTitle:action.payload.title,
        isActive:action.payload.isActive,
        
      }
    }
    case "modal_close_updateMode":{
      return{
        ...state,modalUpdateMode:false
      }
    }
    case "error": {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }
    case "update_currentId": {
      return {
        ...state,
        currentId: action.payload,
      };
    }
    default:
      return state;
  }
};
const initialState = {
  allResource: [],
  isLoading: false,
  error: "",
  showModal: false,
  currentId: "",
  modalTitle: "",
  isDelete:false,
  isActive:"",
  modalUpdateMode:false
};

const MainBody = ({id}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [showBasic, setShowBasic] = useState(false);
  const [show, setShow] = useState(false);
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [img,setImg]=useState("")
  const [subject,setSubject]=useState("");
  const [semester,setSemester]=useState("")
  const [year,setYear]=useState("")

  // Delete  handle 
  const handleDelete = (id) => {
    dispatch({
      type: "modal_open",
      payload: { title: "Do you want to delete?", id: id,isActive:"delete" },
    });
  };

  //Update  Data
  const handleUpdate = (id) => {
    dispatch({
      type: "modal_open",
      payload: { title: "Do you want to Update ?", id: id,isActive:"update" },
    });
    console.log("udate", id);
  };

  
  const updateData=(e)=>{
    e.preventDefault()
    dispatch({type:"modal_open_updatemode",payload:{title:"Update this Resources",isActive:"update_currentData"}})

  }

  // Update current Resource 
  useEffect(()=>{
    ReadById(state.currentId).then((res)=>{
      console.log("Read By id Inside mainbody",res,state.currentId)
      setTitle(res.ResourceTitle)
      setDescription(res.ResourceDes)
      setImg(res.ResourceImg)
      setSemester(res.SemesterName)
      setSubject(res.SubjectName)
      setYear(res.Year)

      
    }).catch((err) => dispatch({ type: "error", payload: err }));

  },[state.isActive])

  // Updata by current resource 
  const updateDataByUserId=(e)=>{
    e.preventDefault();
    if(isEmpty(title)||isEmpty(description)||isEmpty(img)||isEmpty(subject)||isEmpty(semester)||isEmpty(year)){
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
      Update(data,state.currentId).then((res)=>{
        if(res){
          successToast("Data Update Successfully !")
          dispatch({ type: "modal_close" });
          dispatch({type:"modal_close_updateMode"});
        }else{
          errorToast("Something went  wrong !");
        }

      }).catch((err) => dispatch({ type: "error", payload: err }));

    }
    console.log(state.currentId)
  }

  // Delete current resources 
  const deleteData=(e)=>{
    e.preventDefault()
    console.log("delete")
    Delete(state.currentId)
    dispatch({type:"modal_close"})

  }
//Modal close 
const handleClose = () => {
  dispatch({ type: "modal_close" });
  dispatch({type:"modal_close_updateMode"});
};
  useEffect(() => {
    Read()
      .then((data) => {
        if (data) {
          dispatch({ type: "fetchData", payload: data });
          console.log("insideUseEefect", data);
        } else {
          dispatch({ type: "error", payload: "Data not fetched !" });
        }
      })
      .catch((err) => dispatch({ type: "error", payload: err }));
  }, [state.showModal,id]);
  return (
    <Container>
      <Modal
        show={state.showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{state.modalTitle}</Modal.Title>
        </Modal.Header>
        {
          state.modalUpdateMode?( <Modal.Body className="show-grid">
        <Container>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Resource Title</Form.Label>
        <Form.Control type="text" onChange={(e)=> setTitle(e.target.value)} value={title} placeholder="Resource title" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Resource Description</Form.Label>
        <Form.Control type="text" onChange={(e)=> setDescription(e.target.value)} value={description} placeholder="Description...." />
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Resource Image</Form.Label>
        <Form.Control type="text" onChange={(e)=> setImg(e.target.value)} value={img} placeholder="Images URL...." />
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Resource Subject</Form.Label>
        <Form.Control type="text" onChange={(e)=>setSubject(e.target.value)} value={subject} placeholder="Subject Name...." />
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Resource Semester</Form.Label>
        <Form.Control type="text" onChange={(e)=>setSemester(e.target.value)} value={semester} placeholder="Semester...." />
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Year</Form.Label>
        <Form.Control type="text" onChange={(e)=>setYear(e.target.value)} value={year} placeholder="Year...." />
      </Form.Group>
      </Form>
        </Container>
      </Modal.Body>):""
        }
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {state.modalUpdateMode? ( <Button variant="primary" onClick={updateDataByUserId} >Update</Button>):(<Button variant="primary" onClick={(e)=> state.isActive==="delete"?deleteData(e):state.isActive==="update"?updateData(e):""}    >YES</Button>)}
         
        </Modal.Footer>
      </Modal>
      {state.isLoading ? (
        <Row xs={1} md={3} lg={4} className="g-2 pt-2">
          {state.allResource.map((item, idx) => (
            <Col>
              <CardDesign
                item={item}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                key={idx}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <PageLoader />
      )}
    </Container>
  );
};

export default MainBody;
