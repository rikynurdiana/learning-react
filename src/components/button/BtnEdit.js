import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

const BtnCancel = (props) => {
  const { classes, urlEdit, id } = props;
  return (
    <Link to={`${urlEdit}/${id}`} className={classes.linkStyle}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}>
        <Icon style={classes.iconStyle}>edit</Icon>
      </Button>
    </Link>
  )
}

const styles = () => ({
  button: {
    minWidth: '30px !important',
    margin: '0 0 0 0',
    padding: '2px 5px',
  },
  linkStyle: {
    textDecoration: 'none'
  }
});

export default withStyles(styles)(BtnCancel);