import React from 'react';
import TaskList from '../components/TaskList';
import taskListStore from '../stores/TaskListStore';
import Context from '../common/Context';

export default class Todo extends React.Component {
  static childContextTypes = {
    isBrowser: React.PropTypes.bool,
    hasLocalStorage: React.PropTypes.bool,
    data: React.PropTypes.array
  };

  static propTypes = {
    serverContext: React.PropTypes.object,
    location: React.PropTypes.object,
    router: React.PropTypes.object,
    route: React.PropTypes.object
  };

  constructor() {
    super();

    this.editTaskEventEvent = this.editTaskEventEvent.bind(this);

    const ctx = new Context();

    this.state = {
      // context
      isBrowser: ctx.isBrowser,
      hasLocalStorage: ctx.hasLocalStorage,
      data: ctx.data,

      // component state
      taskList: []
    };
  }

  getChildContext() {
    return {
      isBrowser: this.state.isBrowser,
      hasLocalStorage: this.state.hasLocalStorage,
      data: this.state.data
    };
  }

  componentWillMount() {
    if (this.state.isBrowser) {
      // use events only in browser mode
      taskListStore.on('change', this.editTaskEventEvent);

      taskListStore.initTaskList(this.state.data);
      taskListStore.emit('change');
    } else {
      this.setState({
        data: this.props.serverContext.data
      });

      taskListStore.initTaskList(this.props.serverContext.data);
    }
  }

  componentWillUnmount() {
    if (this.state.isBrowser) {
      taskListStore.removeListener('change', this.editTaskEventEvent);
    }
  }

  editTaskEventEvent() {
    this.setState({
      taskList: taskListStore.getAll()
    });
  }

  render() {
    return (
      <div id='main'>
        <TaskList data={this.state.taskList} />
      </div>
    );
  }
}
