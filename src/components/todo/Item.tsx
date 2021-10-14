import {useAppDispatch, useAppSelector} from "../../redux/hooks/appHooks";
import {setDragOver} from "../../redux/todo";

const Item = (props: any) => {
  const {todo: allTodo, dragoverIndex, updateTodo} = useAppSelector(state => state.todo)
  const {todo, todoId} = props
  const dispatch = useAppDispatch()

  const dragStop = (e: any) => {
    dispatch(setDragOver(-1)) // will change async
    if(dragoverIndex < 0)
      return
    const selectedTodo: any = allTodo.todoList.filter((todo:any) => {
      return todo.todoId === todoId
    })
    if(selectedTodo[0].status === dragoverIndex)
      return;
    updateTodo({
      id: todoId,
      status: dragoverIndex
    })
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
