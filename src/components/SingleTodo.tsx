import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {Action, Todo} from '../model'
import {MdDone} from 'react-icons/md'
import {useEffect, useRef, useState} from 'react'
import {Draggable} from 'react-beautiful-dnd'

interface SingleTodoProps {
    todo: Todo
    // todos: Todo[]
    index: number
    setTodos: React.Dispatch<Action>
}

const SingleTodo: React.FC<SingleTodoProps> = ({todo, setTodos, index}) => {
    //
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [edited, setEdited] = useState<string>(todo.todo)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDone = (id: number) => {
        // setTodos(prevTodos =>
        //     prevTodos.map(todo => (todo.id === id ? {...todo, isDone: !todo.isDone} : todo))
        // )
        if (todo.isDone) setTodos({type: 'unDone', payload: id})
        else setTodos({type: 'Done', payload: id})
    }

    const handleDelete = (id: number) => {
        // setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
        setTodos({type: 'remove', payload: id})
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEdited(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsEdit(false)
        // setTodos(prevTodos =>
        //     prevTodos.map(curTodo =>
        //         curTodo.id === todo.id ? {...curTodo, todo: edited} : curTodo
        //     )
        // )
        setTodos({type: 'edit', payload: {id: todo.id, todo: edited}})
    }

    const handleEdit = () => {
        setIsEdit(!isEdit)
    }

    useEffect(() => {
        if (isEdit) {
            inputRef.current?.focus()
        }
    }, [isEdit])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    className={`todos-single ${snapshot.isDragging ? 'dragging' : ''}`}
                    onSubmit={handleSubmit}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {todo.isDone && <s className="todo-single-text">{todo.todo}</s>}
                    {!todo.isDone && (
                        <>
                            {isEdit ? (
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="todo-single-text"
                                    value={edited}
                                    onChange={e => handleChange(e)}
                                />
                            ) : (
                                <span className="todo-single-text">{todo.todo}</span>
                            )}
                        </>
                    )}

                    <div className="icons">
                        <span className="icon" onClick={todo.isDone ? () => {} : handleEdit}>
                            <AiFillEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete />
                        </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    )
}

export default SingleTodo
