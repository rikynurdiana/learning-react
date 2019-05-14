import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class TableHeadComponents extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell align="center" className={classes.width10}>No</TableCell>
          <TableCell align="left" className={classes.width100}>Image</TableCell>
          <TableCell align="left" className={classes.standardPadding}>Title</TableCell>
          <TableCell align="left" className={classes.width130}>Create By</TableCell>
          <TableCell align="left" className={classes.width100}>Create Date</TableCell>
          <TableCell align="center" className={classes.width100}>Status</TableCell>
          <TableCell align="center" className={classes.width130}>Action</TableCell>
        </TableRow>
      </TableHead>
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
  }
};

TableHeadComponents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableHeadComponents);
