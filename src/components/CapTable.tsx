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
            {warning.map((item: CapFilEntries) => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row" sx={styles.tableTime}>
                  {item._id}
                </TableCell>
                <TableCell align="right">{item.phenomenon} </TableCell>
                <TableCell align="right">{item.colour} </TableCell>
                <TableCell align="right">{item.areaDesc.en} </TableCell>
                <TableCell align="right">{item.status} </TableCell>
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
