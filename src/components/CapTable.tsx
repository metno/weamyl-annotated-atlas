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
import { XMLParser } from 'fast-xml-parser';
import dayjs from "dayjs";

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
  setAttachmentJSON: any;
    setAttachmentXML: any;
  setSavedEvaluationForm: any;
};

const ObservationTable: React.FC<Props> = (props) => {
  const { warning, setPolygonObject, setAttachmentJSON, setAttachmentXML, setSavedEvaluationForm } = props;
  const [open, setOpen] = React.useState(-1);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [warningAttachment, setWarningAttachment] = React.useState('');
  const [modelData, setModelDAta] = React.useState<string[]>([]);

  // Sends selected CAP to be shown in map.
  const onClickTableRow = (item: CapFilEntries) => {
      let currentPolygon = item.features[0].geometry.coordinates as unknown as number[][];
      let currentOnset  = dayjs(item.onset).subtract(72,"hours").format('YYYY-MM-DD HH:mm').toString();
      let currentExpires  = dayjs(item.expires).format('YYYY-MM-DD HH:mm').toString();
      let ncResults: string[] = [];
      let resultList = {};

/* Manipulates the coordinates into correct format */
      let polygonString = currentPolygon.join('');
      let polygonStringWithoutCommas = polygonString.replace(/,/g, ' ');
      let polygonArray = polygonStringWithoutCommas.split(" ").map(parseFloat);
      for (let i = 0; i < polygonArray.length - 1; i += 2) {
          let temp = polygonArray[i];
          polygonArray[i] = polygonArray[i + 1];
          polygonArray[i + 1] = temp;
      }
      let transposedPolygonString = polygonArray.join(" ");

      setPolygonObject(item);

    databaseFunctions
        .getModelData(transposedPolygonString, currentOnset, currentExpires)
        .then((r) => {
            //console.log(r);
          const options = {
            ignoreAttributes: false,
          };
        const parser = new XMLParser(options);
        let jsonObj = parser.parse(r);
        console.log('WHAT TO CHOOSE? ', jsonObj);
        for (let i = 0; i < jsonObj['csw:GetRecordsResponse']['csw:SearchResults']['csw:SummaryRecord'].length; i++) {
          let intermediate =
              jsonObj['csw:GetRecordsResponse']['csw:SearchResults']['csw:SummaryRecord'][i][
              'dct:references'][0]['#text'];
          ncResults.push(intermediate);
        }
        setModelDAta(ncResults);
        })
        .catch(()=> {
            //console.log(e);
            setModelDAta(['Empty dataset']);
        });

      databaseFunctions
          .getEvaluationForm(item._id)
          .then((r) => {
            //console.log('EV: ', r);
            setSavedEvaluationForm(r);
          });

      databaseFunctions
          .getCapAttachmentJSON(item._id)
          .then((r) => {
              console.log('CAPattachJSON ', r);
            setAttachmentJSON(r);
          });

      databaseFunctions
          .getCapAttachmentXML(item._id)
          .then((r) => {
              const options = {
                  ignoreAttributes: false,
              };
              const parser = new XMLParser(options);
              let jsonObj = parser.parse(r);

              resultList = {
                  phenomenon: jsonObj['alert']['info'][1]['event'],
                  colour: (jsonObj['alert']['info'][1]['parameter'][3]['value']).split(";")[1].trim(),
                  area: jsonObj['alert']['info'][1]['area']['areaDesc'],
                  onset: dayjs(jsonObj['alert']['info'][1]['onset']).format('YYYY-MM-DD HH:mm').toString(),
                  expires: dayjs(jsonObj['alert']['info'][1]['expires']).format('YYYY-MM-DD HH:mm').toString(),
              }

              console.log('ResultatListe: ', resultList);
          });
  };

  const onClickCapDialog = (item: CapFilEntries) => {
    setOpenDialog(!openDialog);
    databaseFunctions
        .getCapAttachmentXML(item._id)
        .then((r) => {
          setWarningAttachment(r)
          console.log(r)
        });
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
                Area Description
              </TableCell>
              <TableCell sx={styles.tableHead} align="right">
                Annotated?
              </TableCell>
              <TableCell sx={styles.tableHead} align="right">
                Duration
              </TableCell>
              <TableCell sx={styles.tableHead}>CAP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warning.map((item: CapFilEntries, index) => (
              <>
                <TableRow
                  key={item._id}
                  hover
                  selected={false}
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
                      onClick={() => onClickCapDialog(item)}
                    >
                      <WarningAmberIcon color="warning" />
                    </IconButton>
                    <CapDialog
                      warningAttachment={warningAttachment}
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
                      <Box sx={{ margin: 1 }}>
                          {modelData.map((item) =>
                              <li key={index} value={item} >{item}</li>)}
                      </Box>
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
