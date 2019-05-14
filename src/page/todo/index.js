import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormTodo from './components/FormTodo';
import ListTodo from './components/ListTodo';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'Todo List',
      listData: []
    }
  }

  inputListData = (todo) => {
    let newInput = {
      id: this.state.listData.length + 1,
      name: todo,
      completed: false
    }
    let newList = this.state.listData.concat(newInput)
    this.setState({ listData: newList })
  }

  updateListdata = (id) => {
    const newData = this.state.listData.map(e => {
      if (e.id === id) {
        e = { ...e, completed: true };
      }
      return e;
    });
    this.setState({ listData: newData })
  }

  deleteListData = (id) => {
    let newData = this.state.listData.filter(x => x.id !== id);
    this.setState({ listData: newData })
  }

  render() {
    window.scrollTo(0, 0)
    const { classes } = this.props;

    return (
      <div className={classes.layout}>
        <CssBaseline />
        <Typography className={classes.title}>
          {this.state.pageTitle}
        </Typography>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item lg={4}>
              <Paper className={classes.paper}>
                <FormTodo
                  triggerParentInput={this.inputListData.bind(this)} 
                />
              </Paper>
            </Grid>
            <Grid item lg={8}>
              <Paper className={classes.paper}>
                <ListTodo
                  listData={this.state.listData}
                  triggerParentDelete={this.deleteListData} 
                  triggerParentUpdate={this.updateListdata}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  layout: {
    width: 'auto',
    marginTop: '80px',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#a7a4a4',
    margin: '10px 0 10px 0'
  },
})

Todo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Todo);