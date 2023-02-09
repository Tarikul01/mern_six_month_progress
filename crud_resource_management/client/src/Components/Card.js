import React from "react";
import { Button, Card } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import TextMinimize from "./Common/TextMinimize";
import TitleMinimize from "./Common/TitleMinimize";

const CardDesign = ({item,handleDelete,handleUpdate}) => {
  return (
    <Card style={{ minWidth:"14rem" }}>
      <Card.Img
        variant="top"
        src={item.ResourceImg}
      />
      <Card.Body>
        <Card.Title>{TitleMinimize(item.ResourceTitle)}</Card.Title>

        <p ClassName="card-text">
          {TextMinimize(item.ResourceDes)}
        </p>
      </Card.Body>
      <div class="card-footer  border-success d-flex justify-content-between">
        <Button className="btn btn-danger px-5" onClick={()=>handleDelete(item._id)} >
          <AiFillDelete  size={27} />
        </Button>
        <Button className="btn btn-warning px-5" onClick={()=>handleUpdate(item._id)} >
          <AiFillEdit size={27}  />
        </Button>
      </div>
    </Card>
  );
};

export default CardDesign;
