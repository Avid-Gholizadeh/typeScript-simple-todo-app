import {FC, useRef} from 'react'

interface PropTypes {
    todo: string
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAddTodo: (e: React.FormEvent) => void
}

export const InputField: FC<PropTypes> = ({todo, setTodo, handleAddTodo}) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <form
            className="input"
            onSubmit={e => {
                handleAddTodo(e)
                inputRef.current?.blur()
            }}
        >
            <input
                ref={inputRef}
                type="text"
                placeholder="Enter a task"
                className="input-box"
                value={todo}
                onChange={e => setTodo(e.target.value)}
            />
            <button type="submit" className="input-submit">
                Go
            </button>
        </form>
    )
}
