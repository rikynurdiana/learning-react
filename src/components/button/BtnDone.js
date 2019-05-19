import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const BtnDone = (props) => {
  const { classes, handleDone } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={handleDone}>
      <Icon style={classes.iconStyle}>done</Icon>
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

export default withStyles(styles)(BtnDone);