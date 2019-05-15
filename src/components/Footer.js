import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import './components.css';

class Footer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <CssBaseline />
        <Grid container spacing={24} style={{ margin: '-24px' }}>
          <Grid item lg={5} md={4} xs={12} className={classes.whenSmall}>
            <Grid container className={classes.whenMedium}>
              <Grid item lg={3} className={classes.imageWhenMedium}>
                <img src="/img/logo.svg" className="App-logo" alt="logo" width="140px" />
              </Grid>
              <Grid item lg={9}>
                <Typography className={classes.textReact}>
                  ReactJs
                </Typography>
                <hr style={{ marginLeft: '10px'}}/>
                <Typography className={classes.descReact}>
                  A JavaScript library for building user interfaces
                </Typography>
                <Typography className={classes.madeByText}>
                  Made By Facebook
                </Typography>
              </Grid>
            </Grid>
          </Grid>


          <Grid item lg={3} md={4} xs={12} className={classes.whenSmall}>
            <Typography className={classes.footerText}>
              Follow Me
            </Typography>
            <img src="/img/icons/instagram.png" alt="instagram" width="50px" />
            <img src="/img/icons/facebook.png" alt="facebook" width="50px" />
            <img src="/img/icons/linkedin.png" alt="linkedin" width="50px" />
            <img src="/img/icons/youtube.png" alt="youtube" width="50px" />
            <img src="/img/icons/twitter.png" alt="twitter" width="50px" />
            <Typography className={classes.emailtext}>
              Email Business : nurdiana.riky@gmail.com
            </Typography>
          </Grid>


          <Grid item lg={4} md={4} xs={12} className={classes.whenSmall}>
            <Typography className={classes.footerText}>
              Menu Link
            </Typography>
            <Grid container>
              <Grid item lg={4}>
                <Typography className={classes.menuText}>
                  About
                </Typography>
                <Typography className={classes.menuText}>
                  Contact
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography className={classes.menuText}>
                  Experience
                </Typography>
                <Typography className={classes.menuText}>
                  Portfolio
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography className={classes.menuText}>
                  Office
                </Typography>
                <Typography className={classes.menuText}>
                  Home
                </Typography>
              </Grid>
            </Grid>
            <Typography className={classes.smallText}>
              Copyright | Privacy | Policies | About | Contact
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  container:{
    width: '100%',
    height: 'auto',
    backgroundColor: '#383838',
    margin: '10px 0 0 0',
    padding: '50px 0 50px 0',
    bottom: 0,
  },
  footerText: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '0 0 0 8px'
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  textReact: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 'bold',
    marginLeft: '10px'
  },
  descReact: {
    color: '#ffffff',
    fontSize: '14px',
    marginLeft: '10px'
  },
  madeByText: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 0 10px'
  },
  emailtext: {
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '0 0 0 8px'
  },
  smallText: {
    color: '#ffffff',
    fontSize: '14px',
    padding: '10px 0 0 8px'
  },
  menuText: {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '0 0 0 8px'
  },
  whenSmall: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '30px'
    },
  },
  whenMedium: {
    [theme.breakpoints.down('md')]: {
      marginLeft: '30px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px'
    },
  },
  imageWhenMedium: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginLeft: '-30px'
    },
  }
})

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);