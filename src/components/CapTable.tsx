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
  warning: CapFileEntryList;
};

const ObservationTable: React.FC<Props> = (props) => {
  const { warning } = props;

  return (
    <>
      <Typography variant="h5">Liste over CAP-filer({warning.length})</Typography>
      <TableContainer component={Paper} sx={styles.table}>
        <Table aria-label="CAP-filer">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHead}>Phenomenon</TableCell>
              <TableCell sx={styles.tableHead} align="right">
                Severity
              </TableCell>
              <TableCell sx={styles.tableHead} align="right">
                Area
              </TableCell>
              <TableCell sx={styles.tableHead} align="right">
                Status
              </TableCell>
              <TableCell sx={styles.tableHead} align="right">
                Duration
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warning.map((item: CapFilEntries) => (
              <TableRow key={item._id} hover>
                <TableCell component="th" scope="row" sx={styles.tableTime}>
                  {item.phenomenon}
                </TableCell>
                <TableCell align="right">{item.colour} </TableCell>
                <TableCell align="right">{item.areaDesc.en} </TableCell>
                <TableCell align="right">{item.status} </TableCell>
                <TableCell align="right">{item.onset} / {item.expires} </TableCell>
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
