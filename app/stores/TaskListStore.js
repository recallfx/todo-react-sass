import { EventEmitter} from 'events';
import { find, findIndex, remove, assign } from 'lodash';
import Context from '../common/Context';
import dispatcher from '../common/Dispatcher';
import Constants from '../common/Constants';

// private functions
const trySavingLocalStorage = function (context, taskList) {
  // try saving to local storage only in browsers with local storage support
  if (context.isBrowser && context.hasLocalStorage) {
    if (taskList) {
      // save to local store
      localStorage.setItem(Constants.Defaults.TASK_LIST_KEY, JSON.stringify(taskList));
    } else {
      // remove key from local storage
      localStorage.removeItem(Constants.Defaults.TASK_LIST_KEY);
    }
  }
};

const tryLoadingLocalStorage = function (context, data) {
  let result = data ? data : [];

  if (context.isBrowser && context.hasLocalStorage) {
    const localDataString = localStorage.getItem(Constants.Defaults.TASK_LIST_KEY);

    // check if local storage has any saved tasks
    if (localDataString && localDataString !== '') {
      let localData = JSON.parse(localDataString);

      localData = localData.filter((localTask) => {
        return localTask && localTask.title;
      });

      // add them to already received data
      result = data.concat(localData);
    }
  }

  return result;
};

/*
 * TaskListStore - STORE part of Flux pattern
 * */
class TaskListStore extends EventEmitter {
  constructor() {
    super();

    this.context = new Context();

    this.taskList = null;
  }

  initTaskList(data) {
    // if task list is not initialised, try adding config data and local storage
    if (this.taskList === null) {
      this.taskList = tryLoadingLocalStorage(this.context, data);
    }
  }

  create(task) {
    this.taskList.push(task);

    trySavingLocalStorage(this.context, this.taskList);

    if (this.context.isBrowser) {
      this.emit('change');
    }
  }

  updateById(id, updatedTask) {
    let task = find(this.taskList, (task) => task.id === id);

    assign(task, updatedTask);

    trySavingLocalStorage(this.context, this.taskList);

    if (this.context.isBrowser) {
      this.emit('change');
    }
  }

  editById(id) {
    let task = find(this.taskList, (task) => task.id === id);

    if (this.context.isBrowser) {
      this.emit('edit', task);
    }
  }

  deleteById(id) {
    const index = findIndex(this.taskList, (task) => task.id === id);

    if (index > -1) {
      // faster than lodash remove
      this.taskList.splice(index, 1);

      trySavingLocalStorage(this.context, this.taskList);

      if (this.context.isBrowser) {
        this.emit('change');
      }
    }
  }

  clearCompleted() {
    const length = this.taskList.length;

    remove(this.taskList, (task) => task.completed);

    if (this.taskList.length !== length) {
      trySavingLocalStorage(this.context, this.taskList);

      if (this.context.isBrowser) {
        this.emit('change');
      }
    }
  }

  getAll() {
    return this.taskList.sort((a, b) => b.order.localeCompare(a.order));
  }

  /*
   * Handle dispatcher actions
   * */
  handleActions(action) {
    switch (action.type) {
      case Constants.Actions.TaskListStore.CREATE:
        this.create(action.task);
        break;
      case Constants.Actions.TaskListStore.UPDATE:
        this.updateById(action.id, action.task);
        break;
      case Constants.Actions.TaskListStore.EDIT:
        this.editById(action.id);
        break;
      case Constants.Actions.TaskListStore.DELETE:
        this.deleteById(action.id);
        break;
      case Constants.Actions.TaskListStore.CLEAR_COMPLETED:
        this.clearCompleted();
        break;
    }
  }
}

const taskListStore = new TaskListStore();

dispatcher.register(taskListStore.handleActions.bind(taskListStore));

export default taskListStore;
