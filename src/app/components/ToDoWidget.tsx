import { useState, useEffect, useRef } from "react";
import { Check, X, Plus, Trash2 } from "lucide-react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export function ToDoWidget() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("terminalTodos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      // Default todos if none exist
      setTodos([
        {
          id: "1",
          text: "CHECK WEATHER",
          completed: false,
          createdAt: Date.now(),
        },
        {
          id: "2",
          text: "REVIEW NEWS",
          completed: false,
          createdAt: Date.now(),
        },
        {
          id: "3",
          text: "MONITOR SYSTEMS",
          completed: true,
          createdAt: Date.now(),
        },
      ]);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("terminalTodos", JSON.stringify(todos));
  }, [todos]);

  // Focus input when shown
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const newId = Date.now().toString();
    setTodos([
      ...todos,
      {
        id: newId,
        text: newTodo.toUpperCase(),
        completed: false,
        createdAt: Date.now(),
      },
    ]);
    setNewTodo("");
    setShowInput(false);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const clearAll = () => {
    setTodos([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    } else if (e.key === "Escape") {
      setShowInput(false);
      setNewTodo("");
    }
  };

  // Sort todos: completed at bottom, newest first
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return b.createdAt - a.createdAt;
  });

  return (
    <div className="widget-border p-3 sm:p-4 h-full flex flex-col">
      <h2 className="terminal-header text-lg sm:text-xl mb-3 sm:mb-4">
        TASK_MANAGER<span className="cursor-blink">_</span>
      </h2>

      {/* Todo List - Scrollable */}
      <div className="flex-1 overflow-y-auto terminal-scrollbar space-y-1 sm:space-y-2">
        {sortedTodos.length > 0 ? (
          sortedTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between p-2 sm:p-3 rounded border ${
                todo.completed
                  ? "border-[var(--pipboy-green-dark)] text-[var(--pipboy-green-dark)] opacity-70"
                  : "border-[var(--pipboy-green)] text-[var(--pipboy-green)]"
              }`}
            >
              <div className="flex items-center gap-1 sm:gap-2 flex-1 overflow-hidden">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="hover:text-white"
                  aria-label={
                    todo.completed ? "Mark incomplete" : "Mark complete"
                  }
                >
                  {todo.completed ? (
                    <X size={12} className="sm:size-14" />
                  ) : (
                    <Check size={12} className="sm:size-14" />
                  )}
                </button>
                <span
                  className={`truncate ${todo.completed ? "line-through" : ""}`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="hover:text-red-500"
                aria-label="Delete task"
              >
                <Trash2 size={12} className="sm:size-14" />
              </button>
            </div>
          ))
        ) : (
          <div className="terminal-text text-center py-3 sm:py-4">NO_TASKS</div>
        )}
      </div>

      {/* Input - Full width on mobile */}
      <div className="flex gap-1 sm:gap-2 mt-3 sm:mt-4 pt-2 border-t border-[var(--pipboy-green-dark)]">
        {showInput ? (
          <div className="flex-1 flex gap-1 sm:gap-2">
            <input
              ref={inputRef}
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border border-[var(--pipboy-green)] rounded px-2 py-1 text-[var(--pipboy-green)] focus:outline-none focus:border-[var(--pipboy-green-dark)] text-xs sm:text-sm"
              placeholder="NEW_TASK"
              autoComplete="off"
            />
            <button
              onClick={addTodo}
              className="text-[var(--pipboy-green)] hover:text-white p-1 sm:p-2"
              aria-label="Add task"
            >
              <Plus size={16} className="sm:size-18" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="flex-1 flex items-center justify-center gap-1 text-[var(--pipboy-green)] hover:text-white border border-[var(--pipboy-green)] rounded py-1 px-2 text-xs sm:text-sm"
            aria-label="Add new task"
          >
            <Plus size={14} className="sm:size-16" /> ADD_TASK
          </button>
        )}
      </div>

      {/* Action Buttons - Stack on mobile */}
      <div className="flex gap-1 sm:gap-2 mt-2">
        <button
          onClick={clearCompleted}
          className="flex-1 text-xs sm:text-sm text-[var(--pipboy-green)] hover:text-white border border-[var(--pipboy-green)] rounded py-1 px-2"
          disabled={todos.filter((t) => t.completed).length === 0}
        >
          CLEAR_COMPLETED
        </button>
        <button
          onClick={clearAll}
          className="flex-1 text-xs sm:text-sm text-[var(--pipboy-green)] hover:text-red-500 border border-[var(--pipboy-green)] rounded py-1 px-2"
          disabled={todos.length === 0}
        >
          CLEAR_ALL
        </button>
      </div>
    </div>
  );
}
