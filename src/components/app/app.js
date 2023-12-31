import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxID = 1;
  
    state = {
      todoData : [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch'),
      ],
      term: '',
      filter: 'all',
    }

    createTodoItem(label) {
      return {
        id: this.maxID++,
        label,
        important: false,
        done: false,
      }
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

    addItem = (text) => {
      this.setState(({todoData}) => {
        const newArray = [...todoData, this.createTodoItem(text)]
        return {
          todoData: newArray
        }
      })
    };

    toggleProperty(arr, id, propName) {
      const idx = arr.findIndex((el) => el.id === id );

      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};
      return [
        ...arr.slice(0, idx), 
        newItem, 
        ...arr.slice(idx+1)
      ];
    };

    onToggleDone = (id) => {
      this.setState(({todoData}) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'done'),
        }
      });
    };
    
    onToggleImportant = (id) => {
      this.setState(({todoData}) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'important'),
        }
      });
    };

    onSearchChange = (term) => {
      this.setState({ term });
    } 

    search = (items, term) => {
      if (term.length === 0) return items;

      return items.filter((item) => {
        return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
    }

    onFilterChange = (filter) => {
      this.setState({ filter });
    }

    filter = (items, filterValue) => {
      if (filterValue === 'all') {
        return items;
      } else if (filterValue === 'active') {
        return items.filter((item) => {
          return item.done === false
        })
      } else if (filterValue === 'done') {
        return items.filter((item) => {
          return item.done === true
      });}
    };

    render(){
      const { todoData, term, filter } = this.state;

      const visibleItems = this.filter(this.search(todoData, term), filter);
      const doneCount = todoData.filter((el) => el.done).length;
      const todoCount = todoData.length - doneCount;
      return (
        <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter onFilterChange={this.onFilterChange} filter={filter}/>
        </div>
  
        <TodoList 
          todos={visibleItems}
          onDeleted = { this.deleteItem } 
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm onAddItem={this.addItem} />
      </div>
    );
  }
};