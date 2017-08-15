import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import escapeRegExp from 'lodash.escaperegexp';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      value: ''
    }
  }
  
  componentWillMount() {
    this.resetSearch();
  }

  resetSearch = () => {
    const { storeKey, dispatcher } = this.props; 
    this.setState({ isLoading: false, value: '' });
    dispatcher(Object.assign(this.props.state[storeKey], {search: this.state.value}));
  }
  
  handleSearch = (value) => {
    const { storeKey, dispatcher } = this.props; 
    this.setState({ value });
    dispatcher(Object.assign(this.props.state[storeKey], {search: this.state.value}));
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetSearch();

      this.handleSearch(escapeRegExp(this.state.value));

      this.setState({
        isLoading: false
      })
    }, 500);
  }

  render() {
    const { isLoading } = this.state;

    return (
      <Input
        icon='search'
        fluid
        placeholder="Search..."
        loading={isLoading}
        onChange={this.handleSearchChange}
      />
    )
  }
}

SearchBox.propTypes = {
  dispatcher: PropTypes.func.isRequired,
  storeKey: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
