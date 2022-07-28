import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem/TodoItem";

function TodoList() {

    const [todosArr, setTodosArr] = useState([]);
    const [todoText, setTodoText] = useState("");

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem("localTodos")) || [];
        setTodosArr(storedList);
    }, [])

    const handleInput = (e) => {
        setTodoText(e.target.value);
    }

    const handleTodo = (e) => {
        e.preventDefault();
        //toLocalDateString("en-Gb", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        setTodosArr([
            ...todosArr,
            {
                id: Math.random() * 1000,
                name: todoText || "NEW TODO",
                date: new Date().toLocaleDateString(),
                status: false
            }
        ]);
        setTodoText("");
    };

    const handleReset = (e)=> {
        e.preventDefault();
        //console.log("reset");
        setTodosArr([]);
        localStorage.setItem("localTodos", JSON.stringify([]));
    }

    return (
        <div className="todolist m-auto" style={{ width: "60vw" }}>
            <h1 className="text-center m-4">My Todos</h1>
            <form action="#">
                <div className="row my-4 py-2 bg-secondary">
                    <div className="col-8">
                        <input
                            className="w-100 py-1"
                            type="text"
                            name="text"
                            value={todoText}
                            id="text"
                            onChange={handleInput}
                        />
                    </div>
                    <div className="col-2">
                        <button
                            type="submit"
                            className="btn btn-light px-3"
                            onClick={handleTodo}
                        >
                            Einfügen
                        </button>
                    </div>
                    <div className="col-2">
                        <button
                            type="submit"
                            className="btn btn-dark px-3"
                            onClick={handleReset}
                        >
                            zurücksetzen
                        </button>
                    </div>
                </div>
            </form>
            {
                todosArr.map((todo) => (
                    <TodoItem key={todo.id} todoProp={todo} todosArr={todosArr} setTodosArr={setTodosArr} />
                ))
            }
        </div>
    )
}
export default TodoList