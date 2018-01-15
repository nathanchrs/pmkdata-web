import React, { Component } from 'react';
import { Button, Icon, Input } from 'antd';
import PropTypes from 'prop-types';
import './SearchFilterDropdown.css';

class SearchFilterDropdown extends Component {
  state = {
    searchText: ''
  }

  componentWillReceiveProps(nextProps) {
    // Reset search input and mark input for focusing when the dropdown is shown.
    if (!this.props.visible && nextProps.visible) {
      this.setState({ searchText: this.props.initialValue }, () => {
        // Focus on the search box afterwards.
        this.inputRef && this.inputRef.focus();
      });
    }
  }

  handleFilter = e => this.props.onFilter({[this.props.dataIndex]: this.state.searchText });

  onInputChange = e => {
    this.setState({ searchText: e.target.value });
  }

  render() {
    return (
      <div className="search-filter-dropdown">
        <Input
          placeholder={this.props.placeholder}
          value={this.state.searchText}
          onChange={this.onInputChange}
          onPressEnter={this.handleFilter}
          ref={el => this.inputRef = el}
        />
        <Button type="primary" onClick={this.handleFilter} loading={this.props.loading}>
          <Icon type={this.props.loading ? "loading" : "search"}/>
        </Button>
      </div>
    );
  }
}

SearchFilterDropdown.propTypes = {
  dataIndex: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  loading: PropTypes.bool,
  placeholder: PropTypes.string,
  visible: PropTypes.bool
};

export default SearchFilterDropdown;
