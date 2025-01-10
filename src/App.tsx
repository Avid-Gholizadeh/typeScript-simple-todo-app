import {useReducer, useState} from 'react'
import './App.css'
import {InputField} from './components/InputField'
import {TodoList} from './components/TodoList'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import {Todo, todoReducer} from './model'

const App: React.FC = () => {
    //
    const [todo, setTodo] = useState<string>('')
    // const [todos, setTodos] = useState<Todo[]>([])
    const [todos, dispatch] = useReducer(todoReducer, [])

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault()
        // setTodos(prevTodos => [...prevTodos, {id: Date.now(), todo: todo, isDone: false}])
        dispatch({type: 'add', payload: todo})
        setTodo('')
    }

    function handleDragEnd(result: DropResult) {
        // console.log(result)
        if (!result.destination) return
        if (result.destination.droppableId === result.source.droppableId) return

        if (result.destination?.droppableId === 'TodosRemove') {
            dispatch({type: 'Done', payload: +result.draggableId})
        } else if (result.destination?.droppableId === 'TodosList') {
            dispatch({type: 'unDone', payload: +result.draggableId})
        }
    }

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="App">
                    <span className="heading">Taskify</span>
                    <InputField todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo} />
                    <TodoList todos={todos} setTodos={dispatch} />
                </div>
            </DragDropContext>
        </>
    )
}

export default App

let hobbies: string[]
let role: [string, number] = ['ali', 4]

// type Person = {name: string; age?: number}
interface Person {
    name: string
    age?: number
}

let person: Person = {name: 'ali'}
let persons: Person[] = [{name: 'ali2', age: 5}, {name: 'taghi'}]

let age: string | number // union type

let printName: (name: string) => void // we have never type as well, indicating the function returns nothing and void is used to indicate that the function reutrns undefied.
let personName: unknown // when we do not want to asign a type.
