import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import LinearProgress from '@material-ui/core/LinearProgress';
import WrapperContainer from 'components/Container'
import BtnSubmit from 'components/button/BtnSubmit';
import Table from 'components/table'
import Thead from 'components/table/TableHeader'
import Tbody from './components/TableData';
import uuid from 'uuid';

import api from 'api/Api';
import methods from 'api/Methods';
import endpoint from 'api/Endpoint';
import notification from 'components/Notification';

class index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageTitle: 'Todo List',
      isLoading: true,
      title: '',
      items: []
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleDelete = async (id) => {
    this.setState({ isLoading: true })
    let delData = await api.requestApi(`${endpoint.todo}/${id}`, null, methods.delete)
    delData.status === 200 ?
    this.getListData() && this.setState({ isLoading: false }) :
    notification('Error', 'Data Failed To Done', 'error').then((result) => {
      this.setState({ isLoading: false })
    })
  }

  handleDone = async (id) => {
    this.setState({ isLoading: true })
    let reqData = await api.requestApi(`${endpoint.todo}/${id}`, null, methods.get)
    if (reqData.status === 200) {
      let data = {
        title: reqData.data.title,
        status: 'completed',
      }
      let updateData = await api.requestApi(`${endpoint.todo}/${id}`, data, methods.put)
      updateData.status === 200 ?
      this.getListData() && this.setState({ isLoading: false }) :
      notification('Error', 'Data Failed To Proccess', 'error')
    } else {
      notification('Error', 'Data Failed To Done', 'error').then((result) => {
        this.setState({ isLoading: false })
      })
    }
  }

  handleSubmit = async (event) => {
    this.setState({ isLoading: true })
    event.preventDefault();
    let data = {
      id: uuid(),
      title: this.state.title,
      status: ''
    }
    let postData = await api.requestApi(endpoint.todo, data, methods.post)
    postData.status === 201 ?
    this.getListData() && this.setState({ isLoading: false, title: '' }) : 
    notification('Error', 'Data Failed To Done', 'error').then((result) => {
      this.setState({ isLoading: false, title: '' })
    })
  }

  getListData = async () => {
    let reqData = await api.requestApi(endpoint.todo, null, methods.get)
    reqData.status === 200 ?
    this.setState({ items: reqData.data, isLoading: false }) :
    notification('Error', 'There is an error on request data', 'error')
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getListData();
  }

  render() {
    const { classes } = this.props
    return (
      <WrapperContainer title={this.state.pageTitle}>
        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
          <TextValidator
            label="Title"
            name="title"
            type="text"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']} />
          <BtnSubmit handleCreate={this.handleCreate} />
        </ValidatorForm> <br/>
        {this.state.isLoading === true && <LinearProgress style={{margin: '5px 0 5px 0'}} />}
        <Table>
          <Thead items={itemHeader} />
          <Tbody
            items={this.state.items}
            handleDelete={this.handleDelete}
            handleDone={this.handleDone} />
        </Table>
      </WrapperContainer>
    )
  }
}

const itemHeader = [
  {
    id: 1,
    text: 'No',
    align: 'center',
    style: { width: '50px' }
  },
  {
    id: 2,
    text: 'Title',
    align: 'left',
    style: {}
  },
  {
    id: 3,
    text: 'Status',
    align: 'left',
    style: {}
  },
  {
    id: 4,
    text: 'Action',
    align: 'center',
    style: {}
  }
]

const styles = () => ({
  textField: {
    width: '200px',
    margin: '-11px 20px 20px 0',
    float: 'left'
  }
})

export default withStyles(styles)(index)