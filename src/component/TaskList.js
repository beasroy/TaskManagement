import React, { useState, useEffect } from "react";
import TaskForm from "../component/TaskForm";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import { BiSort } from "react-icons/bi";

const TaskList = () => {

    const [tasklist, setTasklist] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [sort, setSort] = useState(false);
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasklist(storedTasks);
    }, []);

    const openForm = () => {
        setIsFormOpen(true);
        setEditIndex(null); // Reset editIndex when opening the form
    };

    const openEditForm = (index) => {
        setIsFormOpen(true);
        setEditIndex(index);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditIndex(null);
    };

    const handleFormSubmit = (formData) => {
        const updatedTaskList = [...tasklist];

        if (editIndex !== null) {
            // Edit existing task
            updatedTaskList[editIndex] = { ...formData, completed: tasklist[editIndex].completed };
        } else {
            // Add new task
            updatedTaskList.push({ ...formData, completed: false });
        }
        setTasklist(updatedTaskList);
        localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
        closeForm();
    };

    const handleTaskDelete = (index) => {
        const updatedTaskList = [...tasklist];
        updatedTaskList.splice(index, 1);
        setTasklist(updatedTaskList);
        localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
    };
    const sortedTasks = sort
        ? tasklist.slice().sort((a, b) => {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.taskPriority] - priorityOrder[b.taskPriority];
        })
        : tasklist;

    const handleSort = () => {
        setSort(!sort);
    };
    return (
        <>
            <button
                onClick={openForm}
                className="bg-green-500 text-white px-4 py-2 m-10 rounded"
            >
                Add Task
            </button>
            <TaskForm isOpen={isFormOpen} onClose={closeForm} onFormSubmit={handleFormSubmit} initialData={editIndex !== null ? tasklist[editIndex] : null} />
            {tasklist.length > 0 ? (
                
                <table className=" max-w-full  md:w-4/5 mx-autotext-sm text-left  text-gray-500 table ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full">
                        <tr>
                            <th scope="col" className="p-4">
                                <button onClick={handleSort}>
                                    <BiSort className="w-4 h-4" />
                                </button>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Task name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Task Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Due Date
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Priority
                            </th>
                            
                            <th scope="col" className="px-3 py-3"></th>
                            <th scope="col" className="px-3 py-3"></th>

                        </tr>
                    </thead>

                    <tbody>
                        {sortedTasks.map((task, index) => (
                            <tr key={index} className={task.completed ? "line-through" : ""}>

                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => {
                                            const updatedTaskList = [...tasklist];
                                            updatedTaskList[index].completed = !task.completed;
                                            setTasklist(updatedTaskList);
                                         
                                            localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
                                        }}
                                        value="1"
                                        className="mr-2"
                                    />
                                </td>
                                <td className={`px-6 py-4 ${task.completed ? "line-through" : ""}`}>
                                    {task.taskName} {task.completed ? "(Completed)" : ""}
                                </td>
                                <td className="px-6 py-4">{task.taskDescription}</td>
                                <td className="px-6 py-4">{task.taskDueDate}</td>
                               
                                <td className="px-3 py-4">{task.taskPriority}</td>
                                <td>
                                    <button
                                    data-testid="editTaskButton-0"
                                     onClick={() => openEditForm(index)} className="text-blue-500 rounded border-2 border-blue-800">
                                        <MdEditDocument />
                                    </button>
                                </td>
                                <td>
                                    <button 
                                    data-testid="deleteTaskButton-0"
                                    onClick={() => handleTaskDelete(index)} className="text-red-500 rounded border-2 border-red-800">
                                        <MdDelete />
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No tasks available.</p>
            )}

        </>

    )
}

export default TaskList