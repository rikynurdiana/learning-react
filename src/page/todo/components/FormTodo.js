import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class FormTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      todo: ''
    };
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  submitForm = (event) => {
    event.preventDefault();
    this.props.triggerParentInput(this.state.todo)
    this.setState({ todo: '' })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <form 
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={this.submitForm}
        >
          <TextField
            label="Todo Item"
            name="todo"
            className={classes.textField}
            value={this.state.todo}
            onChange={this.handleChange}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 300,
    marginTop: 0
  },
});

FormTodo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormTodo);