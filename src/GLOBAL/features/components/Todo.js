import React from "react";
import { useDispatch } from "react-redux";
import { deleteItem, setTodo } from "../slices/todolistSlice";
import { useDeleteTodoMutation } from "../slices/todolistApi";

const Todo = ({ todo, refetch }) => {
  const [deleteTodo, a] = useDeleteTodoMutation({
    onError: (err) =>{
      console.log(err)
    }
  });

  const dispatch = useDispatch();

  const confirmDelete = async () => {
    if (window.confirm("Are you sure you want to delete?") === true) {
        await deleteTodo(todo.id).then(res=>{
          if(res.data){
            dispatch(deleteItem(todo.id));
          }
        }).catch(err =>{
          console.log(err)
        });
    }
    
  };

  return (
    <div className="flex justify-between my-2 border-b border-blue-100 px-2 py-2">
      <div className="font-mono text-xl font-semibold">{todo.todo}</div>
      <div className="flex ml-2">
        <button
          onClick={() => dispatch(setTodo(todo))}
          className="text-white w-24 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Edit
        </button>
        <button
          onClick={confirmDelete}
          className={`text-white w-24 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-${
            a.isLoading ? "light" : "semibold"
          } rounded-lg text-${
            a.isLoading ? "xs" : "sm"
          } px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800`}
        >
          {a.isLoading ? "deleting ..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default Todo;
