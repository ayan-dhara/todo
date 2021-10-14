import React, {useState} from "react";
import New from "./New";
import Item from "./Item";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/appHooks";
import {setDragOver} from "../../redux/todo";

const List = (props: any) => {
  const [addNew, setAddNew] = useState(false)
  const index = props.index
  const {todo} = useAppSelector(state => state.todo)
  const status = todo.statusList[index]
  const dispatch = useAppDispatch()
  const list = todo.todoList.filter(todo => {
    return todo.status === index
  }) || []
  if (!status)
    return null
  const enterDrag = (e: any) => {
    let target = e?.target
    if (target) {
      while (!target?.classList?.contains("list")) {
        target = target.parentNode
        if (target === window)
          return;
      }
    }
    dispatch(setDragOver(index))
    e.stopPropagation()
  }

  return (
    <div className="list" onDragEnter={enterDrag}>
      <div className="title">
        {status}
        <div className="add" onClick={() => setAddNew(true)}>+</div>
      </div>
      <div className="items">
        {
          addNew ? <New index={index} cancel={() => setAddNew(false)}/> : null
        }
        <div className="separator horizontal"/>
        {
          list.length === 0 && !addNew ?
            <div className="empty">List is Empty</div> :
            list.map((_todo: any, i: number) => {
              return <React.Fragment key={i}>
                <Item todo={_todo} todoId={_todo.id}/>
                <div className="separator horizontal"/>
              </React.Fragment>
            })
        }
      </div>
    </div>
  );
};

export default List;
