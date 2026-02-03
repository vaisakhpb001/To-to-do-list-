"use client"
import { useState, useEffect } from "react"

type Todo = {
  id: number
  text: string
}

export default function Home() {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) setTodos(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (!text) return
    setTodos([...todos, { id: Date.now(), text }])
    setText("")
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div style={{
      background:"#f0f0f0",
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>

      <div style={{
        background:"white",
        padding:"20px",
        borderRadius:"10px",
        width:"320px",
        boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
      }}>

        {/* HEADER */}
        <h2 style={{ textAlign:"center", marginBottom:"15px", color:"black" }}>
          To Do List
        </h2>

        {/* INPUT + ADD */}
        <div style={{ display:"flex", gap:"8px" }}>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter task..."
            style={{
              flex:1,
              padding:"8px",
              border:"1px solid #ccc",
              borderRadius:"5px",
              color:"black",          
               
            }}
          />

          <button onClick={addTodo} style={{
            padding:"8px 12px",
            border:"none",
            borderRadius:"5px",
            backgroundColor:"#f3f2ec",
            color:"black",
            cursor:"pointer"
          }}>
            Add
          </button>
        </div>

        {/* LIST */}
        <ul style={{ marginTop:"15px", padding:0 }}>
          {todos.map(todo => (
            <li key={todo.id}
              style={{
                display:"flex",
                justifyContent:"space-between",
                marginBottom:"8px",
                listStyle:"none",
                color:"blue"   
              }}>
              {todo.text}
              <button onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}
