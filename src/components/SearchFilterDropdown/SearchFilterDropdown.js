import React, { Component } from 'react';
import { Button, Icon, Input } from 'antd';
import PropTypes from 'prop-types';
import './SearchFilterDropdown.css';

class SearchFilterDropdown extends Component {
  state = {
    searchText: ''
  }

  componentDidMount() {
    this.setState({ searchText: this.props.initialValue });
  }

  onInputChange = e => {
    this.setState({ searchText: e.target.value });
  }

  render() {
    return (
      <div className="search-filter-dropdown">
        <Input
          autoFocus
          placeholder={this.props.placeholder}
          value={this.state.searchText}
          onChange={this.onInputChange}
          onPressEnter={this.onSearch}
        />
        <Button type="primary" onClick={this.onSearch}>
          <Icon type="search" />
        </Button>
      </div>
    );
  }
}

SearchFilterDropdown.propTypes = {
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired
};

export default SearchFilterDropdown;
