import React from 'react';
import { connect } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';
import get from 'lodash.get';
import { setPage } from './actions';

class PageMenu extends React.Component {
  createPageChangeHandler = toPage => () => {
    const { setPageDispatcher, onPageChange, perPage, search, sort, filters, lastPage } = this.props;
    if (toPage >= 1 && toPage <= lastPage) {
      setPageDispatcher(toPage);
      return onPageChange({page: toPage, perPage, search, sort, filters, lastPage});
    }
    return null;
  };

  render() {
    const firstPage = 1;
    const { size, floated, page, lastPage, displayRange } = this.props;

    let menuItemIndexes = [];
    let lower = Math.max(firstPage, page - displayRange);
    let upper = Math.min(lastPage, page + displayRange);
    for (let i = lower; i <= upper; i++) {
      menuItemIndexes.push(i);
    }

    return (
      <Menu pagination size={size} floated={floated}>
        <Menu.Item link icon disabled={page <= firstPage} onClick={this.createPageChangeHandler(page-1)}>
          <Icon name='left chevron' />
        </Menu.Item>
        {lower > firstPage &&
          <Menu.Item disabled>...</Menu.Item>
        }
        {menuItemIndexes.map(i => (
          <Menu.Item link active={page === i} key={i} onClick={this.createPageChangeHandler(i)}>{i}</Menu.Item>
        ))}
        {upper < lastPage &&
          <Menu.Item disabled>...</Menu.Item>
        }
        <Menu.Item link icon disabled={page >= lastPage} onClick={this.createPageChangeHandler(page+1)}>
          <Icon name='right chevron' />
        </Menu.Item>
      </Menu>
    );
  }
}

PageMenu.defaultProps = {
  displayRange: 2,
  storeKey: '',
  onPageChange: () => {}
};

const mapStateToProps = (state, ownProps) => {
  return {
    page: get(state, ownProps.storeKey + '.page', 1),
    perPage: get(state, ownProps.storeKey + '.perPage'),
    search: get(state, ownProps.storeKey + '.search'),
    sort: get(state, ownProps.storeKey + '.sort'),
    filters: get(state, ownProps.storeKey + '.filters'),
    lastPage: get(state, ownProps.storeKey + '.lastPage', 1)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPageDispatcher: toPage => dispatch(setPage(ownProps.storeKey, toPage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageMenu);
