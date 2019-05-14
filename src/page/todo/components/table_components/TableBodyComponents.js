import React from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

export default function TableBodyComponents(props) {
  return (
    <React.Fragment>
      <TableBody>
        {props.listData.map((row, index) => (
          <TableRow key={index}>
            <TableCell align="center" className={row.completed === true ? props.classes.todoDone : ''} >
              {row.id}
            </TableCell>
            <TableCell align="center" className={row.completed === true ? props.classes.todoDone : ''}>
              {row.name}
            </TableCell>
            <TableCell align="center" className={row.completed === true ? props.classes.todoCompleted : ''} >
              {row.completed === true ? 'Completed' : ''}
            </TableCell>
            <TableCell align="center" className={props.classes.width200}>
              <Button
                onClick={() => props.parentProps.triggerParentUpdate(row.id)}
                variant="contained"
                color="primary"
                className={props.classes.button}
              >
                Done
              </Button>
              <Button
                onClick={() => props.parentProps.triggerParentDelete(row.id)}
                variant="contained"
                color="secondary"
                className={props.classes.button}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </React.Fragment>
  )
}
