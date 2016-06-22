import dispatcher from '../common/Dispatcher';
import Constants from '../common/Constants';

/*
 * Local methods
 * */
export function createTask(context, text, cb) {
  const tmpId = Date.now() + text;
  const taskNew = {
    title: text,
    order: tmpId,
    completed: false
  };

  // if user not logged in, create temporary id
  if (context.isBrowser) {
    taskNew.id = tmpId;
  }

  if (cb) cb();

  // create only if server request was success
  dispatcher.dispatch({ type: Constants.Actions.TaskListStore.CREATE, task: taskNew });
}

export function updateTask(id, task) {
  // immediately dispatch task change to update input value
  dispatcher.dispatch({ type: Constants.Actions.TaskListStore.UPDATE, id: id, task: task });
}

export function editTask(id) {
  // immediately dispatch task change to edit some task
  dispatcher.dispatch({ type: Constants.Actions.TaskListStore.EDIT, id: id });
}

export function deleteTask(id) {
  // delete only if server request was success
  dispatcher.dispatch({ type: Constants.Actions.TaskListStore.DELETE, id: id });
}

// placeholder
export function clearCompletedTasks() {
  // delete only if server request was success
  dispatcher.dispatch({ type: Constants.Actions.TaskListStore.CLEAR_COMPLETED });
}
