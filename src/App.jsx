import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const inputRef = useRef(null);
  const [showFinished , setShowFinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleEdit = (id) => {
    if (editingId && editingId !== id && todo.trim() !== "") {
      const confirmSave = window.confirm("You have unsaved changes. Do you want to save them?");
      
      if (confirmSave) {
        // Save changes to the currently editing todo
        setTodos(
          todos.map((item) =>
            item.id === editingId ? { ...item, todo } : item
          )
        );
      }
    }
  
    // Switch to new todo for editing
    const selectedTodo = todos.find((item) => item.id === id);
    if (selectedTodo) {
      setTodo(selectedTodo.todo);
      setEditingId(id);
      inputRef.current.focus();
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));

  };

  const handleAdd = () => {
    if (todo.trim() === "") return alert("You must Enter something to add Todo"); // Prevent empty todos

    if (editingId) {
      // If in editing phasee theen update the existing todo
      setTodos(
        todos.map((item) =>
          item.id === editingId ? { ...item, todo } : item
        )
      );
      setEditingId(null); // Reset the editing id to null
    } else {
      // If not in editing phasee then  add a new todo
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }

    setTodo("");

  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    const id = e.target.name;
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );


  };

  const toggleFinish = ()=>{
    setShowFinished(!showFinished)
  }



  return (
    <>
      <Navbar />
      <div className='container bg-violet-100 my-6 mx-auto p-5 rounded-xl min-h-[80vh] w-1/2'>
        <h1 className='font-bold text-xl text-center '>iTask - Manage your Todos at One Place </h1>
        <div className='addTodo my-5 flex flex-col  gap-4'>
          <h2 className='font-bold text-lg  '>Add a Todo</h2>
          <input
            ref={inputRef}
            type="text"
            value={todo}
            onChange={handleChange}
            className='bg-white w-full  border border-gray-300 rounded-full px-5 py-1'
          />
          <button
            onClick={handleAdd}
            className='bg-violet-700 p-3 py-1 rounded-md text-white hover:bg-violet-900 text-sm font-bold'
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>
        <input
          type='checkbox'
          checked={showFinished}
          onChange={toggleFinish}
          
        /> Show Finished
        <h1 className='text-lg font-bold my-2'>My Todo</h1>

        <div className='Todos'>
          {todos.length === 0 ? (
            <div className='m-5 text-gray-500 text-center'>Your Todo list is empty. Start adding some tasks!</div>
          ) : (
            todos.map((item) => {

             return (showFinished || !item.isCompleted) && <div key={item.id} className='Todo flex justify-between space-x-3 items-center w-1/3 my-3'>
                <div className='flex gap-5 items-center'>
                  <input
                    type='checkbox'
                    name={item.id}
                    checked={item.isCompleted}
                    onChange={handleCheckBox}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className='buttons flex h-full'>
                  <button
                    onClick={() => handleEdit(item.id)}
                    className='bg-violet-700 p-3 py-1 rounded-md text-white hover:bg-violet-900 mx-1'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='bg-violet-700 p-3 py-1 rounded-md text-white hover:bg-violet-900 mx-1'
                  >
                    Delete
                  </button>
                </div>
              </div>
            })
          )}
        </div>

      </div>
    </>
  );
};

export default App;
