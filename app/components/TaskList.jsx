import React from 'react';
import EditTask from './EditTask';
import Task from './Task';
import { clearCompletedTasks } from '../actions/TaskListActions';

export default class TaskList extends React.Component {
  static contextTypes = {
    isBrowser: React.PropTypes.bool,
    hasLocalStorage: React.PropTypes.bool
  };

  static propTypes = {
    data: React.PropTypes.array.isRequired
  };

  getAll() {
    return this.props.data.filter((task) => true);
  }

  getActive() {
    return this.props.data.filter((task) => !task.completed);
  }

  render() {
    const tasks = this.getAll().map((task) => {
      return (
        <Task id={task.id}
               title={task.title}
               order={task.order}
               completed={task.completed}
               key={task.id}
            />
      );
    });

    const active = this.getActive();
    const activeCount = active.length;
    const buttonClear = (
      <button className='btn btn-default' onClick={clearCompletedTasks.bind(this)}>Clear Completed</button>
    );

    return (
      <div className='app-task-list'>
        <div className='row'>
          <h4 className='col-xs-12'>
            MyTasks <span className='badge'>{activeCount}</span>
          </h4>
        </div>

        <ul className='list-group list-group-hover col-xs-12'>
          {tasks}
          <EditTask />
        </ul>

        <div className='text-center'>
          {buttonClear}
        </div>
      </div>
    );
  }
}
