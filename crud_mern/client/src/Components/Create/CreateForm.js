import React,{useRef,useState} from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { errorToast, isEmpty, successToast } from "../../Helper/ValidationHelper";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Create } from "../../APIServices/CRUDServices";
import PageLoader from "../Common/PageLoader";

function CreateForm() {
  const [isLoader,setIsLoader]=useState(false)
  let ProductName,ProductCode,Img,UnitPrice,Qty,TotalPrice=useRef();
  const productSave=(e)=>{
    e.preventDefault()
    const productCode=ProductCode.value;
    const productName=ProductName.value;
    const img=Img.value;
    const unitPrice=UnitPrice.value;
    const qty=Qty.value;
    const totalPrice=TotalPrice.value;
    if(isEmpty(productName) || isEmpty(productCode)|| isEmpty(img) ||isEmpty(unitPrice)|| isEmpty(qty) || isEmpty(totalPrice)){
      errorToast("Input field doesn't empty !")
    }else{
      setIsLoader(true)
      Create({productName,productCode,productImg:img,productPrice:unitPrice,productQty:qty,totalPrice}).then((data)=>{
        if(data){
          setIsLoader(false)
          successToast("Product  Upload success !")
          ProductName.value=""
          ProductCode.value=""
          Img.value=""
          UnitPrice.value=""
          Qty.value=""
          TotalPrice.value=""
        }else{
          errorToast("Product  don't  upload !")
        }
      })
    }
  
  }
  return (
    <Container>
    {
      isLoader?<PageLoader/>:  <Row>
        <Col xs={12} md={6}>
          <Form>
            <Form.Group >
              <Form.Label>Product Name</Form.Label>
              <Form.Control ref={(input)=>ProductName=input} type="text" />
            </Form.Group>
            
            <Form.Group >
              <Form.Label>Product Code</Form.Label>
              <Form.Control ref={(input)=>ProductCode=input} type="text" />
            </Form.Group>
            
            <Form.Group >
              <Form.Label>Img</Form.Label>
              <Form.Control ref={(input)=>Img=input} type="text" />
            </Form.Group>
            
            <Form.Group >
              <Form.Label>Unit Price</Form.Label>
              <Form.Control ref={(input)=>UnitPrice=input} type="text" />
            </Form.Group>
            
            <Form.Group >
              <Form.Label>Quantity</Form.Label>
              <Form.Control ref={(input)=>Qty=input} type="text" />
            </Form.Group>
            
            <Form.Group >
              <Form.Label>Total price</Form.Label>
              <Form.Control ref={(input)=>TotalPrice=input} type="text" />
            </Form.Group>

            <Button onClick={(e)=>productSave(e)} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    }
    
     
    </Container>
  );
}

export default CreateForm


