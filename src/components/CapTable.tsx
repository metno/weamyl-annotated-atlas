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
import { CapFilEntries, CapFileEntryList } from '../@customTypes/CapFilEntries';

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
  warning: any;
  observations: ObservationEntryList;
};

const ObservationTable: React.FC<Props> = (props) => {
  const { warning, observations } = props;

  console.log('CapTableFake ', observations);
  console.log('CapTableId ', warning);

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
                  {warning[1]}
                </TableCell>
                <TableCell align="right">{row.wind} m/s</TableCell>
                <TableCell align="right">{row.pressure} hPa</TableCell>
                <TableCell align="right">{row.temperature} ℃</TableCell>
                <TableCell align="right">{row.clouds} %</TableCell>
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
