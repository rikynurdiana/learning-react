import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import api from '../../api/Api';
import methods from '../../api/Methods';
import endpoint from '../../api/Endpoint';
import notification from '../../components/Notification';
import TableComponents from './components/TableComponents';

class CrudGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'CRUD Gallery',
      buttonCreate: 'Create New Data',
      listData: [],
      isLoading: true,
    }
  }

  handleDelete = async (id) => {
    this.setState({ isLoading: true })
    let reqDelete = await api.requestApi(endpoint.gallery+'/'+id, null, methods.delete)
    reqDelete.status === 200 ? 
    notification('Success', 'Selected Data Has Been Remove', 'success').then((result) => { this.getListData() }) : 
    notification('Error', 'Failed To Remove Selected Data', 'error').then((result) => { this.getListData() })
  }

  handleUpdate = (id) => {
    this.props.history.push('/form-edit/' + id);
  }

  getListData = async () => {
    let reqData = await api.requestApi(endpoint.gallery, null, methods.get);
    reqData.status === 200 ?
    this.setState({ isLoading: false, listData: reqData.data }) :
    this.setState({ isLoading: false }) && console.log('Status Success But Get Error')
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getListData();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.layout}>
        <CssBaseline />
        <Typography className={classes.title}>
          {this.state.pageTitle}
        </Typography>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item lg={12}>
              <Paper className={classes.paper}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonCreate}
                  component={Link}
                  to='/form' >
                  <Icon className={classes.iconSize}>add_circle</Icon> {this.state.buttonCreate}
                </Button>
                {this.state.isLoading === true && <LinearProgress /> }
                <TableComponents
                  listData={this.state.listData}
                  triggerDelete={this.handleDelete}
                  triggerUpdate={this.handleUpdate} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#a7a4a4',
    margin: '10px 0 10px 0'
  },
  buttonCreate: {
    margin: '0 0 20px 0',
  },
  iconSize: { 
    fontSize: '14px', 
    marginRight: '10px'
  }
})

CrudGallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CrudGallery);