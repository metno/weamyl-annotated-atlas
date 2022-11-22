import React from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { CapFilEntries, CapFileEntryList } from '../@customTypes/CapFilEntries';
import databaseFunctions from '../utils/databaseFunctions';
import CapDialog from './CapDialog';

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
  setPolygonObject: any;
};

const ObservationTable: React.FC<Props> = (props) => {
  const { warning, setPolygonObject } = props;
  const [open, setOpen] = React.useState(-1);
  const [openDialog, setOpenDialog] = React.useState(false);
  const tempLink =
    'https://thredds.met.no/thredds/fileServer/remotesensingsatellite/polar-swath/2022/09/21/noaa20-viirs-mband-20220921054420-20220921055251.nc';

  // Sends selected CAP to be shown in map.
  const onClickTableRow = (item: CapFilEntries) => {
    setPolygonObject(item);
    console.log('WHAT DID I CLICK ', item._id);
    databaseFunctions.getModelData().then((r) => console.log('SENDA? ', r));
  };

  return (
    <>
      <Typography variant="h5">Results ({warning.length})</Typography>
      <TableContainer component={Paper} sx={styles.table}>
        <Table aria-label="CAP-filer">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHead} />
              <TableCell sx={styles.tableHead}>Phenomenon</TableCell>
              <TableCell sx={styles.tableHead} align="right">
                Colour
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
              <TableCell sx={styles.tableHead} />
            </TableRow>
          </TableHead>
          <TableBody>
            {warning.map((item: CapFilEntries, index) => (
              <>
                <TableRow
                  key={item._id}
                  hover
                  onClick={() => onClickTableRow(item)}
                >
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(open === index ? -1 : index)}
                    >
                      {open === index ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row" sx={styles.tableTime}>
                    {item.phenomenon}
                  </TableCell>
                  <TableCell align="right">{item.colour} </TableCell>
                  <TableCell align="right">{item.areaDesc.en} </TableCell>
                  <TableCell align="right">{item.status} </TableCell>
                  <TableCell align="right">
                    {item.onset} / {item.expires}{' '}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpenDialog(!openDialog)}
                    >
                      <WarningAmberIcon color="warning" />
                    </IconButton>
                    <CapDialog
                      openDialog={openDialog}
                      setOpenDialog={setOpenDialog}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={open === index} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>{tempLink}</Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="caption">
        The table shows a list of CAP files for given search parameters
      </Typography>
    </>
  );
};

export default ObservationTable;
