
import React, { useState ,useEffect} from 'react';

const TaskForm = ({ isOpen, onClose,onFormSubmit,initialData }) => {

  const [formData, setFormData] = useState({
    taskName: '',
    taskDescription: '',
    taskPriority: 'high',
    taskDueDate:'',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Set initialData when editing
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form data when opening for a new task
      resetForm();
    }
  }, [initialData, isOpen]);

  const resetForm = () => {
    setFormData({
      taskName: '',
      taskDescription: '',
      taskPriority: 'high',
      taskDueDate: '',
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.taskName.trim()) {
      newErrors.taskName = 'Task Name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

      // Check if editing or adding a new task
      if (initialData) {
        // Editing existing task
        const updatedTasks = tasks.map((task) =>
          task.taskName === initialData.taskName ? formData : task
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      } else {
        // Adding new task
        tasks.push(formData);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }

      console.log('Form submitted:', formData);
      onFormSubmit(formData);
      onClose();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen border-2 border-red-800">
        <div className="bg-white p-8 rounded shadow-md w-full m-5 md:w-2/5 ">
          <h2 className="text-2xl font-semibold mb-4  text-center">Task Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="taskName" className="block text-sm font-medium text-gray-600">
                Task Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="taskName"
                placeholder="Enter task name"
                value={formData.taskName}
                onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                className={`mt-1 p-2 border border-gray-300 rounded w-full ${errors.taskName ? 'border-red-500' : ''}`}
              />
              {errors.taskName && <p className="text-red-500 text-xs mt-1">{errors.taskName}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-600">
                Task Description
              </label>
              <textarea
                id="taskDescription"
                placeholder="Enter task description"
                value={formData.taskDescription}
                onChange={(e) => setFormData({ ...formData, taskDescription: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <div>
              <label htmlFor="taskPriority" className="block text-sm font-medium text-gray-600">
                Task Priority
              </label>
              <select
                id="taskPriority"
                value={formData.taskPriority}
                onChange={(e) => setFormData({ ...formData, taskPriority: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              </div>
              <div>
              <label htmlFor='date' className="block text-sm font-medium text-gray-600">
                Due Date
              </label>
              <input type="date" 
              id="date" 
              name="date"   
              value={formData.taskDueDate}
              onChange={(e) => setFormData({ ...formData, taskDueDate: e.target.value })} 
              className='mt-1 p-2 border border-gray-300 rounded w-full'/>
              </div>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {initialData ? 'Update' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
