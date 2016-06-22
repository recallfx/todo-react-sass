import React from 'react';
import { createTask, updateTask } from '../actions/TaskListActions';
import taskListStore from '../stores/TaskListStore';

export default class EditTask extends React.Component {
  static contextTypes = {
    isBrowser: React.PropTypes.bool,
    hasLocalStorage: React.PropTypes.bool
  };

  constructor() {
    super();

    this.editTaskEvent = this.editTaskEvent.bind(this);

    this.state = {
      id: '',
      title: ''
    };
  }

  componentWillMount() {
    taskListStore.on('edit', this.editTaskEvent);
  }

  componentWillUnmount() {
    if (this.state.isBrowser) {
      taskListStore.removeListener('edit', this.editTaskEvent);
    }
  }

  editTaskEvent(task) {
    this.setState({
      id: task.id,
      title: task.title
    });
  }

  handleChangeTitle(e) {
    // save current value
    this.setState({
      title: e.target.value
    });
  }

  clearState() {
    // clear state after saving or editing
    this.setState({
      id: '',
      title: ''
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.processTask();
    }
  }

  handleClickSave() {
    this.processTask();
  }

  processTask() {
    if (this.state.title.length > 0) {

      if (this.state.id !== '') {
        // update
        updateTask(this.state.id, { title: this.state.title });
        this.clearState();
      } else {
        // create new
        createTask(this.context, this.state.title, this.clearState.bind(this));
      }
    }
  }

  render() {
    return (
      <li className='list-group-item'>
        <div className='row'>
          <div className='col-xs-1'>
            <span className='fa fa-plus-square-o app-icon'></span>
          </div>
          <div className='col-xs-9'>
            <input type='text'
                   name='title'
                   value={this.state.title}
                   className='form-control'
                   placeholder='Type task title and press Enter'
                   onChange={this.handleChangeTitle.bind(this)}
                   onKeyPress={this.handleKeyPress.bind(this)}
              />
          </div>
          <div className='col-xs-2'>
            <button className='btn btn-primary btn-block' onClick={this.handleClickSave.bind(this)}>Save</button>
          </div>
        </div>
      </li>
    );
  }
}
