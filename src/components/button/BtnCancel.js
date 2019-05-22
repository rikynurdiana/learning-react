import React from 'react'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

const iconStyle = {
  fontSize: '14px',
  marginRight: '10px'
}

const btnStyle = {
  margin: '0 0 0 0'
}

const linkStyle = {
  textDecoration: 'none'
}

const BtnCancel = (props) => {
  const { urlCancel, submitted } = props
  return (
    <Link to={urlCancel} style={linkStyle}>
      <Button
        variant="contained"
        style={btnStyle}
        disabled={submitted}>
        <Icon style={iconStyle}>arrow_back</Icon> Cancel
      </Button>
    </Link>
  )
}

export default BtnCancel;