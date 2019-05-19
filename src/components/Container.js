import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PageTitle from 'components/PageTitle'

const Container = (props) => {
  const { classes, title } = props;
  return (
    <div className={classes.layout}>
      <PageTitle title={title} />
      <Paper className={classes.paper}>
        {props.children}
      </Paper>
    </div>
  )
}

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(Container);