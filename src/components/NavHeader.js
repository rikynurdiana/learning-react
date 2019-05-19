import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListMenu from './ListMenu';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import GoogleLogin from 'react-google-login';
import {GoogleLogout} from 'react-google-login';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

class NavHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: 'Learning ReactJs',
      left: false,
      loginButton: true,
      logoutButton: false,
      notifLogin: false,
      notifLogout: false,
      storageData: localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')) : null
    }
  }

  responseGoogle = (response) => {
    let data = {
      tokenId: response.tokenId,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      fullName: response.profileObj.name,
      email: response.profileObj.email,
      imageUrl: response.profileObj.imageUrl,
      googleId: response.profileObj.googleId,
    }
    localStorage.setItem('session', JSON.stringify(data));

    this.setState({ loginButton: false, logoutButton: true, notifLogin: true, storageData: localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')) : null })
  }

  logout = () => {
    this.setState({ loginButton: true, logoutButton: false, notifLogout: true, storageData: null })
    localStorage.clear();
  }

  toggleDrawer = (side, open) => {
    this.setState({ ...this.state, [side]: open });
  }
  
  componentWillMount() {
    localStorage.getItem('session') &&
    this.setState({ loginButton: !this.state.loginButton, logoutButton: !this.state.logoutButton }) 
  }

  handleCloseLogin = (event, reason) => {
    this.setState({notifLogin:false});
  }

  handleCloseLogout = (event, reason) => {
    this.setState({notifLogout:false});
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              onClick={() => this.toggleDrawer('left', !this.state.left)}
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6"
              color="inherit"
              className={classes.grow}
            >
            <Link
              component={RouterLink}
              to=""
              className={classes.titleLink}
              underline="none"
            >
              {this.state.appName}
            </Link>
            </Typography>

            <Typography className={classes.loginInfo}>
              {this.state.storageData && this.state.storageData.fullName}
            </Typography>

            <div style={this.state.logoutButton === true ? { display: 'block' } : { display: 'none' }}>
              <GoogleLogout
                clientId={process.env.REACT_APP_CLIENTID}
                buttonText="Logout"
                onLogoutSuccess={this.logout}
              />
            </div>

            <div style={this.state.loginButton === true ? {display:'block'} : {display:'none'}}>
              <GoogleLogin
                clientId={process.env.REACT_APP_CLIENTID}
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </Toolbar>
        </AppBar>

        <Drawer open={this.state.left} onClose={() => this.toggleDrawer('left', !this.state.left)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer('left', !this.state.left)}
            onKeyDown={() => this.toggleDrawer('left', !this.state.left)}
          >
            <ListMenu />
          </div>
        </Drawer>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.notifLogin}
          autoHideDuration={6000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id">
              Welcome {this.state.storageData && this.state.storageData.fullName} !
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseLogin}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.notifLogout}
          autoHideDuration={6000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id">
              You Now Logout From Apps !
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseLogout}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  titleLink: {
    color: '#fff',
  },
  loginInfo:{
    color: '#ffffff',
    fontSize: '16px',
    marginRight: '20px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  }
});

NavHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavHeader);
