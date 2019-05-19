import React from 'react'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const iconStyle = {
  fontSize: '14px',
  marginRight: '10px'
}

const btnStyle = {
  margin: '0 0 20px 0'
}

const BtnCreate = (props) => {
  const { handleCreate } = props;
  return (
    <Button
      onClick={handleCreate}
      variant="contained"
      color="primary"
      style={btnStyle}
    >
      <Icon style={iconStyle}>add_circle</Icon> CREATE NEW DATA
    </Button>
  )
}

export default BtnCreate;