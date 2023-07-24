import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todo from "./features/components/Todo";
import AddTodo from "./features/components/AddTodo";
import { useGetTodosQuery } from "./features/slices/todolistApi";
import { getTodos } from "./features/slices/todolistSlice";

const TodoList = () => {
  // Using React Redux hooks to get the 'todos' state from the Redux store
  const { todos } = useSelector((state) => state.todolist);
  
  // Using the 'useGetTodosQuery' hook provided by the 'todolistApi' to fetch data asynchronously
  const { data, isLoading, isFetching, isError, isSuccess, refetch } = useGetTodosQuery();

  // Getting the dispatch function to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // useEffect hook to update 'todos' in Redux store when data is successfully fetched
  useEffect(() => {
    if (isSuccess) {
      // Dispatching the 'getTodos' action with fetched data to update the Redux store
      dispatch(getTodos(data.data));
    }

    //eslint-disable-next-line
  }, [isSuccess]);

  // Function to refetch data and update Redux store when called
  const refetchData = async () => {
    // Using 'refetch' function from the 'useGetTodosQuery' hook to refetch data
    await refetch().then((res) => {
      // Dispatching the 'getTodos' action with the refetched data to update the Redux store
      dispatch(getTodos(res.data.data));
    });
  };

  // Rendering the TodoList component
  return (
    <div className="max-w-4xl mx-auto mt-8 px-2">
      {/* Rendering the 'AddTodo' component and passing 'refetchData' function as a prop */}
      <AddTodo refetch={refetchData} />
      {isLoading || isFetching ? (
        // Conditional rendering based on loading and fetching states
        <div className="h-64 grid justify-center items-center font-semibold text-emerald-600 text-2xl">
          Loading your todos...
        </div>
      ) : isError ? (
        // Conditional rendering in case of an error
        <div className="h-64 grid justify-center items-center font-semibold text-red-600 text-2xl">
          {" "}
          Something went wrong : Refresh page{" "}
        </div>
      ) : todos?.length ? (
        // Conditional rendering when there are todos available in the 'todos' array
        todos.map((todo) => {
          // Rendering the 'Todo' component for each todo item
          return <Todo todo={todo} key={todo.id} refetch={refetch} />;
        })
      ) : (
        // Conditional rendering when there are no todos in the 'todos' array
        <div className="h-72 grid justify-center items-center font-semibold text-red-400 text-2xl">
          Sorry !!! No todos yet
        </div>
      )}
    </div>
  );
};

export default TodoList;
