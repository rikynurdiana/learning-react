import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import uuid from 'uuid';
import Moment from 'moment';

import { Provider, Consumer } from '../context/Provider';
import WrapperContainer from 'components/Container';
import BtnSubmit from 'components/button/BtnSubmit';
import BtnCancel from 'components/button/BtnCancel';

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import firebase from 'firebase/app';
import firebaseConfig from 'firebase-config';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'firebase/storage';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import api from 'api/Api';
import methods from 'api/Methods';
import endpoint from 'api/Endpoint';
import notification from 'components/Notification';

firebase.initializeApp(firebaseConfig);
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class Form extends React.Component {
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleCancel = () => {
    this.props.history.push('/crud-biodata')
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ submitted: true })

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

  handleUpdate = async (event) => {
    event.preventDefault();
    this.setState({ submitted: true })
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
  }

  getDataById = async (id) => {
    let reqEditData = await api.requestApi(endpoint.gallery + '/' + id, '', methods.get)
    reqEditData.status === 200 ? (this.setState({
      title: reqEditData.data.title,
      description: reqEditData.data.description,
      currentImage: reqEditData.data.image,
      status: reqEditData.data.status,
      createdBy: reqEditData.data.createdBy,
    })) : console.log('There is an error gathering edit data from server');
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.match.params.id && this.getDataById(this.props.match.params.id)
  }

  render() {
    const { classes } = this.props;
    return (
      <Provider>
        <Consumer>
          {(context) => (
            <WrapperContainer title={this.props.match.params.id ? context.state.pageTitleFormEdit : context.state.pageTitleFormCreate}>
              <ValidatorForm onSubmit={this.props.match.params.id ? this.handleUpdate : this.handleSubmit}>
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
                        <FormControlLabel value="active" disabled={this.state.submitted} control={<Radio />} label="Active" />
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
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <BtnCancel submitted={this.state.submitted} urlCancel={context.state.urlCancel} />
                    <BtnSubmit submitted={this.state.submitted} type="submit" />
                  </Grid>
                </Grid>
              </ValidatorForm>
            </WrapperContainer>
          )}
        </Consumer>
      </Provider>
    );
  }
}

const styles = () => ({
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
  imageSize: {
    width: '100%',
    height: '100%'
  }
})

export default withStyles(styles)(Form);