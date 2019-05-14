import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function PassangerComponents(props) {
  return (
    <React.Fragment>
      <TextField
        label="Penumpang"
        className={props.classes.textField}
        name="penumpang"
        value={`${props.propsPenumpangDewasa + ' Dewasa'} ${props.propsPenumpangAnak === 0 ? '' : props.propsPenumpangAnak + ' Anak'} ${props.propsPenumpangBayi === 0 ? '' : props.propsPenumpangBayi + ' Bayi'}`}
        InputProps={{ readOnly: true }}
        onClick={props.propsHandleClickDialog}
      />

      <Dialog
        open={props.propsDialog}
        onClose={props.propsHandleClickDialog}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Penumpang</DialogTitle>
        <DialogContent>
          <Grid container spacing={24}>
            <Grid item lg={4}>
              <Typography className={props.classes.titlePilihPenumpang}>
                Dewasa
              </Typography>
              <div className={props.classes.layoutPilihPenumpang}>
                <Button color="primary" onClick={props.addPenumpangDewasa}>
                  +
                </Button>
                <br />
                <InputBase
                  name="penumpangDewasa"
                  value={props.propsPenumpangDewasa}
                  className={props.classes.textPilihPenumpang}
                />
                <br />
                <Button color="primary" onClick={props.reducePenumpangDewasa}>
                  -
                </Button>
              </div>

            </Grid>
            <Grid item lg={4}>
              <Typography className={props.classes.titlePilihPenumpang}>
                Anak Anak
              </Typography>
              <div className={props.classes.layoutPilihPenumpang}>
                <Button color="primary" onClick={props.addPenumpangAnak}>
                  +
                </Button>
                <br />
                <InputBase
                  name="penumpangAnak"
                  value={props.propsPenumpangAnak}
                  className={props.classes.textPilihPenumpang}
                />
                <br />
                <Button color="primary" onClick={props.reducePenumpangAnak}>
                  -
                </Button>
              </div>
            </Grid>
            <Grid item lg={4}>
              <Typography className={props.classes.titlePilihPenumpang}>
                Bayi
              </Typography>
              <div className={props.classes.layoutPilihPenumpang}>
                <Button color="primary" onClick={props.addPenumpangBayi}>
                  +
                </Button>
                <br />
                <InputBase
                  name="penumpangBayi"
                  value={props.propsPenumpangBayi}
                  className={props.classes.textPilihPenumpang}
                />
                <br />
                <Button color="primary" onClick={props.reducePenumpangBayi}>
                  -
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={props.propsHandleClickDialog} color="primary">
            Selesai
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
