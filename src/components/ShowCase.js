import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import "./components.css";

class ShowCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogId: null,
      open: false
    }
  }

  handleClickOpen = (id) => {
    this.setState({
      open: true,
      dialogId: id
    })
  }

  handleClose = (id) => {
    this.setState({
      open: false,
      dialogId: id
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Fade in={true} style={{ transformOrigin: '0 0 0' }}
          {...(true && { timeout: 7000 })}>
          <GridList cellHeight={250} spacing={2} cols={3}>
            {this.props.listData.map(data => {
              return (
                data.status === 'active' &&
                <GridListTile key={data.id}>
                  <img src={data.image} alt={data.title} className="animateImage" />
                  <GridListTileBar
                    title={data.title}
                    subtitle={<span>by: {data.createdBy}</span>}
                    actionIcon={
                      <IconButton className={classes.icon} onClick={() => this.handleClickOpen(data.id)}>
                        <InfoIcon />
                      </IconButton>
                    } />
                </GridListTile>
              )
            })};
          </GridList>
        </Fade>
        {this.props.listData.map(dt => {
          return (
            this.state.dialogId === dt.id &&
            <React.Fragment key={dt.id}>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md"
              >
                <DialogTitle id="form-dialog-title">{dt.title}</DialogTitle>
                <DialogContent>
                  <DialogContentText className={classes.dialogImage}>
                    <LazyLoadImage
                      alt={dt.title}
                      src={dt.image}
                      effect="blur"
                      placeholderSrc="/img/default.jpg"
                      className={classes.imageSize} /><br />
                  </DialogContentText>
                  <Typography className={classes.dialogDesc}>
                    {dt.description}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Close
                </Button>
                </DialogActions>
              </Dialog>  
            </React.Fragment>
          )
        })}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    marginTop: 50,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  imageSize: {
    width: '100%',
    height: '100%'
  },
  dialogImage: {
    textAlign: 'center'
  },
  dialogDesc: {
    textAlign: 'justify',
    fontSize: '16px'
  }
});

ShowCase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowCase);