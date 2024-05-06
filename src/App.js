// import React, { useState } from "react"; 
import React, { useState } from "react"; 
const TodoList = () => { 
  const [todos, setTodos] = useState([{isDone: false}]); 
  const [inputValue, setInputValue] = useState(""); 
  const [editTodoId, setEditTodoId] = useState(null); 
  const [editedValue, setEditedValue] = useState(""); 

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

 
  const handleInputChange = (e) => { 
    setInputValue(e.target.value); 
  }; 
 
  const handleAddTodo = () => { 
    if (inputValue.trim() !== "") { 
      setTodos([...todos, { id: Date.now(), text: inputValue }]); 
      setInputValue(""); 
    } 
  }; 
 
  const handleRemoveTodo = (id) => { 
    setTodos(todos.filter((todo) => todo.id !== id)); 
  }; 
 
  const handleEditTodo = (id) => { 
    setEditTodoId(id); 
    const todoToEdit = todos.find((todo) => todo.id === id); 
    setEditedValue(todoToEdit.text); 
  }; 
 
  const handleSaveEdit = () => { 
    setTodos( 
      todos.map((todo) => { 
        if (todo.id === editTodoId) { 
          return { ...todo, text: editedValue }; 
        } 
        return todo; 
      }) 
    ); 
    setEditTodoId(null); 
    setEditedValue(""); 
  }; 
  
  
 
  return ( 
    <div className="bg-indigo-200 border-4"> 
      <div className="p-4"> 
        <h1 className="text-2xl font-bold mb-4 text-pink-600">Todo List</h1> 
        <div className="flex mb-4"> 
          <input 
            type="text" 
            value={inputValue} 
            onChange={handleInputChange} 
            markTodo={markTodo}
            placeholder="Enter a new todo" 
            className="p-2 border border-gray-300 mr-2" 
          /> 
          <button onClick={handleAddTodo} className="p-2 bg-fuchsia-400 text-white rounded-full"> 
            Add Todo 
          </button> 
        </div> 
        <ul> 
          {todos.map((todo , index) => ( 
            <li style={{ textDecoration: todo.isDone ? "line-through" : "" }} key={todo.id} className="flex items-center justify-between bg-fuchsia-200 p-2 rounded mb-2"> {todo.text}
              {editTodoId === todo.id ? ( 
                <> 
                  <input 
                    type="text" value={editedValue}  onChange={(e) => setEditedValue(e.target.value)} className="p-2 border border-gray-300 mr-2" 
                  /> 
                  <button onClick={handleSaveEdit} className="p-2 "> ✔ </button> 
                </> 
              ) : ( 
                <> 
                  
                  <div> 
                  <button  className="" onClick={() => markTodo(index)}>✔</button>{' '}
                    <button onClick={() => handleEditTodo(todo.id)} className="text-blue-500">✏️</button> 
                    <button onClick={() => handleRemoveTodo(todo.id)} className="text-red-500">❌</button> 
                  </div> 
                </> 
              )} 
            </li> 
          ))} 
        </ul> 
      </div> 
    </div> 
  ); 
}; 
 
export default TodoList;
