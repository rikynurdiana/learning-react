import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { LazyLoadImage } from 'react-lazy-load-image-component';

class TableBodyComponents extends React.Component {
  render() {
    const { classes } = this.props;
    
    return (
      <TableBody>
        {this.props.parentProps.listData.map((row, index) => (
          <TableRow key={index}>
            <TableCell align="center" className={classes.width10}>
              {index + 1}
            </TableCell>
            <TableCell align="left" className={classes.width100}>
              <LazyLoadImage
                alt={row.title}
                src={row.image}
                effect="blur"
                placeholderSrc="/img/default.jpg"
                className={classes.imageSize} />
            </TableCell>
            <TableCell className={classes.standardPadding}>
              {row.title}
            </TableCell>
            <TableCell className={classes.width130}>
              {row.createdBy}
            </TableCell>
            <TableCell className={classes.width100}>
              {row.createdDate}
            </TableCell>
            <TableCell align="center" className={classes.width100}>
              {row.status}
            </TableCell>
            <TableCell align="center" className={classes.width130}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.props.parentProps.triggerUpdate(row.id)}>
                <Icon className={classes.iconSize}>edit</Icon>
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => this.props.parentProps.triggerDelete(row.id)}>
                <Icon className={classes.iconSize}>delete</Icon>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
}

const styles = {
  width10: {
    width: '50px',
    padding: '5px 5px 5px 5px !important'
  },
  width100: {
    width: '100px',
    padding: '5px 5px 5px 5px !important'
  },
  width130: {
    width: '130px',
    padding: '5px 5px 5px 5px !important'
  },
  standardPadding: {
    padding: '5px 5px 5px 5px !important'
  },
  button: {
    margin: '0 5px 0 0px',
    minWidth: '30px !important'
  },
  imageSize: {
    width: '70px',
    height: '40px'
  },
  iconSize: {
    fontSize: '14px',
  }
};

TableBodyComponents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableBodyComponents);