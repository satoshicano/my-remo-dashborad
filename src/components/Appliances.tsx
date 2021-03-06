import React, { useState, useEffect } from 'react'
import { useStyles } from "../styles/Appliances";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ControllCell } from "./ControllCell";
import { getRemoAppliances } from '../lib/Remo';
import { IAppliance } from 'nature-remo';
import { useNavigate } from 'react-router-dom';

function useRemo() {
  let navigate = useNavigate();
  const [appliances, setAppliances] = useState<IAppliance[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setIsLoading(true);
        const data = await getRemoAppliances();
        setAppliances(data);
        setIsLoading(false);
      } catch (error) {
        navigate('/settings', { replace: true })
      }
    }
    fetchDevices();
  }, [navigate]);
  return [{ appliances, isLoading }]
}

type Props = {
  isAuthorized: boolean
}
export function Appliances(props: Props) {
  const [{ appliances, isLoading }] = useRemo();
  const classes = useStyles();

  return <Grid item xs={12}>
    <Paper className={classes.paper}>
      {isLoading ? <CircularProgress /> : <>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Recent Orders
      </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NickName</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Controll</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appliances.map((appliance) => (
              <TableRow key={appliance.id}>
                <TableCell>{appliance.id}</TableCell>
                <TableCell>
                  {/* <Link href={`/appliances/${appliance.id}`}>{appliance.nickname}</Link> */}
                  {appliance.nickname}
                </TableCell>
                <TableCell>{appliance.type}</TableCell>
                <TableCell><ControllCell appliance={appliance} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table></>}
    </Paper>
  </Grid>
}