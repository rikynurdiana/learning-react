import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHeadComponents from './table_components/TableHeadComponents'
import TableBodyComponents from './table_components/TableBodyComponents'

class TableComponents extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHeadComponents />
            <TableBodyComponents parentProps={this.props} />
          </Table>
        </Paper>
      </div>
    );
  }
}

const styles = {
  root: {
    width: '100%',
    marginTop: 0,
    overflowX: 'auto',
  },
  table: {
    padding: '5px 5px 5px 5px !important'
  }
};

TableComponents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableComponents);