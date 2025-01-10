import {Dispatch} from 'react'
import {Todo} from '../model'
import SingleTodo, {Time} from './SingleTodo'
import {Droppable} from 'react-beautiful-dnd'
import {Action} from '../TodoContext'

interface PropTypes {
    todos: Todo[]
    setTodos: React.Dispatch<Action>
}

export const TodoList: React.FC<PropTypes> = ({todos, setTodos}) => {
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div
                        className={`todos ${snapshot.isDraggingOver ? 'dragActive' : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos-heading">Active Tasks</span>
                        {todos
                            .filter(todos => !todos.isDone)
                            .map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    key={todo.id}
                                    todo={todo}
                                    // todos={todos}
                                    setTodos={setTodos}
                                    time={Time.Today}
                                />
                            ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div
                        className={`todos remove ${snapshot.isDraggingOver ? 'dragComplete' : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos-heading">Completed Tasks</span>
                        {todos
                            .filter(todos => todos.isDone)
                            .map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    key={todo.id}
                                    todo={todo}
                                    // todos={todos}
                                    setTodos={setTodos}
                                    time={Time.Tomorrow}
                                />
                            ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

/*  <div className="todos">
            {todos.map(todo => (
                
            ))}
        </div> */
