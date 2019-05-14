import React from 'react'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';

export default function PembayaranComponents(props) {
  return (
    <div>
      <Paper className={props.propsClasses.paper}>
        <Grid container spacing={24}>
          <Grid item lg={12}>
            <Typography component="div">
              Penerbangan Pergi :
            </Typography>
            <Typography component="div">
              {props.parentProps.detailPenerbangan.nama_maskapai} ({props.parentProps.detailPenerbangan.bandara_keberangkatan_nick} - {props.parentProps.detailPenerbangan.bandara_tujuan_nick})
            </Typography>
            <Typography component="div">
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>Dewasa X{props.parentProps.penumpangDewasa}</td>
                    <td style={{ textAlign: 'right' }}>
                      <NumberFormat value={props.parentProps.hargaPenumpangDewasa} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                    </td>
                  </tr>

                  {props.parentProps.penumpangAnak !== 0 && (
                    <tr>
                      <td>Anak X{props.parentProps.penumpangAnak}</td>
                      <td style={{ textAlign: 'right' }}>
                        <NumberFormat value={props.parentProps.hargaPenumpangAnak} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                      </td>
                    </tr>
                  )}

                  {props.parentProps.penumpangBayi !== 0 && (
                    <tr>
                      <td>Bayi X{props.parentProps.penumpangBayi}</td>
                      <td style={{ textAlign: 'right' }}>
                        <NumberFormat value={props.parentProps.hargaPenumpangBayi} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <hr />
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>Asuransi</td>
                    <td style={{ textAlign: 'right' }}>IDR 0</td>
                  </tr>
                  <tr>
                    <td>Biaya Layanan</td>
                    <td style={{ textAlign: 'right' }}>GRATIS</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>Total Pembayaran</td>
                    <td style={{ textAlign: 'right' }}>
                      <NumberFormat value={props.parentProps.totalDibayarkan} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        className={props.propsClasses.buttonPembayaran}
      >
        Lanjut Ke Pembayaran
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={props.propsClasses.buttonBatalPembayaran}
        onClick={props.batalBooking}
      >
        Batalkan Pembelian Tiket
      </Button>
    </div>
  )
}