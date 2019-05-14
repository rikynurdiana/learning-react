import React from 'react'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import Switch from '@material-ui/core/Switch';

export default function PulangComponents(props) {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div style={{ position: 'absolute', margin: '0 0 0 30px', zIndex: '9' }}>
        <Switch
          checked={props.propsCheckedPulang}
          onChange={props.handleCheckedPulang}
          value={props.propsCheckedPulang}
          name='checkedPulang'
          color="primary"
        />
      </div>
      <DatePicker
        disabled={props.disabledPulang}
        margin="normal"
        label="Pulang"
        name="pulang"
        format="dddd, Do MMMM YYYY"
        value={props.propsPulang}
        onChange={props.propsOnChange}
      />
      
    </MuiPickersUtilsProvider>
  )
}
