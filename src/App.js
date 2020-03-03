import React from 'react';

let todoItems = [];
let checked = false;

class TodoList extends React.Component {
  render () {
    let filter = this.props.filter;
    let items = this.props.items.filter(items => {
      if (filter === true) {
        return items.done === false
      } else {
        return items
      }
    })
    .map((item, index) => {
      return (
        <TodoListItem filter={filter} key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <ul className="list-group"> {items} </ul>     
    );
  }
}
  
class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.handleClickDone = this.handleClickDone.bind(this);
  }
  handleClickClose() {
    let index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  handleClickDone() {
    let index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    let todoClass = this.props.item.done ? "done" : "undone";
    return(
      <li className="list-group-item ">
        <div className={todoClass}>
          <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.handleClickDone}></span>
          {this.props.item.value}
          <button type="button" className="close" onClick={this.handleClickClose}>&times;</button>
        </div>
      </li>     
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    let newItemValue = this.refs.itemName.value;
    
    if(newItemValue) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..."/>
        <button type="submit" className="btn btn-default">Add</button> 
      </form>
    );   
  }
}
  

class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      todoItems: todoItems,
      filter: checked
    };
  }

  handleChange() {
         this.setState({checked: !this.state.checked})
       }
  addItem(todoItem) {
    todoItems.unshift({
      index: todoItems.length+1, 
      value: todoItem.newItemValue, 
      done: false
    });
    this.setState({todoItems: todoItems});
  }
  removeItem (itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }
  markTodoDone(itemIndex) {
    let todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({todoItems: todoItems});  
  }
  render() {
    return (
      <div id="main">
        <h1>My Simple ToDo List</h1>
        <div className="form-check">
          <input 
            type="checkbox"
            className="form-check-input" 
            id="filter"
            checked={this.state.checked} 
            onChange={this.handleChange} 
          />
          <label className="form-check-label" htmlFor="filter"> Show only undone</label>
        </div>
        <TodoList filter={this.state.checked} items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}

const App = () => {
  return (
    <>
      <TodoApp initItems={todoItems}/>
    </>
  );
};
export default App;