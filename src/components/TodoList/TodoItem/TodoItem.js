import React, { useState } from "react";

function TodoItem(props) {

    const [todo, setTodo] = useState(props.todo)
    const [editMode, setEditMode] = useState(false)

    const handleChange = (event) => {
        setTodo({
            ...todo,
            [event.target.name]: event.target.value
        })
    }

    const markDone = () => {
        setTodo({
            ...todo,
            status: !todo.status
        })
    }

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    return (
        <div className="todo-item row my-2 bg-light">
            <div className="col-1">
                <input 
                    type="checkbox"
                    onChange={markDone}
                    name="status"
                    checked={todo.status}
                />
            </div>
            { editMode ? (
                <>
                    <div className="col-4">
                        <input 
                            type="text" 
                            value={todo.name}
                            name="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-4">
                        <input 
                            type="text" 
                            value={todo.date}
                            name="date"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <button 
                                type="button" 
                                className="btn btn-success"
                                onClick={toggleEditMode}
                            >
                                Speichern
                        </button>
                    </div>
                </>
            ) : (<>
                    <div className="col-4">{todo.name}</div>
                    <div className="col-4">{todo.date}</div>
                    <div className="col">
                        <button 
                            type="button" 
                            className="btn btn-primary px-4"
                            onClick={toggleEditMode}
                        >
                            Ändern
                        </button>
                    </div>
                </>)
            }       
        </div>
    )
}
export default TodoItem