import { useMemo, useCallback } from "react";

import { Item } from "./item";
import classnames from "classnames";

import { TOGGLE_ALL } from "../constants";
import {usePathname} from "next/navigation";

export function Main({ todos, dispatch }) {
    const route = usePathname();

    // Filtering todos based on the current route
    const visibleTodos = useMemo(() => {
        return todos.filter((todo) => {
            if (route === "/active") return !todo.completed;
            if (route === "/completed") return todo.completed;
            return todo;
        });
    }, [todos, route]);

    // Toggling all todos' completion state
    const toggleAll = useCallback(
        (e) => dispatch({ type: TOGGLE_ALL, payload: { completed: e.target.checked } }),
        [dispatch]
    );

    return (
        <main className="main" data-testid="main">
            {visibleTodos.length > 0 ? (
                <div className="toggle-all-container">
                    <input
                        className="toggle-all"
                        type="checkbox"
                        id="toggle-all"
                        data-testid="toggle-all"
                        checked={visibleTodos.every((todo) => todo.completed)}
                        onChange={toggleAll}
                    />
                    <label className="toggle-all-label" htmlFor="toggle-all">
                        Toggle All Input
                    </label>
                </div>
            ) : null}

            <ul className={classnames("todo-list")} data-testid="todo-list">
                {visibleTodos.map((todo, index) => (
                    <Item todo={todo} key={todo.id} dispatch={dispatch} index={index} />
                ))}
            </ul>
        </main>
    );
}
