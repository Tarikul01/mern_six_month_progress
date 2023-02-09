import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { AddTodo } from "../../redux/state/todoSlice";

const CreateTodo = () => {
  const dispatch = useDispatch();
  const taskInput = useRef();
  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-md-10">
          <input
            type="text"
            ref={taskInput}
            placeholder="Task Name"
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <button
            onClick={() => dispatch(AddTodo(taskInput.current.value))}
            className="btn btn-primary"
          >
            Add todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
