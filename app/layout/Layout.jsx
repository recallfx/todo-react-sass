import React from 'react';

import css from './Layout.scss';

export default class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.object
  };

  render() {
    return (
      <section className={css.layout}>
        {this.props.children}
      </section>
    );
  }
}
