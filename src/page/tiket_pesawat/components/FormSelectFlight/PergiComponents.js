import React from 'react'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

export default function PergiComponents(props) {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        margin="normal"
        label="Pergi"
        name="pergi"
        format="dddd, Do MMMM YYYY"
        value={props.propsPergi}
        onChange={props.propsOnChange}
      />
    </MuiPickersUtilsProvider>
  )
}
