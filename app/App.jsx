import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout/Layout';
import PageTodo from './pages/Todo';

window.onload = () => {
  const app = document.querySelector('#app');

  ReactDOM.render(
    <Layout>
      <PageTodo />
    </Layout>,
    app
  );
};

//ReactDOM.render(<Layout />, document.getElementById('app'));
