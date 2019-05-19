import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const BtnCancel = (props) => {
  const { classes, handleEdit } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={handleEdit}>
      <Icon style={classes.iconStyle}>edit</Icon>
    </Button>
  )
}

const styles = () => ({
  button: {
    minWidth: '30px !important',
    margin: '0 0 0 0',
    padding: '2px 5px',
  },
});

export default withStyles(styles)(BtnCancel);