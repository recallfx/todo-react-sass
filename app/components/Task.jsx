import React from 'react';
import { updateTask, editTask } from '../actions/TaskListActions';
import ButtonDelete from './ButtonDelete';

export default class Task extends React.Component {
  static contextTypes = {
    isBrowser: React.PropTypes.bool,
    hasLocalStorage: React.PropTypes.bool
  };

  static propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    order: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool.isRequired
  };

  static defaultProps = {
    id: '',
    title: '',
    order: '',
    completed: false
  };

  handleOnClick(e) {
    // update task with inverted property 'completed'
    updateTask(this.props.id, {completed: !this.props.completed});
  }

  handleOnClickEdit(e) {
    e.stopPropagation();

    // send action to edit this task in EditTask component
    editTask(this.props.id);
  }

  render() {
    const className = this.props.completed ? 'app-completed' : '';
    let icon = null;

    if (this.props.completed) {
      icon = (
          <span className='fa fa-check-square app-icon'></span>
      );
    } else {
      icon = (
          <span className='fa fa-pencil-square app-icon'></span>
      );
    }

    return (
      <li className={`list-group-item app-task ${className}`} onClick={this.handleOnClick.bind(this)}>
        <div className='row'>
          <div className='col-xs-1'>
            {icon}
          </div>
          <div className='col-xs-8 app-task-title'>
              {this.props.title}
          </div>
          <div className='col-xs-2'>
            <button className='btn btn-default btn-block' onClick={this.handleOnClickEdit.bind(this)}>Edit</button>
          </div>
          <div className='col-xs-1'>
            <ButtonDelete id={this.props.id} />
          </div>
        </div>
      </li>
    );
  }
}
