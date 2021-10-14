import {useEffect, useState} from 'react'

export interface TodoType {
  id: string
  status: number
  title?: string
  description?: string
  dueTime?: number
}

export interface TodoState {
  statusList: any[],
  todoList: TodoType[]
}

export const initialState: TodoState = {
  statusList: [],
  todoList: []
}

const useTodo: any = (initialTodo: TodoState = initialState) => {
  const [todo, setTodo] = useState(initialTodo)
  useEffect(() => {
    try {
      fetch("/api/todo/list")
        .then(r => r.json())
        .then(json => {
          if (json.success) {
            setTodo({
              todoList: json.todoList,
              statusList: json.statusList
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    } catch (e) {
    }
  }, [])

  const updateTodo = (todoData: any) => {
    fetch(`/api/todo/${todoData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...todoData
      })
    }).then(r => r.json())
      .then((json: any) => {
        if (json.success) {
          setTodo({
            todoList: json.todoList,
            statusList: json.statusList
          })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const addTodo = (todoData: object) => {
    console.log(todoData)
    fetch("/api/todo/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...todoData
      })
    }).then(r => r.json())
      .then((json: any) => {
        if (json.success) {
          setTodo({
            todoList: json.todoList,
            statusList: json.statusList
          })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteTodo = (todoData: any) => {
    fetch(`/api/todo/${todoData.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r => r.json())
      .then((json: any) => {
        if (json.success) {
          setTodo({
            todoList: json.todoList,
            statusList: json.statusList
          })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return [todo, {addTodo, updateTodo, deleteTodo}]
}

export default useTodo;
