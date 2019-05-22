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
    text: 'Name',
    align: 'left',
    style: {}
  },
  {
    id: 3,
    text: 'Gender',
    align: 'left',
    style: {}
  },
  {
    id: 4,
    text: 'Age',
    align: 'left',
    style: {}
  },
  {
    id: 5,
    text: 'Address',
    align: 'left',
    style: {}
  },
  {
    id: 6,
    text: 'Action',
    align: 'center',
    style: {}
  }
]

export class Provider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageTitleIndex: 'Biodata',
      pageTitleFormCreate: 'Form Add New Data',
      pageTitleFormEdit: 'Form Edit Data',
      urlCreate: '/form-create-crud-biodata',
      urlEdit: '/form-edit-crud-biodata',
      urlCancel: '/crud-biodata',
      items: [],
      isLoading: true,
    }
  }

  // start function used in table components
  handleDelete = async (id) => {
    let delData = await api.requestApi(`${endpoint.biodata}/${id}`, null, methods.delete)
    delData.status === 200 ?
    notification('Success', 'Selected Data Has Been Remove', 'success').then((result) => { this.getListData() }) :
    notification('Error', 'Failed To Remove Selected Data', 'error')
  }

  getListData = async () => {
    let reqData = await api.requestApi(endpoint.biodata, null, methods.get)
    reqData.status === 200 ?
    this.setState({ items: reqData.data, isLoading: false }) :
    notification('Error', 'There is an error on request data', 'error')
  }

  componentDidMount() {
    this.getListData();
  }
  // end function used in table components

  render() {
    return (
      <Context.Provider value={{
        state: this.state,
        handleEdit: this.handleEdit,
        handleDelete: this.handleDelete,
        itemHeader: itemHeader,
        handleCancel: this.handleCancel,
        handleChange: this.handleChange
      }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer