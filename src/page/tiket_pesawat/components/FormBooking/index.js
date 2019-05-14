import React from 'react'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Moment from 'moment';
import "moment/locale/id";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

export default function FormBooking(props) {
  const formPenumpangDewasa = []
  for (let index = 1; index <= props.parentProps.penumpangDewasa; index++) {
    formPenumpangDewasa.push(
      <Paper className={props.propsClasses.paper} style={{ margin: '20px 0 50px 0' }} key={index}>
        <Grid container spacing={24}>
          <Grid item lg={12}>
            <Typography component="div" style={{ fontSize: '18px' }}>
              Penumpang {index}: Dewasa
              </Typography>
          </Grid>
          <Grid item lg={2}>
            <FormControl className={props.propsClasses.textField}>
              <InputLabel htmlFor="titel">Titel</InputLabel>
              <Select
                value={props.parentProps.detailPenumpangDewasaTitle}
                onChange={props.handleChange}
                inputProps={{ name: 'detailPenumpangDewasaTitle', id: 'titel' }}
              >
                <MenuItem value="tuan">Tuan</MenuItem>
                <MenuItem value="nyonya">Nyonya</MenuItem>
                <MenuItem value="nona">Nona</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={10}>
            <TextField
              label="Nama"
              className={props.propsClasses.textField}
              name="detailPenumpangNamaDewasa[]"
              value={props.parentProps.detailPenumpangNama}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              label="Kewarganegaraan"
              className={props.propsClasses.textField}
              name="detailPenumpangDewasaKewarganegaraan[]"
              value={props.parentProps.detailPenumpangKewarganegaraan}
              onChange={props.handleChange}
            />
          </Grid>
        </Grid>
      </Paper>
    )
  }

  const formPenumpangAnak = []
  for (let index = 1; index <= props.parentProps.penumpangAnak; index++) {
    formPenumpangAnak.push(
      <Paper className={props.propsClasses.paper} style={{ margin: '20px 0 50px 0' }} key={index}>
        <Grid container spacing={24}>
          <Grid item lg={12}>
            <Typography component="div" style={{ fontSize: '18px' }}>
              Penumpang {index}: Anak
              </Typography>
          </Grid>
          <Grid item lg={2}>
            <FormControl className={props.propsClasses.textField}>
              <InputLabel htmlFor="titel">Titel</InputLabel>
              <Select
                value={props.parentProps.detailPenumpangAnakTitle}
                onChange={props.handleChange}
                inputProps={{ name: 'detailPenumpangAnakTitle', id: 'titel' }}
              >
                <MenuItem value="tuan">Tuan</MenuItem>
                <MenuItem value="nyonya">Nyonya</MenuItem>
                <MenuItem value="nona">Nona</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={10}>
            <TextField
              label="Nama"
              className={props.propsClasses.textField}
              name="detailPenumpangNamaDewasa[]"
              value={props.parentProps.detailPenumpangNama}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              label="Kewarganegaraan"
              className={props.propsClasses.textField}
              name="detailPenumpangDewasaKewarganegaraan[]"
              value={props.parentProps.detailPenumpangKewarganegaraan}
              onChange={props.handleChange}
            />
          </Grid>
        </Grid>
      </Paper>
    )
  }

  const formPenumpangBayi = []
  for (let index = 1; index <= props.parentProps.penumpangBayi; index++) {
    formPenumpangBayi.push(
      <Paper className={props.propsClasses.paper} style={{ margin: '20px 0 50px 0' }} key={index}>
        <Grid container spacing={24}>
          <Grid item lg={12}>
            <Typography component="div" style={{ fontSize: '18px' }}>
              Penumpang {index}: Bayi
              </Typography>
          </Grid>
          <Grid item lg={2}>
            <FormControl className={props.propsClasses.textField}>
              <InputLabel htmlFor="titel">Titel</InputLabel>
              <Select
                value={props.parentProps.detailPenumpangBayiTitle}
                onChange={props.handleChange}
                inputProps={{ name: 'detailPenumpangBayiTitle', id: 'titel' }}
              >
                <MenuItem value="tuan">Tuan</MenuItem>
                <MenuItem value="nyonya">Nyonya</MenuItem>
                <MenuItem value="nona">Nona</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={10}>
            <TextField
              label="Nama"
              className={props.propsClasses.textField}
              name="detailPenumpangNamaDewasa[]"
              value={props.parentProps.detailPenumpangNama}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              label="Kewarganegaraan"
              className={props.propsClasses.textField}
              name="detailPenumpangDewasaKewarganegaraan[]"
              value={props.parentProps.detailPenumpangKewarganegaraan}
              onChange={props.handleChange}
            />
          </Grid>
        </Grid>
      </Paper>
    )
  }

  return (
    <div>
      <Paper className={props.propsClasses.paper}>
        <Grid container spacing={24}>
          <Grid item lg={12}>
            <Typography component="div">
              {props.parentProps.detailPenerbangan.bandara_keberangkatan} ({props.parentProps.detailPenerbangan.bandara_keberangkatan_nick}) -> {props.parentProps.detailPenerbangan.bandara_tujuan} ({props.parentProps.detailPenerbangan.bandara_tujuan_nick})
            </Typography>
            <hr />
          </Grid>

          <Grid item lg={4}>
            <Typography component="div">
              Maskapai
            </Typography>
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src={props.parentProps.detailPenerbangan.logo_maskapai} alt="logo maskapai" width="40px" />
                  </td>
                  <td>
                    <Typography>
                      {props.parentProps.detailPenerbangan.nama_maskapai}
                    </Typography>
                    <Typography>
                      ({props.parentProps.detailPenerbangan.nomor_penerbangan}) {props.parentProps.detailPenerbangan.kelas}
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>

          <Grid item lg={4}>
            <Typography component="div">
              Jadwal Penerbangan
            </Typography>
            <Typography component="div">
              {Moment(props.parentProps.detailPenerbangan.tanggal_keberangkatan).format('ll')}
            </Typography>
            <Typography component="div">
              {props.parentProps.detailPenerbangan.jam_keberangkatan} - {props.parentProps.detailPenerbangan.jam_ketibaan}
            </Typography>
          </Grid>

          <Grid item lg={4}>
            <Typography component="div">
              Durasi
            </Typography>
            <Typography component="div">
              {props.parentProps.detailPenerbangan.durasi_terbang}
            </Typography>
            <Typography component="div">
              {props.parentProps.detailPenerbangan.transit}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography className={props.propsClasses.title}>
        Detail Pemesan
      </Typography>
      <Paper className={props.propsClasses.paper} style={{ margin: '20px 0 50px 0' }}>
        <Grid container spacing={24}>
          <Grid item lg={2}>
            <FormControl className={props.propsClasses.textField}>
              <InputLabel htmlFor="titel">Titel</InputLabel>
              <Select
                value={props.parentProps.detailPemesanTitle}
                onChange={props.handleChange}
                inputProps={{ name: 'detailPemesanTitle', id: 'titel' }}
              >
                <MenuItem value="tuan">Tuan</MenuItem>
                <MenuItem value="nyonya">Nyonya</MenuItem>
                <MenuItem value="nona">Nona</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={10}>
            <TextField
              label="Nama Lengkap"
              className={props.propsClasses.textField}
              name="detailPemesanNama"
              value={props.parentProps.detailPemesanNama}
              onChange={props.handleChange}
            />
          </Grid>

          <Grid item lg={2}>
            <TextField
              label="Kode negara"
              className={props.propsClasses.textField}
              name="detailPemesanKodeNegara"
              value={props.parentProps.detailPemesanKodeNegara}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item lg={10}>
            <TextField
              label="Nomor Telepon"
              className={props.propsClasses.textField}
              name="detailPemesanTelepon"
              value={props.parentProps.detailPemesanTelepon}
              onChange={props.handleChange}
            />
          </Grid>

          <Grid item lg={12}>
            <TextField
              label="Alamat Email"
              className={props.propsClasses.textField}
              name="detailPemesanEmail"
              value={props.parentProps.detailPemesanEmail}
              onChange={props.handleChange}
            />
          </Grid>
        </Grid>
      </Paper>

      <Typography className={props.propsClasses.title}>
        Detail Penumpang
      </Typography>
      <div>
        {formPenumpangDewasa}
        {formPenumpangAnak}
        {formPenumpangBayi}
      </div>
    </div>
  )
}
