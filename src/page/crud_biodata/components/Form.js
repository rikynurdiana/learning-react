import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import uuid from 'uuid';
import Moment from 'moment';

import { Provider, Consumer } from '../context/Provider';
import WrapperContainer from 'components/Container';
import BtnSubmit from 'components/button/BtnSubmit';
import BtnCancel from 'components/button/BtnCancel';

import api from 'api/Api';
import methods from 'api/Methods';
import endpoint from 'api/Endpoint';
import notification from 'components/Notification';

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted : false,
      name      : '',
      gender    : 'Male',
      age       : '',
      address   : '',
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

    let data = {
      name: this.state.name,
      age: this.state.age,
      gender: this.state.gender,
      address: this.state.address,
      id: uuid(),
      createdDate: Moment(new Date()).format('DD-MM-YYYY'),
      updatedDate: Moment(new Date()).format('DD-MM-YYYY'),
    }

    let postData = await api.requestApi(endpoint.biodata, data, methods.post)

    postData.status === 201 ?
    notification('Success', 'New Data Has Been Added To List', 'success').then((result) => {
      this.props.history.push('/crud-biodata');
    }) :
    notification('Error', 'Data Failed To Proccess', 'error').then((result) => {
      this.setState({ submitted: false });
    })
  }

  handleUpdate = async (event) => {
    event.preventDefault();
    this.setState({ submitted: true })

    let data = {
      name: this.state.name,
      age: this.state.age,
      gender: this.state.gender,
      address: this.state.address,
      updatedDate: Moment(new Date()).format('DD-MM-YYYY'),
    }

    let updateData = await api.requestApi(`${endpoint.biodata}/${this.props.match.params.id}`, data, methods.put)

    updateData.status === 200 ?
    notification('Success', 'Data Has Been Updated', 'success').then((result) => {
      this.props.history.push('/crud-biodata');
    }) :
    notification('Error', 'Data Failed To Update', 'error').then((result) => {
      this.setState({ submitted: false });
    })
  }

  getDataById = async (id) => {
    let reqData = await api.requestApi(`${endpoint.biodata}/${id}`, null, methods.get)
    reqData.status === 200 ? 
    this.setState({
      name: reqData.data.name,
      gender: reqData.data.gender,
      age: reqData.data.age,
      address: reqData.data.address,
    }) :
    notification('Error', 'Failed To Get Data', 'error').then((result) => {})
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.match.params.id && this.getDataById(this.props.match.params.id )
  }

  render() {
    const { classes } = this.props
    return (
      <Provider>
        <Consumer>
          {(context) => (
            <WrapperContainer title={this.props.match.params.id ? context.state.pageTitleFormEdit : context.state.pageTitleFormCreate}>
              <ValidatorForm onSubmit={this.props.match.params.id ? this.handleUpdate : this.handleSubmit}>
                <Grid container spacing={24}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextValidator
                      label="Name"
                      name="name"
                      type="text"
                      className={classes.textField}
                      value={this.state.name}
                      onChange={this.handleChange}
                      variant="outlined"
                      validators={['required']}
                      errorMessages={['this field is required']}
                      disabled={this.state.submitted} />
                  </Grid>

                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextValidator
                      label="Age"
                      name="age"
                      type="number"
                      className={classes.textField}
                      value={this.state.age}
                      onChange={this.handleChange}
                      variant="outlined"
                      validators={['required']}
                      errorMessages={['this field is required']}
                      disabled={this.state.submitted} />
                  </Grid>

                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <FormControl component="fieldset" className={classes.formGender}>
                      <FormLabel component="legend">Gender</FormLabel>
                      <RadioGroup
                        aria-label="Gender"
                        name="gender"
                        value={this.state.gender}
                        onChange={this.handleChange}
                        className={classes.radioPosition}
                        row>
                        <FormControlLabel value="Male" disabled={this.state.submitted} control={<Radio />} label="Male" />
                        <FormControlLabel value="Female" disabled={this.state.submitted} control={<Radio />} label="Female" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextValidator
                      label="Address"
                      name="address"
                      multiline
                      className={classes.textFieldAddress}
                      value={this.state.address}
                      onChange={this.handleChange}
                      variant="outlined"
                      validators={['required']}
                      errorMessages={['this field is required']}
                      disabled={this.state.submitted} />
                  </Grid>

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
    )
  }
}

const styles = () => ({
  textField: {
    width: '100%',
    marginTop: '10px'
  },
  formGender: {
    marginTop: '12px',
  },
  radioPosition: {
    marginTop: '-7px'
  },
  textFieldAddress: {
    width: '100%',
    marginTop: '-5px'
  },
})

export default withStyles(styles)(Form)