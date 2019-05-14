import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default function CabinClassComponents(props) {
  return (
    <FormControl className={props.classes.textField}>
      <InputLabel htmlFor="kela">Kelas Kabin</InputLabel>
      <Select
        value={props.propsKelas}
        onChange={props.propsOnChange}
        inputProps={{ name: 'kelas', id: 'kela' }}
      >
        <MenuItem value="ekonomi">Ekonomi</MenuItem>
        <MenuItem value="bisnis">Bisnis</MenuItem>
        <MenuItem value="first">First</MenuItem>
      </Select>
    </FormControl>
  )
}
