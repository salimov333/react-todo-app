import React, { useState, useEffect } from "react";
import todos from "../../todos";
import TodoItem from "./TodoItem/TodoItem";

function TodoList() {
    const [todosArr, setTodosArr] = useState([]);


    useEffect(() => {
        console.log("component mounted");
        let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        setTodosArr(savedTodos);
    }, []);

    useEffect(() => {
        console.log("todosArr updated");
        localStorage.setItem("todos", JSON.stringify(todosArr));
    }, [todosArr]);


    const handleTodo = (e) => {
        e.preventDefault();
        const todoText = document.querySelector("#text").value || "New Todo";
        //toLocalDateString("en-Gb", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        setTodosArr([
            ...todosArr,
            {
                name: todoText,
                date: new Date().toLocaleDateString(),
                status: false
            }
        ]);
        document.querySelector("#text").value = "";
    };

    return (
        <div className="todolist m-auto" style={{ width: "60vw" }}>
            <h1 className="text-center m-4">My Todos</h1>
            <form action="#">
                <div className="row my-4 py-2 bg-secondary">
                    <div className="col-9">
                        <input
                            className="w-100 py-1"
                            type="text"
                            name="text"
                            id="text"
                        />
                    </div>
                    <div className="col">
                        <button
                            type="submit"
                            className="btn btn-light px-3"
                            onClick={handleTodo}
                        >
                            Einfügen
                        </button>
                    </div>

                </div>
            </form>

            {
                todosArr.map((todo, index) => (
                    <TodoItem key={index} todo={todo} />
                ))
            }

        </div>
    )
}
export default TodoList