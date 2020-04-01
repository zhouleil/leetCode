import { ActionTodoConstants } from "../constants/todo"

let id = 0

const addTodo = (name: string) => ({
  payload: {
    todo: {
      done: false,
      id: id++,
      name
    }
  },
  type: ActionTodoConstants.ADD_TODO
})

const toggleTodo = (name: string) => ({
  payload: {
    id: id++
  },
  type: ActionTodoConstants.TOGGLE_TODO
})


export type AddTodoAction = ReturnType<typeof addTodo>

export type ToggleTodoAction = ReturnType<typeof toggleTodo>

export type Action = AddTodoAction & ToggleTodoAction

