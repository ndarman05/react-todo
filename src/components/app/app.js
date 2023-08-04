import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
  
    state = {
      todoData : [
        { label: 'Drink Coffee', important: false, id: 1 },
        { label: 'Make Awesome App', important: true, id: 2 },
        { label: 'Have a lunch', important: false, id: 3 }
      ],
    }
    
    deleteItem = (id) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id );
        const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx+1)];

        return {
          todoData: newArray,
        }
      })
    };

    addItem = () => {
      this.setState(({todoData}) => {
        const idx = todoData[todoData.length-1].id+1;
        const newItem = {
          label: `New item ${idx}`,
          important: false,
          id: idx,
        };

        const newArray = [...todoData, newItem]
        return {
          todoData: newArray
        }
      })
    };

    onToggleDone = (id) => {
      console.log(`Done: ${id}`);
    };
    
    onToggleImportant = (id) => {
      console.log(`Important: ${id}`);
    };

    render(){
      const { todoData } = this.state;
      return (
        <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList 
          todos={todoData}
          onDeleted = { this.deleteItem } 
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm onAddItem={this.addItem} />
      </div>
    );
  }
};