import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';
import GoogleMapReact from 'google-map-react';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'Contact',
      submitted: false,
      name: '',
      email: '',
      subject: '',
      message: '',
      center: {
        lat: -6.842807,
        lng: 107.498375
      },
      zoom: 11,
      key: 'AIzaSyChi-TMhH8j8smeAGUO6hMrUg324n9LFeI'
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log('sumbit')
    await this.setState({ submitted: !this.state.submitted });
  }

  render() {
    window.scrollTo(0, 0)
    const { classes } = this.props;
    const AnyReactComponent = ({ text }) => (
      <div style={{
        color: 'white',
        background: 'grey',
        padding: '15px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
      }}>
        {text}
      </div>
    );

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
                <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
                  <Grid container spacing={24}>
                    <Grid item lg={6}>
                      <TextValidator
                        label="Name"
                        name="name"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange}
                        variant="outlined"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        disabled={this.state.submitted} />

                      <TextValidator
                        label="Email"
                        name="email"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange}
                        variant="outlined"
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                        disabled={this.state.submitted} />

                      <TextValidator
                        label="Subject"
                        name="subject"
                        className={classes.textField}
                        value={this.state.subject}
                        onChange={this.handleChange}
                        variant="outlined"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        disabled={this.state.submitted} />

                      <TextValidator
                        label="Message"
                        name="message"
                        multiline
                        rows="5"
                        className={classes.textField}
                        value={this.state.message}
                        onChange={this.handleChange}
                        variant="outlined"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        disabled={this.state.submitted} />

                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={this.state.submitted} >
                        Submit
                        </Button>
                      {this.state.submitted === true && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </Grid>

                    <Grid item lg={6}>
                      <div style={{ height: '420px', width: '100%', marginTop: '20px' }}>
                        <GoogleMapReact
                          bootstrapURLKeys={{ key: this.state.key }}
                          yesIWantToUseGoogleMapApiInternals
                          defaultCenter={this.state.center}
                          defaultZoom={this.state.zoom}
                        >
                          <AnyReactComponent
                            className={classes.markedMap}
                            lat={-6.842807}
                            lng={107.498375}
                            text="My Home"
                          />
                        </GoogleMapReact>
                      </div>
                    </Grid>
                  </Grid>
                </ValidatorForm>
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
    marginTop: '80px',
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
  textField: {
    width: '100%',
    marginTop: '20px'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    marginTop: '25px',
    marginLeft: '-55px',
  },
  button: {
    margin: '20px 0 0 0',
  },
  markedMap: {
    color: 'white',
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }
})

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);