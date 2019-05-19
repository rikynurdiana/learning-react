import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import BigSlider from '../components/BigSlider';
import ShowCase from '../components/ShowCase';

import api from '../api/Api';
import methods from '../api/Methods';
import endpoint from '../api/Endpoint';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isLoading: true
    }
  }

  async componentWillMount() {
    window.scrollTo(0, 0)
    let reqData = await api.requestApi(endpoint.gallery, '', methods.get);
    reqData.status === 200 ?
      this.setState({ listData: reqData.data, isLoading: false }) :
      this.setState({ listData: [] })
  }

  render() {
    return (
      <div>
        <BigSlider />
        {this.state.isLoading === true ? <LinearProgress style={{ margin: '0 0 0 0' }} /> : ''}
        <ShowCase listData={this.state.listData} />
      </div>
    );
  }
}

export default Home;
