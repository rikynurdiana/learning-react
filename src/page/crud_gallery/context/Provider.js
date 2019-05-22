import React, { Component } from 'react'
import api from 'api/Api';
import methods from 'api/Methods';
import endpoint from 'api/Endpoint';
import notification from 'components/Notification';
const Context = React.createContext();

const itemHeader = [
  {
    id: 1,
    text: 'No',
    align: 'center',
    style: { width: '50px' }
  },
  {
    id: 2,
    text: 'Image',
    align: 'left',
    style: {}
  },
  {
    id: 3,
    text: 'Title',
    align: 'left',
    style: {}
  },
  {
    id: 4,
    text: 'Create By',
    align: 'left',
    style: {}
  },
  {
    id: 5,
    text: 'Create Date',
    align: 'left',
    style: {}
  },
  {
    id: 6,
    text: 'Status',
    align: 'center',
    style: {}
  },
  {
    id: 7,
    text: 'Action',
    align: 'center',
    style: {}
  }
]

export class Provider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageTitleIndex: 'Gallery',
      pageTitleFormCreate: 'Form Add New Data',
      pageTitleFormEdit: 'Form Edit Data',
      urlCreate: '/form-create-crud-gallery',
      urlEdit: '/form-edit-crud-gallery',
      urlCancel: '/crud-gallery',
      items: [],
      isLoading: true,
    }
  }

  // start function used in table components
  handleDelete = async (id) => {
    let delData = await api.requestApi(`${endpoint.gallery}/${id}`, null, methods.delete)
    delData.status === 200 ?
      notification('Success', 'Selected Data Has Been Remove', 'success').then((result) => { this.getListData() }) :
      notification('Error', 'Failed To Remove Selected Data', 'error')
  }

  getListData = async () => {
    let reqData = await api.requestApi(endpoint.gallery, null, methods.get)
    reqData.status === 200 ?
      this.setState({ items: reqData.data, isLoading: false }) :
      notification('Error', 'There is an error on request data', 'error')
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getListData();
  }
  // end function used in table components
  
  render() {
    return (
      <Context.Provider value={{
        state: this.state,
        itemHeader: itemHeader,
        handleDelete: this.handleDelete,
      }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer