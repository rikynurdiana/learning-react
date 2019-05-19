import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import WrapperContainer from 'components/Container'
import Table from 'components/table'
import Thead from 'components/table/TableHeader'
import Tbody from './components/TableData';
import BtnCreate from 'components/button/BtnCreate';

import api from 'api/Api';
import methods from 'api/Methods';
import endpoint from 'api/Endpoint';
import notification from 'components/Notification';

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageTitle: 'Biodata',
      isLoading: true,
      items: []
    }
  }

  handleCreate = () => {
    this.props.history.push('/form-create-crud-biodata')
  }

  handleEdit = (id) => {
    this.props.history.push(`/form-edit-crud-biodata/${id}`)
  }

  handleDelete = async (id) => {
    let delData = await api.requestApi(`${endpoint.biodata}/${id}`, null, methods.delete)
    delData.status === 200 ?
    notification('Success', 'Selected Data Has Been Remove', 'success').then((result) => {this.getListData()}) :
    notification('Error', 'Failed To Remove Selected Data', 'error')
  }

  getListData = async () => {
    let reqData = await api.requestApi(endpoint.biodata, null, methods.get)
    reqData.status === 200 ?
    this.setState({ items: reqData.data, isLoading: false }) :
    notification('Error', 'There is an error on request data', 'error')
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getListData();
  }
  
  render() {
    return (
      <WrapperContainer title={this.state.pageTitle}>
        <BtnCreate handleCreate={this.handleCreate} />
        {this.state.isLoading === true && <LinearProgress />}
        <Table>
          <Thead items={itemHeader} />
          <Tbody
            items={this.state.items} 
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit} />
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
