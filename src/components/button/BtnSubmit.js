import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';

const BtnSubmit = (props) => {
  const { classes, submitted } = props
  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.btnStyle}
        disabled={submitted}>
        <Icon className={classes.iconStyle}>check</Icon> Submit
      </Button>
      {submitted === true && <CircularProgress size={24} className={classes.buttonProgress} />}
    </React.Fragment>
  )
}

const styles = () => ({
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    marginTop: '5px',
    marginLeft: '-55px',
  },
  btnStyle: {
    margin: '0 0 0 20px'
  },
  iconStyle: {
    fontSize: '14px',
    marginRight: '10px'
  }
})

export default withStyles(styles)(BtnSubmit);