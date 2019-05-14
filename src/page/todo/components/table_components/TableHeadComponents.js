import React from 'react'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function TableHeadComponents(props) {
  return (
    <React.Fragment>
      <TableHead>
        <TableRow>
          <TableCell align="center" className={props.classes.width10}>No</TableCell>
          <TableCell align="center">Todo</TableCell>
          <TableCell align="center" className={props.classes.width100}>Status</TableCell>
          <TableCell align="center" className={props.classes.width200}>Action</TableCell>
        </TableRow>
      </TableHead>
    </React.Fragment>
  )
}
