import {useAppDispatch, useAppSelector} from "../../redux/hooks/appHooks";
import {setDragOver} from "../../redux/todo";

const Item = (props: any) => {
  const {dragoverIndex, updateTodo} = useAppSelector(state => state.todo)
  const {todo, todoId} = props
  const dispatch = useAppDispatch()

  const dragStop = (e: any) => {
    if(dragoverIndex < 0)
      return
    console.log(todoId)
    updateTodo({
      id: todoId,
      status: dragoverIndex
    })
    dispatch(setDragOver(-1))
  }
  return (
    <div className="item" draggable={true} onDragEnd={dragStop}>
      <div className="title">
        {todo.title}
      </div>
      <pre className="description">
        {todo.description}
      </pre>
    </div>
  );
};

export default Item;
