import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import Search from './components/Search'
import Filter from './components/Filter'

function App() {
  const [todos, setTodos] = useState([])

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState("A ao Z")

  const addTodo = (text, category) => {
    const newTodos = [...todos, {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
    }]

    setTodos(newTodos)

  }

  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter(todo => todo.id !== id ? todo : null
    );
    setTodos(filteredTodos)
  };

  const completeTodo = (id) => {
    const newTodos = [...todos]
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
    setTodos(newTodos)
  }

  return (
    <>
      <div className="app">
        <h1>Lista de tarefas</h1>
        <Search search={search} setSearch={setSearch} />
        <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
        <TodoForm addTodo={addTodo} />
        <div className="todo-list">
          {todos
            .filter((todo) =>
              filter === "All"
                ? true
                : filter === "Completed"
                  ? todo.isCompleted
                  : !todo.isCompleted
            )
            .filter((todo) =>
              todo.text.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => 
              sort === "A ao Z"
              ? a.text.localeCompare(b.text) 
              : b.text.localeCompare(a.text)
            )
            .map((todo) => (
              <TodoList
                key={todo.id}
                todo={todo}
                removeTodo={removeTodo}
                completeTodo={completeTodo} />
            ))}
        </div>
      </div>
    </>
  )
}

export default App
