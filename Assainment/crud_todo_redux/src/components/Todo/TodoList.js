import React from "react";
import { useSelector } from "react-redux";
import DeleteAlert from "./DeleteAlert";
import EditTodoList from "./EditTodo";

const TodoList = () => {
  const todoItems = useSelector((state) => state.todo.value);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Task Name</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {todoItems.map((item, i) => {
                return (
                  <tr key={i.toString()}>
                    <td>{i}</td>
                    <td>{item}</td>
                    <td>
                      <button onClick={()=>{EditTodoList(i,item)}} className="btn btn-sm btn-primary">Edit</button>
                    </td>
                    <td>
                      <button onClick={()=>{DeleteAlert(i)}} className="btn btn-sm btn-danger">Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
