import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Moment from 'moment';
import "moment/locale/id";
import notification from '../../components/Notification';

import ListKepergianComponents from './components/FlightDeparture/ListKepergianComponents';
import FormBookingComponents from './components/FormBooking'
import PembayaranComponents from './components/FormBooking/PembayaranComponents'
import FormSelectFlight from './components/FormSelectFlight'

import api from '../../api/Api';
import methods from '../../api/Methods';
import endpoint from '../../api/Endpoint';

class TiketPesawat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'Pemesanan Tiket Pesawat',
      dari: 'bandung',
      ke: 'jogja',
      pergi: Moment(new Date()),
      pulang: Moment(new Date()).add(1, 'days'),
      penumpangDewasa: 1,
      penumpangAnak: 0,
      penumpangBayi: 0,
      kelas: 'ekonomi',
      dialogPenumpang: false,
      checkedPulang: false,
      disabledPulang: true,
      tab: 0,
      listPesawat: [],
      hargaPenumpangDewasa: 0,
      hargaPenumpangAnak: 0,
      hargaPenumpangBayi: 0,
      totalDibayarkan: 0,
      hiddenListFlight: false,
      displayDetailOrder: false,
      detailPemesanTitle: '',
      detailPemesanNama: '',
      detailPemesanKodeNegara: '',
      detailPemesanTelepon: '',
      detailPemesanEmail: '',
      detailPenumpangDewasaTitle: '',
      detailPenumpangDewasaNama: [],
      detailPenumpangDewasaKewarganegaraan: [],
      detailPenumpangAnakTitle: [],
      detailPenumpangAnakNama: [],
      detailPenumpangAnakKewarganegaraan: [],
      detailPenumpangBayiTitle: [],
      detailPenumpangBayiNama: [],
      detailPenumpangBayiKewarganegaraan: [],
      detailPenerbangan: ''
    }
    Moment.locale("id");
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCheckedPulang = (e) => {
    this.setState({ checkedPulang: e.target.checked })
    e.target.checked === true ? this.setState({ disabledPulang: false }) : this.setState({ disabledPulang: true })
  }

  handleClickDialog = () => {
    this.setState({ 'dialogPenumpang': !this.state.dialogPenumpang})
  }

  handleChangeTab = (event, newValue) => {
    this.setState({ 'tab': newValue })
  }

  handleDateChangePergi = date => {
    this.setState({ pergi: date, pulang: Moment(date).add(1, 'days') });
  }
  handleDateChangePulang = date => {
    this.setState({ pulang: date });
  }

  handleAddPenumpangDewasa = () => {
    this.setState({ "penumpangDewasa": this.state.penumpangDewasa + 1 })
  }
  handleReducePenumpangDewasa = () => {
    this.state.penumpangDewasa > 1 &&
    this.setState({ "penumpangDewasa": this.state.penumpangDewasa - 1 })
  }

  handleAddPenumpangAnak = () => {
    this.setState({ "penumpangAnak": this.state.penumpangAnak + 1 })
  }
  handleReducePenumpangAnak = () => {
    this.state.penumpangAnak > 0 &&
    this.setState({ "penumpangAnak": this.state.penumpangAnak - 1 })
  }

  handleAddPenumpangBayi = () => {
    this.setState({ "penumpangBayi": this.state.penumpangBayi + 1 })
  }
  handleReducePenumpangBayi = () => {
    this.state.penumpangBayi > 0 &&
    this.setState({ "penumpangBayi": this.state.penumpangBayi - 1 })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let reqPesawat = await api.requestApi(endpoint.tiketPesawat +'?tanggal_keberangkatan='+Moment(this.state.pergi).format('YYYY-MM-DD'), '', methods.get);
    if (reqPesawat.status === 200) {
      if (reqPesawat.data.length !== 0) {
        this.setState({ listPesawat: reqPesawat.data })
      } else {
        notification('Error', 'Maaf data pesawat belum lengkap, silahkan pilih di tanggal 1 Juni 2019', 'error')
      }
    } else {
      notification('Error', 'Maaf Terjadi Kesalahan', 'error')
    }
  }

  handleSelectFlight = async (param) => {
    let selectFlight = await api.requestApi(endpoint.tiketPesawat+'/'+param, '', methods.get);
    if (selectFlight.status === 200) {
      this.setState({
        hiddenListFlight: true,
        displayDetailOrder: true,
        dari: this.state.dari,
        ke: this.state.ke,
        pergi: Moment(this.state.pergi).format('YYYY-MM-DD'),
        pulang: Moment(this.state.pulang).format('YYYY-MM-DD'),
        penumpangDewasa: this.state.penumpangDewasa,
        penumpangAnak: this.state.penumpangAnak,
        penumpangBayi: this.state.penumpangBayi,
        kelas: this.state.kelas,
        hargaPenumpangDewasa: this.state.penumpangDewasa * selectFlight.data.hargaDewasa,
        hargaPenumpangAnak: this.state.penumpangAnak * selectFlight.data.hargaAnak,
        hargaPenumpangBayi: this.state.penumpangBayi * selectFlight.data.hargaBayi,
        totalDibayarkan: (this.state.penumpangDewasa * selectFlight.data.hargaDewasa) + (this.state.penumpangAnak * selectFlight.data.hargaAnak) + (this.state.penumpangBayi * selectFlight.data.hargaBayi),
        detailPenerbangan: selectFlight.data
      })
    }
  }

  batalBooking = () => {
    notification('Success', 'Batal Melakukan Booking Tiket !', 'success')
    this.setState({
      dari: 'bandung',
      ke: 'jogja',
      pergi: Moment(new Date()),
      pulang: Moment(new Date()).add(1, 'days'),
      penumpangDewasa: 1,
      penumpangAnak: 0,
      penumpangBayi: 0,
      kelas: 'ekonomi',
      dialogPenumpang: false,
      checkedPulang: false,
      disabledPulang: true,
      tab: 0,
      listPesawat: [],
      hargaPenumpangDewasa: 0,
      hargaPenumpangAnak: 0,
      hargaPenumpangBayi: 0,
      totalDibayarkan: 0,
      hiddenListFlight: false,
      displayDetailOrder: false,
      detailPemesanTitle: '',
      detailPemesanNama: '',
      detailPemesanKodeNegara: '',
      detailPemesanTelepon: '',
      detailPemesanEmail: '',
      detailPenumpangDewasaTitle: '',
      detailPenumpangDewasaNama: [],
      detailPenumpangDewasaKewarganegaraan: [],
      detailPenumpangAnakTitle: [],
      detailPenumpangAnakNama: [],
      detailPenumpangAnakKewarganegaraan: [],
      detailPenumpangBayiTitle: [],
      detailPenumpangBayiNama: [],
      detailPenumpangBayiKewarganegaraan: [],
      detailPenerbangan: ''
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.layout}>
        <CssBaseline />
        <Typography className={classes.title}>
          {this.state.pageTitle}
        </Typography>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item lg={12} style={this.state.hiddenListFlight === true ? { display: 'none' } : { display: 'block' }}>
              <FormSelectFlight
                propsClasses={classes}
                parentProps={this.state}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                handleDateChangePergi={this.handleDateChangePergi}
                handleDateChangePulang={this.handleDateChangePulang}
                handleCheckedPulang={this.handleCheckedPulang}
                handleClickDialog={this.handleClickDialog}
                handleAddPenumpangDewasa={this.handleAddPenumpangDewasa}
                handleAddPenumpangAnak={this.handleAddPenumpangAnak}
                handleAddPenumpangBayi={this.handleAddPenumpangBayi}
                handleReducePenumpangDewasa={this.handleReducePenumpangDewasa}
                handleReducePenumpangAnak={this.handleReducePenumpangAnak}
                handleReducePenumpangBayi={this.handleReducePenumpangBayi}
              />
            </Grid>

            <Grid item lg={12} style={this.state.hiddenListFlight === true ? {display: 'none'} : {display: 'block'}}>
              {this.state.listPesawat.length !== 0 && (
                <ListKepergianComponents
                  parentProps={this.state}
                  dataPesawat={this.state.listPesawat}
                  handleSelectFlight={this.handleSelectFlight}
                  handleChangeTab={this.handleChangeTab}
                />
              )}
            </Grid>

            <Grid item lg={8} style={this.state.displayDetailOrder === true ? { display: 'block' } : { display: 'none' }}>
              <FormBookingComponents
                propsClasses={classes}
                parentProps={this.state}
                handleChange={this.handleChange}
              />
            </Grid>

            <Grid item lg={4} style={this.state.displayDetailOrder === true ? { display: 'block' } : { display: 'none' }}>
              <PembayaranComponents 
                propsClasses={classes}
                parentProps={this.state}
                batalBooking={this.batalBooking}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  grid: {
    width: '60%',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  layout: {
    width: 'auto',
    marginTop: '80px',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#a7a4a4',
    margin: '10px 0 10px 0'
  },
  textField: {
    width: '100%',
    marginTop: '10px'
  },
  textPilihPenumpang: {
    width: '20px',
    textAlign: 'center !important',
    padding: '0 0 0 10px'
  },
  titlePilihPenumpang: {
    textAlign: 'center'
  },
  layoutPilihPenumpang: {
    textAlign: 'center'
  },
  buttonCariPenerbangan: {
    textAlign: 'right',
    margin: '20px 0 0 0'
  },
  buttonPembayaran: {
    width: '100%',
    margin: '20px 0 0 0'
  },
  buttonBatalPembayaran: {
    width: '100%',
    margin: '20px 0 0 0'
  }
});

TiketPesawat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TiketPesawat);