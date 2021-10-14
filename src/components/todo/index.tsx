import List from "./List"
import '../../styles/todo.scss'
import React, {useEffect} from "react";
import useTodo from "../../hooks/useTodo";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/appHooks";
import {setTodoFunctions, setTodo} from "../../redux/todo";

const Todo = () => {
  const [todoData, {addTodo, updateTodo, deleteTodo}] = useTodo()
  const {todo} = useAppSelector(state => state.todo)
  const statusList = todo.statusList
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setTodoFunctions({addTodo, updateTodo, deleteTodo}))
  }, [])

  useEffect(() => {
    dispatch(setTodo(todoData))
  }, [todoData])

  return (
    <div className="todo-main">
      <h1>ToDo List</h1>
      <div className="wrapper">
        <div className="separator vertical"/>
        {
          statusList.map((status, i) => {
            return <React.Fragment key={i}>
              <List index={i}/>
              <div className="separator vertical"/>
            </React.Fragment>
          })
        }
      </div>
    </div>
  );
};

export default Todo;
