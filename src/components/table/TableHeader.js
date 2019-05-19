import React from 'react'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function Thead(props) {
  const { items } = props
  return (
    <TableHead>
      <TableRow>
        {items.map(item => (
          <React.Fragment key={item.id}>
            <TableCell align={item.align} style={item.style}>{item.text}</TableCell>
          </React.Fragment>
        ))}
      </TableRow>
    </TableHead>
  )
}
