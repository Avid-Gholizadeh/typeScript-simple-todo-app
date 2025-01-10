import {createContext, useReducer} from 'react'
import {Todo} from './model'
import {ReactNode} from 'react'

export type Action =
    | {type: 'add'; payload: string}
    | {type: 'remove'; payload: number}
    | {type: 'Done'; payload: number}
    | {type: 'unDone'; payload: number}
    | {type: 'edit'; payload: {id: number; todo: string}}

interface TodoContextType {
    todos: Todo[]
    dispatch: React.Dispatch<Action>
}

export const TodoContext = createContext<TodoContextType>({todos: [], dispatch: () => {}})

const todoReducer = (state: Todo[], action: Action) => {
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

export const TodoProviderComponent = ({children}: {children: ReactNode}) => {
    const [todos, dispatch] = useReducer(todoReducer, [])

    const ctxObj: TodoContextType = {
        todos,
        dispatch,
    }

    return <TodoContext.Provider value={ctxObj}>{children}</TodoContext.Provider>
}
