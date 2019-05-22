import React from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BtnDelete from 'components/button/BtnDelete'
import BtnEdit from 'components/button/BtnEdit'
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
              <TableCell align="left">
                <LazyLoadImage
                  alt={item.title}
                  src={item.image}
                  effect="blur"
                  placeholderSrc="/img/default.jpg"
                  style={{ width: '70px', height: '40px' }} />
              </TableCell>
              <TableCell align="left">{item.title}</TableCell>
              <TableCell align="left">{item.createdBy}</TableCell>
              <TableCell align="left">{item.createdDate}</TableCell>
              <TableCell align="left">{item.status}</TableCell>
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
