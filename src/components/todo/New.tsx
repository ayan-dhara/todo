import {useAppSelector} from "../../redux/hooks/appHooks";
import {useState} from "react";

const New = (props: any) => {
  const {addTodo} = useAppSelector(state => state.todo)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [due, setDue] = useState("")
  const add = () => {
    addTodo({
      title,
      description,
      due: new Date(due).getTime(),
      status: props.index
    })
    setDescription("")
    setTitle("")
    setDue("")
  }

  return (
    <>
      <div className="separator horizontal"/>
      <div className="add">
        <input type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
        <textarea placeholder="Description" onChange={(e)=>setDescription(e.target.value)} value={description}/>
        <input type="datetime-local" onChange={(e)=>setDue(e.target.value)} value={due}/>
        <div className="buttons">
          <button onClick={add}>Add</button>
          <button onClick={props.cancel}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default New;
