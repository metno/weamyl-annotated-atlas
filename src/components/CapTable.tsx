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
import Checkbox from '@mui/material/Checkbox';
import { CapFilEntries, CapFileEntryList } from '../@customTypes/CapFilEntries';
import databaseFunctions from '../utils/databaseFunctions';
import CapDialog from './CapDialog';
import { XMLParser } from 'fast-xml-parser';
import dayjs from 'dayjs';
import { tr } from 'date-fns/locale';
import { CheckBox } from '@mui/icons-material';

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
  setAttachmentXML: any;
  setSavedEvaluationForm: any;
};

const ObservationTable: React.FC<Props> = (props) => {
  const {
    warning,
    setPolygonObject,
    setAttachmentXML,
    setSavedEvaluationForm,
  } = props;
  console.log(warning)
  const [open, setOpen] = React.useState(-1);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [warningAttachment, setWarningAttachment] = React.useState('');
  const [modelData, setModelDAta] = React.useState<string[]>([]);
  const [checkmark, setCheckmark] = React.useState<boolean>(true);

  /* Sends selected CAP to be shown in map. */
  const onClickTableRow = (item: CapFilEntries) => {
    let currentPolygon = item.features[0].geometry
      .coordinates as unknown as number[][];
    let currentOnset = dayjs(item.onset)
      .subtract(72, 'hours')
      .format('YYYY-MM-DD HH:mm')
      .toString();
    let currentExpires = dayjs(item.expires)
      .format('YYYY-MM-DD HH:mm')
      .toString();
    let ncResults: string[] = [];
    let resultList = {};

    /* Manipulates the coordinates into correct format */
    let polygonString = currentPolygon.join('');
    let polygonStringWithoutCommas = polygonString.replace(/,/g, ' ');
    let polygonArray = polygonStringWithoutCommas.split(' ').map(parseFloat);
    for (let i = 0; i < polygonArray.length - 1; i += 2) {
      let temp = polygonArray[i];
      polygonArray[i] = polygonArray[i + 1];
      polygonArray[i + 1] = temp;
    }
    let transposedPolygonString = polygonArray.join(' ');

    setPolygonObject(item);

    databaseFunctions
      .getModelData(transposedPolygonString, currentOnset, currentExpires)
      .then((r) => {
        const options = {
          ignoreAttributes: false,
        };
        const parser = new XMLParser(options);

        let jsonObj = parser.parse(r);

        const summaryRecords =
          jsonObj['csw:GetRecordsResponse']['csw:SearchResults'][
            'csw:SummaryRecord'
          ][0]['dct:references'];
        //console.log('summary: ', summaryRecords);
        const opendapLinks: string[] = [];
        summaryRecords.forEach((ref: any) => {
          //console.log('summaryTEXT: ', summaryRecords['@_scheme']);
          if (summaryRecords['@_scheme'] === 'OGC:WMS') {
          //  console.log('1113311');
            opendapLinks.push(ref._);
          }
        });

        //console.log('OPENDAP Links:');
        opendapLinks.forEach((link) => {
          //console.log(link);
        });

        for (
          let i = 0;
          i <
          jsonObj['csw:GetRecordsResponse']['csw:SearchResults'][
            'csw:SummaryRecord'
          ].length;
          i++
        ) {
          let intermediate =
            jsonObj['csw:GetRecordsResponse']['csw:SearchResults'][
              'csw:SummaryRecord'
            ][i]['dct:references'][1]['#text'];
          ncResults.push(intermediate);
        }
        //console.log('This should be in THREDDS: ', ncResults);
        setModelDAta(ncResults);
      })
      .catch(() => {
        //console.log(e);
        setModelDAta(['Empty dataset']);
      });

    databaseFunctions.getEvaluationForm(item._id).then((r) => {
      if (r.error === 'not_found') {
        setSavedEvaluationForm([]);}
      else {
        setSavedEvaluationForm(r);
      }
      
    });
    databaseFunctions.getCapAttachmentXML(item._id).then((r) => {
      const options = {
        ignoreAttributes: false,
      };
      if (r.error === 'AxiosError') {
        
        setAttachmentXML([]);}
      else {
      
        const parser = new XMLParser(options);
        let jsonObj = parser.parse(r);
        console.log(jsonObj);

        const threshold = jsonObj?.alert?.info[1]?.parameter?.find(
          (param: any) => param.valueName === 'triggerLevel',
        )?.value;

        const colour = jsonObj?.alert?.info[1]?.parameter?.find(
          (param: any) => param.valueName === 'awareness_level',
        )?.value;

        // ['info[0/1]'] is norsk/english
        resultList = {
          identifier: jsonObj['alert']['identifier'],
          phenomenon: jsonObj['alert']['info'][1]['event'],
          colour: colour.split(';')[1].trim(),
          certainty:  jsonObj['alert']['info'][1]['certainty'],
          severity:  jsonObj['alert']['info'][1]['severity'],
          threshold: threshold ? threshold : 'no value given',
          area: jsonObj['alert']['info'][1]['area']['areaDesc'],
          onset: dayjs(jsonObj['alert']['info'][1]['onset'])
            .format('YYYY-MM-DD HH:mm')
            .toString(),
          expires: dayjs(jsonObj['alert']['info'][1]['expires'])
            .format('YYYY-MM-DD HH:mm')
            .toString(),
        };
        setAttachmentXML(resultList);
        console.log('ResultatListe: ', resultList);  
      }
    });
  };

  const onOpenDropdownList = () => {};

  const onClickCapDialog = (item: CapFilEntries) => {
    setOpenDialog(!openDialog);
    databaseFunctions.getCapAttachmentXML(item._id).then((r) => {
      setWarningAttachment(r);
      //console.log('getCapAt ',r);
    });
  };

  const verifiedCAP = (item_id: string) => {
    // databaseFunctions.getEvaluationForm(item_id).then((r)=> {
    //  if (r._id)
    //   setCheckmark(true);
    //   else
    //  setCheckmark(false);
    // })
    // console.log(checkmark);
    return <Checkbox />;
  };

  return (
    <>
      <Typography variant="h5">Results ({warning.length})</Typography>
      <TableContainer component={Paper} sx={styles.table}>
        <Table size="small" aria-label="CAP-filer">
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
                Annotated
              </TableCell>
              <TableCell sx={styles.tableHead} align="right">
                Duration
              </TableCell>
              <TableCell sx={styles.tableHead}>CAP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warning.map((item: CapFilEntries, index) => (
                <React.Fragment key={item._id}>

                <TableRow
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
                  <TableCell align="right"><Checkbox checked={false}/> </TableCell>
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
                <TableRow >
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={open === index} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        {modelData.map((item) => (
                          <li key={index} value={item}>
                            {item}
                          </li>
                        ))}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>

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
