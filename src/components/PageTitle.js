import React from 'react'
import Typography from '@material-ui/core/Typography';

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#a7a4a4',
  margin: '10px 0 10px 0'
}

export default function PageTitle(props) {
  const { title } = props
  return <Typography style={titleStyle}>{title}</Typography>
}
