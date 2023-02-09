import React,{useEffect, useState} from 'react'
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Delete, Read } from '../../APIServices/CRUDServices';
import { errorToast } from '../../Helper/ValidationHelper';
import PageLoader from '../Common/PageLoader';

const ListTable = () => {
  const navigate=useNavigate()
  const [data,setData]=useState([])
  const [load,setLoad]=useState(false)
  useEffect(()=>{
    setLoad(true)
  Read().then((res)=>{
    //  const dataList=data.data.data;
    if(res.status===200){
      // setData(data)
      setData(res.data.data)
      setLoad(false)
    }else{
      setLoad(true)
    }
  })


  },[])

  const deleteButton=(id)=>{
    Delete(id)
    navigate('/')

  }
  const updateButton=()=>{

  }
  return (load?<PageLoader/>:
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Product Code</th>
        <th>Product Price</th>
        <th>Product Quantity</th>
        
        <th>Product Total Prize</th>
        
        <th>Product Image</th>
        
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

      {
      data.map((item,index)=>(
          <tr key={index}>
          <td>{item.ProductName}</td>
          <td>{item.ProductCode}</td>
          <td>{item.UnitPrice}</td>
          <td>{item.Qty}</td>
          <td>{item.TotalPrice}</td>
          <td><img style={{width:"50px",height:"auto"}} src={item.Img} /></td>
          <td><button className='btn btn-danger' onClick={deleteButton.bind(this,item._id)}>delete</button>
          <button className="btn btn-primary" onClick={updateButton.bind(this,item._id)}>Update</button></td>
        </tr>
        ))
      }
    </tbody>
    </Table>
  )
}

export default ListTable;
