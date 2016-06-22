const Constants = {
  Actions: {
    TaskListStore: {
      CREATE: 'ACTION_TASK_LIST_STORE_CREATE',
      UPDATE: 'ACTION_TASK_LIST_STORE_UPDATE',
      EDIT: 'ACTION_TASK_LIST_STORE_EDIT',
      DELETE: 'ACTION_TASK_LIST_STORE_DELETE',
      CLEAR_COMPLETED: 'ACTION_TASK_LIST_STORE_CLEAR_COMPLETED'
    }
  },
  Defaults: {
    TASK_LIST_KEY: 'TASK_LIST'
  }
};

Object.freeze(Constants);
export default Constants;
