import {createSlice} from '@reduxjs/toolkit'
import {TodoState, initialState as todoInitialState} from "../hooks/useTodo";

export interface TodoReducer {
  todo: TodoState
  moveList: any
  updateTodo: Function
  addTodo: Function
  deleteTodo: Function
  dragoverIndex: number
}

const initialState: TodoReducer = {
  todo: todoInitialState,
  moveList: null,
  dragoverIndex: -1,
  updateTodo: (data: any) => {},
  addTodo: (data: any) => {},
  deleteTodo: (id: string) => {}
}

export const todoSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setTodo: (state, todo)=>{
      return {
        ...state,
        todo: {
          ...state.todo,
          ...todo.payload
        }
      }
    },
    setTodoFunctions: (state, functions) => {
      return {
        ...state,
        ...functions.payload
      }
    },
    setDragOver: (state, index) => {
      return {
        ...state,
        dragoverIndex: index.payload
      }
    }
  },
})

export const {setTodoFunctions, setTodo, setDragOver} = todoSlice.actions
export default todoSlice.reducer
