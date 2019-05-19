import React from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BtnDelete from 'components/button/BtnDelete'
import BtnDone from 'components/button/BtnDone'

export default function Tbody(props) {
  const { items, handleDone, handleDelete } = props
  return (
    <TableBody>
      {items.map((item, index) => (
        <TableRow key={item.id}>
          <TableCell align="center">{index+1}</TableCell>
          <TableCell align="left">{item.title}</TableCell>
          <TableCell align="left">{item.status}</TableCell>
          <TableCell align="center">
            <BtnDone handleDone={() => handleDone(item.id)} />
            <BtnDelete handleDelete={() => handleDelete(item.id)}/>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
