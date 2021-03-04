import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType, TasksType, TaskType} from "../../App";

export type PropsType = {
    title: string
    tasks: TasksType
    removeTask: (taskId: string) => void
    changeTaskFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
}


export const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState<string>('')

    const onAllClickHandler = () => {
        props.changeTaskFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeTaskFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeTaskFilter('completed')
    }
    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.currentTarget.value
        setTitle(newTitle)
    }
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addTask()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeTaskTitle} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
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