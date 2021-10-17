import {useAppDispatch, useAppSelector} from "../../redux/hooks/appHooks";
import {setDragOver} from "../../redux/todo";
import React, {useEffect, useState} from "react";

const Item = (props: any) => {
  const [editing, setEditing] = useState(false)
  const {todo: allTodo, dragoverIndex, updateTodo} = useAppSelector(state => state.todo)
  const {todo, todoId} = props
  const dispatch = useAppDispatch()
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [due, setDue] = useState("")

  const dragStop = (e: any) => {
    dispatch(setDragOver(-1)) // will change async
    if (dragoverIndex < 0)
      return
    const selectedTodo: any = allTodo.todoList.filter((todo: any) => {
      return todo.todoId === todoId
    })
    if (selectedTodo[0].status === dragoverIndex)
      return;
    updateTodo({
      id: todoId,
      status: dragoverIndex
    })
  }

  const save = () => {
    if (error)
      return
    if (!title)
      return setError("Provide a Title")
    if (!description)
      return setError("Need a description")
    if (!due)
      return setError("choose a due date")
    updateTodo({
      id: todoId,
      title,
      description,
      due: new Date(due).getTime(),
      status: props.index
    })
    setEditing(false)
  }

  useEffect(()=>{
    if(!error)
      return
    setError("")
  }, [title, description, due])

  useEffect(() => {
    if(!editing)
      return
    setTitle(todo.title)
    setDescription(todo.description)
    if (todo.due){
      const dueStamp = Number(todo.due)
      if(!dueStamp)
        return
      let dateTime = new Date(dueStamp).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: "2-digit",
        hour12: false
      }).split(", ")
      let dueDate = dateTime[0].split("/")
      dueDate = [dueDate[2], dueDate[0], dueDate[1]]
      const inputDateTime = [dueDate.join("-"), dateTime[1]].join("T")
      setDue(inputDateTime)
    }
  }, [todo, editing])

  if (editing)
    return (
      <>
        <div className="separator horizontal"/>
        <div className="add">
          <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title}/>
          <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description}/>
          <input type="datetime-local" onChange={(e) => setDue(e.target.value)} value={due}/>
          <div className="error">{error}</div>
          <div className="buttons">
            <button onClick={save}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      </>
    )
  return (
    <div className="item" draggable={true} onDragEnd={dragStop}>
      <div className="title">
        {todo.title}
        <div className="delete-button" onClick={() => setEditing(true)}>--</div>
        <div className="edit-button" onClick={() => setEditing(true)}> &lt; </div>
      </div>
      <div className="due">
        due at : {
        new Date(Number(todo.due)).toLocaleString()
      }
      </div>
      <pre className="description">
        {todo.description}
      </pre>
    </div>
  );
};

export default Item;
