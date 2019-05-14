import React from 'react'
import DepartureComponents from './DepartureComponents';
import ArrivalComponents from './ArrivalComponents';
import PergiComponents from './PergiComponents';
import PulangComponents from './PulangComponents';
import PassangerComponents from './PassangerComponents';
import CabinClassComponents from './CabinClassComponents';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function FormSelectFlight(props) {
  return (
    <Paper className={props.propsClasses.paper}>
      <form className={props.propsClasses.root} autoComplete="off" onSubmit={props.handleSubmit}>
        <Grid container spacing={24}>
          <Grid item lg={6}>
            <DepartureComponents
              classes={props.propsClasses}
              propsDari={props.parentProps.dari}
              propsOnChange={props.handleChange}
            />
          </Grid>

          <Grid item lg={6}>
            <ArrivalComponents
              classes={props.propsClasses}
              propsKe={props.parentProps.ke}
              propsOnChange={props.handleChange}
            />
          </Grid>

          <Grid item lg={3}>
            <PergiComponents
              propsPergi={props.parentProps.pergi}
              propsOnChange={props.handleDateChangePergi}
            />
          </Grid>

          <Grid item lg={3}>
            <PulangComponents
              propsPulang={props.parentProps.pulang}
              propsOnChange={props.handleDateChangePulang}
              propsCheckedPulang={props.parentProps.checkedPulang}
              handleCheckedPulang={props.handleCheckedPulang}
              disabledPulang={props.parentProps.disabledPulang}
            />
          </Grid>

          <Grid item lg={3}>
            <PassangerComponents
              classes={props.propsClasses}
              propsPenumpangDewasa={props.parentProps.penumpangDewasa}
              propsPenumpangAnak={props.parentProps.penumpangAnak}
              propsPenumpangBayi={props.parentProps.penumpangBayi}
              propsDialog={props.parentProps.dialogPenumpang}
              propsHandleClickDialog={props.handleClickDialog}
              addPenumpangDewasa={props.handleAddPenumpangDewasa}
              addPenumpangAnak={props.handleAddPenumpangAnak}
              addPenumpangBayi={props.handleAddPenumpangBayi}
              reducePenumpangDewasa={props.handleReducePenumpangDewasa}
              reducePenumpangAnak={props.handleReducePenumpangAnak}
              reducePenumpangBayi={props.handleReducePenumpangBayi}
            />
          </Grid>

          <Grid item lg={3}>
            <CabinClassComponents
              classes={props.propsClasses}
              propsKelas={props.parentProps.kelas}
              propsOnChange={props.handleChange}
            />
          </Grid>
        </Grid>

        <Grid item lg={12} className={props.propsClasses.buttonCariPenerbangan}>
          <Button
            variant="contained"
            color="primary"
            className={props.propsClasses.button}
            type="submit"
          >
            Cari Penerbangan
          </Button>
        </Grid>
      </form>
    </Paper>
  )
}
