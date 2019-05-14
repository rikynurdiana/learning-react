import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default function ArrivalComponents(props) {
  return (
    <FormControl className={props.classes.textField}>
      <InputLabel htmlFor="ke">Ke</InputLabel>
      <Select
        value={props.propsKe}
        onChange={props.propsOnChange}
        inputProps={{ name: 'ke', id: 'ke' }}
      >
        <MenuItem value="">Tujuan ke...</MenuItem>
        <MenuItem value="jogja">Jogja</MenuItem>
      </Select>
    </FormControl>
  )
}