import React from "react";
import {FilterValueType, TasksType} from "../../App";

export type PropsType = {
    title: string
    tasks: TasksType
    removeTask: (taskId: string) => void
    changeTaskFilter: (value: FilterValueType) => void
}


export const Todolist = (props: PropsType) => {

    const onAllClickHandler = () => {
        props.changeTaskFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeTaskFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeTaskFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                            const removeTask = () => {
                                props.removeTask(t.id)
                            }
                            return (
                                <li key={t.id}>
                                    <input type="checkbox" checked={t.isDone}/>
                                    <span>{t.title}
                                        <button onClick={removeTask}>x</button></span>
                                </li>
                            )
                        }
                    )
                }

            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}