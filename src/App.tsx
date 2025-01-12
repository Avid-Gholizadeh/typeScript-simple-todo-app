import {useContext, useState} from 'react'
import './App.css'
import {InputField} from './components/InputField'
import {TodoList} from './components/TodoList'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import {TodoContext} from './TodoContext'

const App: React.FC = () => {
    //
    const {todos, dispatch} = useContext(TodoContext)
    const [todo, setTodo] = useState<string>('')
    // const [todos, setTodos] = useState<Todo[]>([])
    // const [todos, dispatch] = useReducer(todoReducer, [])

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault()
        // setTodos(prevTodos => [...prevTodos, {id: Date.now(), todo: todo, isDone: false}])
        console.log(todos)
        dispatch({type: 'add', payload: todo})
        setTodo('')
    }

    function handleDragEnd(result: DropResult) {
        if (!result.destination) return
        if (result.destination.droppableId === result.source.droppableId) return

        if (result.destination?.droppableId === 'TodosRemove') {
            dispatch({type: 'Done', payload: +result.draggableId})
        } else if (result.destination?.droppableId === 'TodosList') {
            dispatch({type: 'unDone', payload: +result.draggableId})
        }
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="App">
                <span className="heading">Taskify</span>
                <InputField todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo} />
                <TodoList todos={todos} setTodos={dispatch} />
            </div>
        </DragDropContext>
    )
}

export default App

let hobbies: string[] // or we can use Array<string>
let role: [string, number] = ['ali', 4]
let user: object = {name: 'ali', age: 4} // object type is not a good practice, we should use interface instead.

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

// ===============================================================
let values: number[] = [1, 2, 3, 4, 5]
// ===============================================================
// function types
let someFn: (a: number, b: number) => number // declaring a function called somefn that has its own type.

function add(a: number, b: number): number {
    return a + b
} // we typicaly do not consider return type in typescript, because it can be inferred by the typescript.

function MdCalculate(a: number, b: number, calcFn: (a: number, b: number) => number) {
    calcFn(a, b)
}
// ===============================================================
interface example {
    a: string
    b: number
}
interface example {
    c: boolean
} // this code adds a new property to the pre-defined interface.

// ===============================================================
// literal types

type name = 'ali' | 'taghi' | 'reza' // this is a literal type, which means the name can only be one of the three values.
function performAction(action: string | number, name: name) {
    if (name === 'reza' && typeof action === 'number') {
        // do something.
    }
    // it is common pattern to have extra if cheaks when we use union types or literal types
}
// ===============================================================
// merging types
type user = {username: string}
type admin = {adminId: number}
type userAdmin = user & admin // this is called merging types, which means the userAdmin type has both properties of user and admin.

interface user1 {
    userName: string
}
interface admin1 {
    adminId: number
}
interface userAdmin1 extends user1, admin1 {} // this is another way of merging types using interfaces.
// ===============================================================
// Generic types : They are types that work together with other types. It means that generic types need extra information
// (type) to be provided when they are used.

type DataStorage<T> = {
    storage: T[]
    add: (data: T) => void
} // so the DataStorage is a generic type that can store any type of data.

const userStorage: DataStorage<user> = {
    storage: [],
    add: user => {
        // do something
    },
}

function merge<T, U>(a: T, b: U) {
    return {...a, ...b}
}
const newUser = merge({name: 'ali'}, {age: 4}) // typescript can infer the types of T and U from the arguments.
// ===============================================================
