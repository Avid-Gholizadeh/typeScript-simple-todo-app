import {useReducer} from 'react'

export interface Todo {
    id: number
    todo: string
    isDone: boolean
}

export type Action =
    | {type: 'add'; payload: string}
    | {type: 'remove'; payload: number}
    | {type: 'Done'; payload: number}
    | {type: 'unDone'; payload: number}
    | {type: 'edit'; payload: {id: number; todo: string}}

export const todoReducer = (state: Todo[], action: Action) => {
    switch (action.type) {
        case 'add':
            return [...state, {id: Date.now(), todo: action.payload, isDone: false}]
        case 'remove':
            return state.filter(todo => todo.id !== action.payload)
        case 'Done':
            return state.map(todo => (todo.id === action.payload ? {...todo, isDone: true} : todo))
        case 'edit':
            return state.map(todo =>
                todo.id === action.payload.id ? {...todo, todo: action.payload.todo} : todo
            )
        case 'unDone':
            return state.map(todo => (todo.id === action.payload ? {...todo, isDone: false} : todo))
    }
}

export const ReducerExam = () => {
    const [state, dispatch] = useReducer(todoReducer, [])
}
