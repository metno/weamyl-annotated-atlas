import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  ObservationEntry,
  ObservationEntryList,
} from '../@customTypes/ObservationEntry';

const styles = {
  table: {
    marginTop: 3,
  },
  tableHead: {
    fontWeight: 'bold',
  },
  tableTime: {
    fontStyle: 'italic',
  },
};

type Props = {
  locationName: string;
  observations: ObservationEntryList;
};

const ObservationTable: React.FC<Props> = ({ locationName, observations }) => {
  return (
    <>
      <Typography variant="h5">Liste over CAP-filer</Typography>
      <TableContainer component={Paper} sx={styles.table}>
        <Table aria-label="CAP-filer">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHead}>ID</TableCell>
              <TableCell sx={styles.tableHead} align="right">
                Phenonenon
              </TableCell>
              <TableCell sx={styles.tableHead} align="right">
                Svereity
              </TableCell>
              <TableCell sx={styles.tableHead} align="right">
                Area
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {observations.map((row: ObservationEntry) => (
              <TableRow key={row.time}>
                <TableCell component="th" scope="row" sx={styles.tableTime}>
                  {row.time}
                </TableCell>
                <TableCell align="right">{row.wind.toFixed(0)} m/s</TableCell>
                <TableCell align="right">
                  {row.pressure.toFixed(0)} hPa
                </TableCell>
                <TableCell align="right">
                  {row.temperature.toFixed(1)} ℃
                </TableCell>
                <TableCell align="right">{row.clouds.toFixed(0)} %</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="caption">
        Tabellen viser ikke ekte observasjoner
      </Typography>
    </>
  );
};

export default ObservationTable;