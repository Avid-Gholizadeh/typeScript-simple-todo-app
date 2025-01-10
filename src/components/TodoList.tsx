import {Dispatch} from 'react'
import {Action, Todo} from '../model'
import SingleTodo from './SingleTodo'
import {Droppable} from 'react-beautiful-dnd'

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
