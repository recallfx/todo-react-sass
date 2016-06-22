import React from 'react';
import { deleteTask } from '../actions/TaskListActions';

import jQuery from 'jquery';
import 'bootstrap/js/tooltip';

export default class ButtonDelete extends React.Component {
  static contextTypes = {
    isBrowser: React.PropTypes.bool,
    hasLocalStorage: React.PropTypes.bool
  };

  static propTypes = {
    id: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    id: ''
  };

  handleDeleteTask() {
    deleteTask(this.props.id);
  }

  componentDidMount() {
    jQuery('[data-toggle="tooltip"]').tooltip();
  }

  render() {
    return (
      <button className='btn btn-link app-btn-delete' onClick={this.handleDeleteTask.bind(this)}
              data-toggle='tooltip' data-placement='top' title='Delete'>
        <span className='fa fa-times'></span>
      </button>
    );
  }
}
