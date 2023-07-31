import React from 'react';
import { createRoot } from 'react-dom/client';

import AppHeader from './components/app-header';
import SearchPanel from './components/search-panel';
import ToDoList from './components/todo-list';

const container = document.getElementById('root')
const root = createRoot(container)

const App = () => {

  const todoData = [
    { label: 'Drink Coffee', important: false, id: 1 },
    { label: 'Make Awesome App', important: true, id: 2 },
    { label: 'Have a lunch', important: false, id: 3 },
  ]

  return (
    <div>
    <AppHeader />
    <SearchPanel />
    <ToDoList todos={todoData}/>
  </div>
  )
}

root.render(<App />)