import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom'

class ListMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuPublic: [
        {
          id: 1,
          name: 'Home',
          icon: 'home',
          url: '',
          public: true
        },
        // {
        //   id: 2,
        //   name: 'About',
        //   icon: 'person',
        //   url: '/about',
        //   public: true
        // },
        {
          id: 3,
          name: 'Contact',
          icon: 'contact_mail',
          url: '/contact',
          public: true
        },
        // {
        //   id: 4,
        //   name: 'Sample Container',
        //   icon: 'contact_mail',
        //   url: '/sample-container',
        //   public: true
        // },
      ],
      menuPrivate: [
        {
          id: 4,
          name: 'Todo',
          icon: 'note_add',
          url: '/todo',
          public: false
        },
        {
          id: 5,
          name: 'CRUD Gallery',
          icon: 'view_quilt',
          url: '/crud-gallery',
          public: false
        },
        {
          id: 6,
          name: 'Tiket Pesawat',
          icon: 'view_quilt',
          url: '/tiket-pesawat',
          public: false
        },
      ],
      public: false,
    }
  }

  componentDidMount() {
    localStorage.getItem('session') && this.setState({ public: !this.state.public })
  }

  render() {

    return (
      <div style={{ width: '250px'}}>
        <List>
          {this.state.menuPublic.map((mpub, index) => (
            <ListItem button key={mpub.id} component={Link} to={mpub.url}>
              <Icon>{mpub.icon}</Icon>
              <ListItemText primary={mpub.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {this.state.menuPrivate.map((mpriv, index) => (
            this.state.public === true &&
            <ListItem button key={mpriv.id} component={Link} to={mpriv.url}>
              <Icon>{mpriv.icon}</Icon>
              <ListItemText primary={mpriv.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default ListMenu;