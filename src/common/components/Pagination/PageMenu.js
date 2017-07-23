import React from 'react';
import { connect } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';
import get from 'lodash.get';
import { setPage } from './actions';

class PageMenu extends React.Component {
  render() {
    const firstPage = 1;
    const { size, floated, currentPage, lastPage, displayRange, onChange, setPageDispatcher } = this.props;

    let menuItemIndexes = [];
    let lower = Math.max(firstPage, currentPage - displayRange);
    let upper = Math.min(lastPage, currentPage + displayRange);
    for (let i = lower; i <= upper; i++) {
      menuItemIndexes.push(i);
    }

    return (
      <Menu pagination size={size} floated={floated}>
        <Menu.Item link icon disabled={currentPage === firstPage}>
          <Icon name='left chevron' />
        </Menu.Item>
        {lower > firstPage &&
          <Menu.Item disabled>...</Menu.Item>
        }
        {menuItemIndexes.map(i => (
          <Menu.Item link active={currentPage === i} key={i} onClick={(event) => {
            setPageDispatcher(i);
            return onChange(event);
          }}>{i}</Menu.Item>
        ))}
        {upper < lastPage &&
        <Menu.Item disabled>...</Menu.Item>
        }
        <Menu.Item link icon disabled={currentPage === lastPage}>
          <Icon name='right chevron' />
        </Menu.Item>
      </Menu>
    );
  }
}

PageMenu.defaultProps = {
  displayRange: 2,
  storeKey: '',
  onChange: () => {}
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentPage: get(state, ownProps.storeKey + '.currentPage', 1),
    lastPage: get(state, ownProps.storeKey + '.lastPage', 1)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPageDispatcher: toPage => dispatch(setPage(ownProps.storeKey, toPage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageMenu);
