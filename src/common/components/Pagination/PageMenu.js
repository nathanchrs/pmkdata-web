import React from 'react';
import { connect } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';
import get from 'lodash.get';
import { setPage, setPerPage } from './actions';

class PageMenu extends React.Component {
  firstPage = 1;

  createPageChangeHandler = toPage => () => {
    const { setPageDispatcher, onPageChange, perPage, search, sort, filters, lastPage } = this.props;
    if (toPage >= this.firstPage && toPage <= lastPage) {
      setPageDispatcher(toPage);
      return onPageChange({ page: toPage, perPage, search, sort, filters, lastPage});
    }
    return null;
  };

  createPerPageChangeHandler = perPage => () => {
    const { setPageDispatcher, setPerPageDispatcher, onPageChange, search, sort, filters, lastPage } = this.props;
    if (perPage > 0) {
      setPageDispatcher(this.firstPage);
      setPerPageDispatcher(perPage);
      return onPageChange({ page: this.firstPage, perPage, search, sort, filters, lastPage});
    }
    return null;
  };

  render() {
    const { size, floated, page, perPage, lastPage, displayRange, showPerPageMenu } = this.props;

    let menuItemIndexes = [];
    let lower = Math.max(this.firstPage, page - displayRange);
    let upper = Math.min(lastPage, page + displayRange);
    for (let i = lower; i <= upper; i++) {
      menuItemIndexes.push(i);
    }

    return (
      <div>
        {showPerPageMenu &&
        <Menu size={size} floated={floated}>
          {[10, 25, 50, 100].map(i => (
            <Menu.Item link active={perPage === i} key={i} onClick={this.createPerPageChangeHandler(i)}>{i}</Menu.Item>
          ))}
        </Menu>
        }

        <Menu pagination size={size} floated={floated}>
          <Menu.Item link icon disabled={page <= this.firstPage} onClick={this.createPageChangeHandler(page-1)}>
            <Icon name='left chevron' />
          </Menu.Item>
          {lower > this.firstPage &&
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
      </div>
    );
  }
}

PageMenu.defaultProps = {
  displayRange: 2,
  storeKey: '',
  onPageChange: () => {},
  showPerPageMenu: true,
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
    setPageDispatcher: toPage => dispatch(setPage(ownProps.storeKey, toPage)),
    setPerPageDispatcher: perPage => dispatch(setPerPage(ownProps.storeKey, perPage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageMenu);
