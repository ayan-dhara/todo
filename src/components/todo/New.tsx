import {useAppSelector} from "../../redux/hooks/appHooks";
import {useEffect, useState} from "react";

const New = (props: any) => {
  const {addTodo} = useAppSelector(state => state.todo)
  const [template, setTemplate] = useState({
    title:"",
    description: "",
    due: ""
  })
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
    setTitle(template.title)
    setDescription(template.description)
    setDue(template.due)
  }
  useEffect(()=>{
    let savedTemplateString: any = localStorage.getItem("template:"+props.index)
    if(savedTemplateString){
      const savedTemplate = JSON.parse(savedTemplateString)
      setTemplate(savedTemplate)
      if(savedTemplate.title){
        setTitle(savedTemplate.title)
      }
      if(savedTemplate.description){
        setDescription(savedTemplate.description)
      }
      if(savedTemplate.due){
        setDue(savedTemplate.due)
      }
      setTemplate(savedTemplate)
    }
  }, [])
  const saveAsTemplate = () => {
    const templateToSave = {
      title,
      description,
      due
    }
    setTemplate(templateToSave)
    localStorage.setItem("template:"+props.index, JSON.stringify(templateToSave))
  }
  return (
    <>
      <div className="separator horizontal"/>
      <div className="add">
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title}/>
        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description}/>
        <input type="datetime-local" onChange={(e) => setDue(e.target.value)} value={due}/>
        <div className="buttons">
          <button onClick={add}>Add</button>
          <button onClick={saveAsTemplate}>Set as template</button>
          <button onClick={props.cancel}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default New;
