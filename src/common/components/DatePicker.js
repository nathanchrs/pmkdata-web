import React from 'react';
import DatePicker from 'react-datetime';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Table} from 'semantic-ui-react';

class renderDatePicker extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired]),
    error: PropTypes.bool,
    timeFormat: PropTypes.bool.isRequired,
  }

  handleChange = (date) => {
    this.props.timeFormat ? this.props.onChange(moment(date).format()) : this.props.onChange(moment(date).format('YYYY-MM-DD'));
  }

   renderDay = ( props, currentDate, selectedDate ) => {
        return <Table.Cell {...props}>{ parseInt(currentDate.date(), 10) < 10 ? '0' + currentDate.date() : currentDate.date()}</Table.Cell>;
    }

    renderMonth = ( props, month, year, selectedDate ) => {
        return <Table.Cell {...props}>{ month }</Table.Cell>;
    }

    renderYear = ( props, year, selectedDate ) => {
        return <Table.Cell {...props}>{ year % 100 }</Table.Cell>;
    }

  render () {
    const {
      value,
      error,
      dateFormat,
      timeFormat,
      ...restOfProps
    } = this.props;
    
    return (
      <Table color='teal' compact striped collapsing stackable size='small' textAlign='center'>
        <DatePicker
          {...restOfProps}
          dateFormat={timeFormat ? true : 'YYYY-MM-DD'}
          timeFormat={timeFormat}
          renderDay={this.renderDay}
          renderMonth={this.renderMonth}
          renderYear={this.renderYear}
          value={timeFormat ? moment(value) : moment(value, 'YYYY-MM-DD')}
          onChange={this.handleChange}
        />
        {error && <span>{error}</span>}
      </Table>
    )
  }
}

export default renderDatePicker;
