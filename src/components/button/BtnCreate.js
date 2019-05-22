import React from 'react'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

const iconStyle = {
  fontSize: '14px',
  marginRight: '10px'
}

const btnStyle = {
  margin: '0 0 20px 0',
}

const linkStyle = {
  textDecoration: 'none'
}

const BtnCreate = (props) => {
  const { urlCreate } = props
  return (
    <Link to={urlCreate} style={linkStyle}>
      <Button
        variant="contained"
        color="primary"
        style={btnStyle}
      >
        <Icon style={iconStyle}>add_circle</Icon> CREATE NEW DATA
      </Button>
    </Link>
  )
}

export default BtnCreate;