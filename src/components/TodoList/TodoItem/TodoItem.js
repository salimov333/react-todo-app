import React, { useState, useEffect } from "react";

function TodoItem({ todoProp, todosArr, setTodosArr }) {

    const [todo, setTodo] = useState(todoProp);
    const [editMode, setEditMode] = useState(false);

    const handleChange = (event) => {
        setTodo({
            ...todo,
            [event.target.name]: event.target.value
        })
    };
    const markDone = () => {
        setTodo({
            ...todo,
            status: !todo.status
        })
    };

    const toggleEditMode = () => {
        setEditMode(!editMode)
    };

    const handleDelete = () => {
        setTodosArr(todosArr.filter((item) => item.id !== todo.id));
    };

    useEffect(() => {
        const updatedTodosArr = todosArr.map(item => {
            if (item.id === todo.id) {
                item = todo
            }
            return item
        })
        localStorage.setItem("localTodos", JSON.stringify(updatedTodosArr));
    }, [todo, todosArr]);

    return (
        <div className="todo-item row my-2 bg-light">
            <div className="col">
                <input
                    type="checkbox"
                    onChange={markDone}
                    name="status"
                    checked={todo.status}
                />
            </div>
            {editMode ? (
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
                    <div className="col">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            Löschen
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
                <div className="col">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDelete}
                    >
                        Löschen
                    </button>
                </div>
            </>)
            }
        </div>
    )
}
export default TodoItem