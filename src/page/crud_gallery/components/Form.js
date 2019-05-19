import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import uuid from 'uuid';
import Moment from 'moment';

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import firebase from 'firebase/app';
import firebaseConfig from '../../../firebase-config';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'firebase/storage';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import api from '../../../api/Api';
import methods from '../../../api/Methods';
import endpoint from '../../../api/Endpoint';
import notification from '../../../components/Notification';

firebase.initializeApp(firebaseConfig);
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class FormComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle   : 'Form',
      title       : '',
      description : '',
      image       : '',
      status      : 'active',
      createdBy   : '',
      submitted   : false,
      currentImage: '',

    }
  }

  async componentWillMount() {
    window.scrollTo(0, 0);
    let id = this.props.match.params.id
    if (id) {
      let reqEditData = await api.requestApi(endpoint.gallery+'/'+id, '', methods.get)
      reqEditData.status === 200 ? (this.setState({
        title: reqEditData.data.title,
        description: reqEditData.data.description,
        currentImage: reqEditData.data.image,
        status: reqEditData.data.status,
        createdBy: reqEditData.data.createdBy,
      })) : console.log('There is an error gathering edit data from server');
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.setState({ submitted: !this.state.submitted });

    if (this.props.match.params.id) {
      // UPDATE DATA
      if (this.state.image === '') {
        // if the no update image
        let data = {
          id: this.props.match.params.id,
          title: this.state.title,
          description: this.state.description,
          image: this.state.currentImage,
          createdBy: this.state.createdBy,
          createdDate: Moment(new Date()).format('DD-MM-YYYY'),
          status: this.state.status
        }
        // Post JSON Data to API ( LOCAL JSON SERVER)
        api.requestApi(endpoint.gallery + '/' + this.props.match.params.id, data, methods.put).then(res => {
          res.status === 200 ?
            notification('Success', 'Data Has Been Updated', 'success').then((result) => {
              this.setState({ submitted: !this.state.submitted });
              this.props.history.push('/crud-gallery');
            }) :
            notification('Error', 'Data Failed To Update', 'error').then((result) => {
              this.setState({ submitted: !this.state.submitted });
            })
        })
      } else {
        // if image updated
        const mainImage = firebase.storage().ref().child(this.state.title.replace(" ", ""));
        await mainImage.put(this.state.image[0]).then((snapshot) => {
          mainImage.getDownloadURL().then((url) => {
            // Set Data
            let data = {
              id: this.props.match.params.id,
              title: this.state.title,
              description: this.state.description,
              image: url,
              createdBy: this.state.createdBy,
              createdDate: Moment(new Date()).format('DD-MM-YYYY'),
              status: this.state.status
            }
            // Post JSON Data to API ( LOCAL JSON SERVER)
            api.requestApi(endpoint.gallery + '/' + this.props.match.params.id, data, methods.put).then(res => {
              res.status === 200 ?
                notification('Success', 'New Data Has Been Added To List', 'success').then((result) => {
                  this.setState({ submitted: !this.state.submitted });
                  this.props.history.push('/crud-gallery');
                }) :
                notification('Error', 'Data Failed To Proccess', 'error').then((result) => {
                  this.setState({ submitted: !this.state.submitted });
                })
            })
          }).catch(error => {
            console.log(error)
          })
        }).catch(error => {
          console.log(error)
        })
      }
    } else {
      // NEW DATA
      // Upload image To FireBase
      const mainImage = firebase.storage().ref().child(this.state.title.replace(" ", ""));
      await mainImage.put(this.state.image[0]).then((snapshot) => {
        mainImage.getDownloadURL().then((url) => {
          // Set Data
          let data = {
            id: uuid(),
            title: this.state.title,
            description: this.state.description,
            image: url,
            createdBy: this.state.createdBy,
            createdDate: Moment(new Date()).format('DD-MM-YYYY'),
            status: this.state.status
          }
          // Post JSON Data to API ( LOCAL JSON SERVER)
          api.requestApi(endpoint.gallery, data, methods.post).then(res => {
            res.status === 201 ?
              notification('Success', 'New Data Has Been Added To List', 'success').then((result) => {
                this.setState({ submitted: !this.state.submitted });
                this.props.history.push('/crud-gallery');
              }) :
              notification('Error', 'Data Failed To Proccess', 'error').then((result) => {
                this.setState({ submitted: !this.state.submitted });
              })
          })
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    }
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
                <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                  <Grid container spacing={24}>
                    <Grid item lg={5}>
                      <TextValidator
                        label="Title"
                        name="title"
                        className={classes.textField}
                        value={this.state.title}
                        onChange={this.handleChange}
                        variant="outlined"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        disabled={this.state.submitted} />
                    </Grid>

                    <Grid item lg={4}>
                      <TextValidator
                        label="Created By"
                        name="createdBy"
                        className={classes.textField}
                        value={this.state.createdBy}
                        onChange={this.handleChange}
                        variant="outlined"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        disabled={this.state.submitted} />
                    </Grid>

                    <Grid item lg={3}>
                      <FormControl component="fieldset" className={classes.formStatus}>
                        <FormLabel component="legend">Status</FormLabel>
                        <RadioGroup
                          aria-label="Status"
                          name="status"
                          value={this.state.status}
                          onChange={this.handleChange}
                          row
                          className={classes.radioPosition} >
                          <FormControlLabel value="active" disabled={this.state.submitted}  control={<Radio />} label="Active" />
                          <FormControlLabel value="inactive" disabled={this.state.submitted} control={<Radio />} label="Inactive" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item lg={12}>
                      <TextValidator
                        label="Description"
                        name="description"
                        multiline
                        className={classes.textFieldDescription}
                        value={this.state.description}
                        onChange={this.handleChange}
                        variant="outlined"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        disabled={this.state.submitted} />
                    </Grid>

                    <Grid item lg={5}>
                      <FilePond
                        ref={ref => (this.pond = ref)}
                        required={this.props.match.params.id ? false : true}
                        source={this.state.image}
                        disabled={this.state.submitted}
                        onupdatefiles={fileItems => {
                          this.setState({
                            image: fileItems.map(fileItem => fileItem.file)
                          });
                        }} />
                    </Grid>
                    {this.props.match.params.id && (
                      <Grid item lg={7}>
                        <LazyLoadImage
                          alt={this.state.name}
                          src={this.state.currentImage}
                          effect="blur"
                          placeholderSrc="/img/default.jpg"
                          className={classes.imageSize} />
                      </Grid>
                    )}
                    <Grid item lg={12}>
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="default"
                          component={Link}
                          className={classes.cancelButton}
                          disabled={this.state.submitted}
                          to="/crud-gallery" >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={this.state.submitted} >
                          Submit
                        </Button>
                        {this.state.submitted === true && <CircularProgress size={24} className={classes.buttonProgress} />}
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
    marginTop: '10px'
  },
  textFieldDescription: {
    width: '100%',
    marginTop: '-5px'
  },
  formStatus: {
    marginTop: '12px',
  },
  radioPosition: {
    marginTop: '-7px'
  },
  button: {
    margin: theme.spacing.unit,
  },
  cancelButton: {
    marginRight: '20px'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    marginTop: '5px',
    marginLeft: '-55px',
  },
  imageSize: {
    width: '100%',
    height: '100%'
  }
})

FormComponents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormComponents);