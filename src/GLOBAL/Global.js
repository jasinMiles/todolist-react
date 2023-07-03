import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todo from "./features/components/Todo";
import AddTodo from "./features/components/AddTodo";
import { useGetTodosQuery } from "./features/slices/todolistApi";
import { getTodos } from "./features/slices/todolistSlice";

const TodoList = () => {
  const { todos } = useSelector((state) => state.todolist);
  const { data, isLoading, isFetching, isError, isSuccess, refetch } = useGetTodosQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(getTodos(data.data));
    }

    //eslint-disable-next-line
  }, [isSuccess]);

  const refetchData = async () => {
    await refetch().then((res) => {
      dispatch(getTodos(res.data.data));
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-2">
      <AddTodo refetch={refetchData} />
      {isLoading || isFetching ? (
        <div className="h-64 grid justify-center items-center font-semibold text-emerald-600 text-2xl">
          Loading your todos...
        </div>
      ) : isError ? (
        <div className="h-64 grid justify-center items-center font-semibold text-red-600 text-2xl">
          {" "}
          Something went wrong : Refresh page{" "}
        </div>
      ) : todos?.length ? (
        todos.map((todo) => {
          return <Todo todo={todo} key={todo.id} refetch={refetch} />;
        })
      ) : (
        <div className="h-72 grid justify-center items-center font-semibold text-red-400 text-2xl">
          Sorry !!!. No todos yet
        </div>
      )}
    </div>
  );
};

export default TodoList;
