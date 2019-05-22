import React from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BtnDelete from 'components/button/BtnDelete'
import BtnEdit from 'components/button/BtnEdit'
import { Consumer } from '../context/Provider'

export default function Tbody() {
  window.scrollTo(0, 0);
  return (
    <Consumer>
      {(context) => (
        <TableBody>
          {context.state.items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="left">{item.name}</TableCell>
              <TableCell align="left">{item.gender}</TableCell>
              <TableCell align="left">{item.age}</TableCell>
              <TableCell align="left">{item.address}</TableCell>
              <TableCell align="center">
                <BtnEdit urlEdit={context.state.urlEdit} id={item.id} />
                <BtnDelete handleDelete={() => context.handleDelete(item.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Consumer>
  )
}
