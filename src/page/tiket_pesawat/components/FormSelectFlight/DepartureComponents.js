import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default function DepatureComponents(props) {
  return (
    <FormControl className={props.classes.textField}>
      <InputLabel htmlFor="dari">Dari</InputLabel>
      <Select
        value={props.propsDari}
        onChange={props.propsOnChange}
        inputProps={{ name: 'dari', id: 'dari' }}
      >
        <MenuItem value="">Pergi dari ...</MenuItem>
        <MenuItem value="bandung">Bandung</MenuItem>
      </Select>
    </FormControl>
  )
}
