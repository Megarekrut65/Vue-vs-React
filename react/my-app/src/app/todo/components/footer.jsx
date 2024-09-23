import { useCallback, useMemo } from "react";
import Link from "next/link";
import classnames from "classnames";

import { REMOVE_COMPLETED_ITEMS } from "../constants";
import {usePathname} from "next/navigation";

export function Footer({ todos, dispatch }) {
    const route = usePathname();

    const activeTodos = useMemo(() => todos.filter((todo) => !todo.completed), [todos]);

    const removeCompleted = useCallback(() => dispatch({ type: REMOVE_COMPLETED_ITEMS }), [dispatch]);

    if (todos.length === 0) return null;

    return (
        <footer className="footer" data-testid="footer">
            <span className="todo-count">{`${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`}</span>

            <ul className="filters" data-testid="footer-navigation">
                <li>
                    <Link href="/" legacyBehavior>
                        <a className={classnames({ selected: route === "/" })}>All</a>
                    </Link>
                </li>
                <li>
                    <Link href="/active" legacyBehavior>
                        <a className={classnames({ selected: route === "/active" })}>Active</a>
                    </Link>
                </li>
                <li>
                    <Link href="/completed" legacyBehavior>
                        <a className={classnames({ selected: route === "/completed" })}>Completed</a>
                    </Link>
                </li>
            </ul>

            <button
                className="clear-completed"
                disabled={activeTodos.length === todos.length}
                onClick={removeCompleted}
            >
                Clear completed
            </button>
        </footer>
    );
}
