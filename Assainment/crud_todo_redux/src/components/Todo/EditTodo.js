import React from 'react';
import Swal from "sweetalert2";
import { store } from '../../redux/store/store';
import { EditTodo } from '../../redux/state/todoSlice';

const EditTodoList = (i,item) => {
  return (
    Swal.fire({
        title: 'Are you  want to delete?',
        input:"text",
        inputValue:item,
        inputValidator:(value)=>{
            store.dispatch(EditTodo({index:i,task:value}))

        }
      })
  )
  
}

export default EditTodoList;
