import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const BtnCancel = (props) => {
  const { classes, handleDelete } = props;
  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      onClick={handleDelete}>
      <Icon >delete</Icon>
    </Button>
  )
}

const styles = () => ({
  button: {
    minWidth: '30px !important',
    margin: '0 0 0 10px',
    padding: '2px 5px',
  },
});


export default withStyles(styles)(BtnCancel);