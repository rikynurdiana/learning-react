import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import deepOrange from '@material-ui/core/colors/deepOrange';
import blue from '@material-ui/core/colors/blue';
import NumberFormat from 'react-number-format';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Moment from 'moment';
import "moment/locale/id";

export default function ListKepergianComponents(props) {
  return (
    <React.Fragment>
      {props.dataPesawat.map((flight, index) => (
        <ExpansionPanel key={index} style={{ margin: '0 0 20px 0' }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={24}>
              <Grid item lg={1}>
                <img
                  style={{ margin: '7px 0 0 15px', width: '40px' }}
                  src={flight.logo_maskapai} alt="logo maskapai"
                />
              </Grid>

              <Grid item lg={4}>
                <Typography style={{ fontWeight: 'bold', fontSize: '16px', margin: '0 0 10px 0' }}>
                  {flight.nama_maskapai}
                </Typography>
                <Typography style={{ fontSize: '16px' }}>
                  ({flight.bandara_keberangkatan_nick}) {flight.jam_keberangkatan} => ({flight.bandara_tujuan_nick}) {flight.jam_ketibaan}
                </Typography>
              </Grid>

              <Grid item lg={1}>
                <Typography style={{ fontSize: '16px', margin: '4px 0 3px 0' }}>
                  {flight.durasi_terbang}
                </Typography>
                <Typography style={{ fontSize: '15px' }}>
                  {flight.transit}
                </Typography>
              </Grid>

              <Grid item lg={3}>
                <Typography style={{ fontSize: '26px', margin: '10px 0 0 0', color: deepOrange[400], textAlign: 'right' }}>
                  <NumberFormat value={flight.harga} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                </Typography>
              </Grid>

              <Grid item lg={3}>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.handleSelectFlight(flight.id)}
                    style={{ margin: '10px 0 0 0', width: '100%', backgroundColor: deepOrange[400] }}
                  >
                    Pilih Penerbangan
                  </Button>
                </div>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Tabs
              name="tab"
              value={props.parentProps.tab}
              onChange={props.handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Detail Penerbangan" />
              <Tab label="Detail Harga" />
            </Tabs>
          </ExpansionPanelDetails>
          {props.parentProps.tab === 0 &&
            <Typography component="div" style={{ padding: 8 * 3 }}>
              <Grid container spacing={24}>
                <Grid item lg={1}>
                  <img src={flight.logo_maskapai} alt="logo maskapai" />
                </Grid>

                <Grid item lg={6}>
                  <Typography style={{ fontWeight: 'bold', fontSize: '16px', margin: '0 0 0 0' }}>
                    {flight.nama_maskapai}
                  </Typography>
                  <Typography style={{ margin: '0 0 10px 0' }}>
                    {flight.kelas} • {flight.nomor_penerbangan}
                  </Typography>

                  <Typography style={{ fontSize: '16px' }}>
                    <span style={{ fontWeight: 'bold' }}>{flight.jam_keberangkatan}</span> - {flight.bandara_keberangkatan} ({flight.bandara_keberangkatan_nick})
                  </Typography>
                  <Typography style={{ fontSize: '14px', fontWeight: 'bold', color: blue[900] }}>
                    {Moment(flight.tanggal_keberangkatan).format('LL')}
                  </Typography>

                  <Typography style={{ margin: '15px 0 15px 0' }}>
                    {flight.durasi_terbang}
                  </Typography>

                  <Typography style={{ fontSize: '16px' }}>
                    <span style={{ fontWeight: 'bold' }}>{flight.jam_ketibaan}</span> - {flight.bandara_tujuan} ({flight.bandara_tujuan_nick})
                  </Typography>
                  <Typography style={{ fontSize: '14px', fontWeight: 'bold', color: blue[900] }}>
                    {Moment(flight.tanggal_ketibaan).format('LL')}
                  </Typography>
                </Grid>
              </Grid>
            </Typography>}
          {props.parentProps.tab === 1 &&
            <Typography component="div" style={{ padding: 8 * 3 }}>
              <Grid container spacing={24}>
                <Grid item lg={12}>
                  <table style={{ width: '100%' }}>
                    <tbody>
                      <tr>
                        <td>Dewasa X{props.parentProps.penumpangDewasa}</td>
                        <td style={{ textAlign: 'right' }}>
                          <NumberFormat value={props.parentProps.penumpangDewasa * flight.hargaDewasa} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                        </td>
                      </tr>
                      {props.parentProps.penumpangAnak > 0 && (
                        <tr>
                          <td>Anak X{props.parentProps.penumpangAnak}</td>
                          <td style={{ textAlign: 'right' }}>
                            <NumberFormat value={props.parentProps.penumpangAnak * flight.hargaAnak} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                          </td>
                        </tr>
                      )}
                      {props.parentProps.penumpangBayi > 0 && (
                        <tr>
                          <td>Bayi X{props.parentProps.penumpangBayi}</td>
                          <td style={{ textAlign: 'right' }}>
                            <NumberFormat value={props.parentProps.penumpangBayi * flight.hargaBayi} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td>Biaya Layanan</td>
                        <td style={{ textAlign: 'right' }}><span style={{ color: blue[900], fontWeight: 'bold' }}>GRATIS</span></td>
                      </tr>
                      <tr>
                        <td>Pajak</td>
                        <td style={{ textAlign: 'right' }}><span style={{ color: blue[900], fontWeight: 'bold' }}>Termasuk</span></td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
                <Grid item lg={6} style={{ textAlign: 'left', borderTop: '1px solid #dddddd' }}>
                  Total Pembayaran
                </Grid>
                <Grid item lg={6} style={{ textAlign: 'right', borderTop: '1px solid #dddddd', fontSize: '26px', color: deepOrange[400] }}>
                  <NumberFormat value={(props.parentProps.penumpangDewasa * flight.hargaDewasa) + (props.parentProps.penumpangAnak * flight.hargaAnak) + (props.parentProps.penumpangBayi * flight.hargaBayi)} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                </Grid>
              </Grid>
            </Typography>}
        </ExpansionPanel>
      ))}
    </React.Fragment>
  )
}
