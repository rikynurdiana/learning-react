import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

import TableHeadComponents from './table_components/TableHeadComponents';
import TableBodyComponents from './table_components/TableBodyComponents';

class ListTodo extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Paper className={classes.root}>
          <Table>
            <TableHeadComponents classes={classes}/>
            <TableBodyComponents
              classes={classes}
              listData={this.props.listData}
              parentProps={this.props}
            />
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 0,
    overflowX: 'auto',
  },
  width10: {
    width: '50px',
    textAlign: 'center'
  },
  width100: {
    width: '100px',
    textAlign: 'center'
  },
  width130: {
    width: '130px',
    textAlign: 'center'
  },
  width200: {
    width: '200px',
    textAlign: 'center'
  },
  standardPadding: {
    textAlign: 'center'
  },
  table: {
    padding: '5px 5px 5px 5px !important'
  },
  button: {
    margin: theme.spacing.unit,
    minWidth: '30px !important'
  },
  input: {
    display: 'none',
  },
  todoDone: {
    color: 'red',
    textDecoration: 'line-through',
    textAlign: 'center'
  },
  todoCompleted: {
    color: 'red',
    textAlign: 'center'
  }
});

ListTodo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListTodo);