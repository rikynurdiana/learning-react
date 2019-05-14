import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isLoading: true
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ marginTop: '65px',}}>
          HOME
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
