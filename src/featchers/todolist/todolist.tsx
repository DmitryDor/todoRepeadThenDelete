import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType, TasksType, TaskType} from "../../App";


export type PropsType = {
    title: string
    tasks: TasksType
    removeTask: (taskId: string) => void
    changeTaskFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValueType
}


export const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<null | string>(null)

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
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is requiered')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeTaskTitle} onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                            const removeTask = () => {
                                props.removeTask(t.id)
                            }
                            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatus = e.currentTarget.checked
                                props.changeTaskStatus(t.id, newStatus)
                            }
                            return (
                                <li key={t.id}>
                                    <input type="checkbox" checked={t.isDone}
                                           onChange={onChangeTaskStatusHandler}/>
                                    <span className={t.isDone ? 'isDone' : ''}>{t.title}
                                        <button onClick={removeTask}>x</button>
                                    </span>
                                </li>
                            )
                        }
                    )
                }

            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'isActive': ''}>All</button>
                <button onClick={onActiveClickHandler} className={props.filter === 'active' ? 'isActive': ''}>Active</button>
                <button onClick={onCompletedClickHandler} className={props.filter === 'completed' ? 'isActive': ''}>Completed</button>
            </div>
        </div>
    )
}