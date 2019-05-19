import React from 'react'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const iconStyle = {
  fontSize: '14px',
  marginRight: '10px'
}

const btnStyle = {
  margin: '0 0 0 0'
}

const BtnCancel = (props) => {
  const { handleCancel, submitted } = props;
  return (
    <Button
      onClick={handleCancel}
      variant="contained"
      style={btnStyle}
      disabled={submitted}>
      <Icon style={iconStyle}>arrow_back</Icon> Cancel
    </Button>
  )
}

export default BtnCancel;