import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { CapFilEntries, CapFileEntryList } from '../@customTypes/CapFilEntries';
import databaseFunctions from '../utils/databaseFunctions';
import CapDialog from './CapDialog';
import dayjs from 'dayjs';
import { XMLParser } from 'fast-xml-parser';
import { Collapse } from '@mui/material';


const styles = {
    table: {
      marginTop: 1,
    },
    tableHead: {
      fontWeight: 'bold',
    },
    tableTime: {
      fontStyle: 'italic',
    },
  };
interface HeadCellFields{
    phenomenon: string,
    colour: string,
    areaDesc :string,
    onset :string,
    archived:boolean,
}

function descendingComparator(a: CapFilEntries, b: CapFilEntries, orderBy: keyof HeadCellFields) {
    switch (orderBy) {
        case 'areaDesc':
          if (b.areaDesc.en < a.areaDesc.en) return -1;
          if (b.areaDesc.en > a.areaDesc.en) return 1;
          break;
        case 'archived':
          // Assume 'annotated' is a boolean; handle accordingly if it's not
          if (!a.archived && b.archived) return -1;
          if (a.archived && !b.archived) return 1;
          break;
        default:
          if (b[orderBy] < a[orderBy]) return -1;
          if (b[orderBy] > a[orderBy]) return 1;
          break;
      }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator(
  order: Order,
  orderBy: keyof HeadCellFields,
) {
  return order === 'desc'
    ? (a:CapFilEntries, b:CapFilEntries) => descendingComparator(a, b, orderBy)
    : (a:CapFilEntries, b:CapFilEntries) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof HeadCellFields;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'phenomenon',
    numeric: false,
    disablePadding: true,
    label: 'Phenomenon',
  },
  {
    id: 'colour',
    numeric: false,
    disablePadding: false,
    label: 'Colour',
  },
  {
    id: 'areaDesc',
    numeric: false,
    disablePadding: false,
    label: 'Area Description',
  },
  {
    id: 'archived',
    numeric: false,
    disablePadding: false,
    label: 'Annotated',
  },
  {
    id: 'onset',
    numeric: false,
    disablePadding: false,
    label: 'Duration',
  }
  
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof HeadCellFields) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {  order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof HeadCellFields) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead >
      <TableRow>
        <TableCell  />
        {headCells.map((headCell) => (
        <TableCell
        sx={styles.tableHead}
        key={headCell.id}
        align={headCell.disablePadding ? 'left' : 'right'}
        sortDirection={orderBy === headCell.id ? order : false}
        >
        <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
        >
            {headCell.label}
            {orderBy === headCell.id ? (
            <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
            ) : null}
        </TableSortLabel>
        </TableCell>
        ))}
        <TableCell sx={styles.tableHead} >CAP</TableCell>
      </TableRow>
    </TableHead>
  );
}

type Props = {
    warning: CapFileEntryList;
    setPolygonObject: any;
    setAttachmentXML: any;
    setSavedEvaluationForm: any;
  };

const EnhancedTable: React.FC<Props> = (props) => {
    const {
        warning,
        setPolygonObject,
        setAttachmentXML,
        setSavedEvaluationForm,
    } = props;
    const [openDialog, setOpenDialog] = React.useState(false);
    const [warningAttachment, setWarningAttachment] = React.useState('');
    const [modelData, setModelDAta] = React.useState<string[]>([]);
    const [open, setOpen] = React.useState(-1);



    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof HeadCellFields>('areaDesc');
    const [page, setPage] = React.useState(warning.length);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof HeadCellFields,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //   const isSelected = (id: string) => selected.indexOf(_id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - warning.length) : 0;

    const visibleRows = React.useMemo(
        () =>
        [...warning]
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage,warning],
    );

    const onClickCapDialog = (item: CapFilEntries) => {
        setOpenDialog(!openDialog);
        databaseFunctions.getCapAttachmentXML(item._id).then((r) => {
        setWarningAttachment(r);
        //console.log('getCapAt ',r);
        });
    };
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
        //console.log('222222');
        const options = {
          ignoreAttributes: false,
        };
        const parser = new XMLParser(options);

        let jsonObj = parser.parse(r);
       /*  console.log(
          'WHAT TO CHOOSE? ',
          jsonObj['csw:GetRecordsResponse']['csw:SearchResults'][
            'csw:SummaryRecord'
          ][0]['dct:references'],
        ); */

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
      //console.log('EV: ', r);
      //console.log('rrorV: ', r.error);
      if (r.error === 'not_found') {
        //console.log('Etter if: ', r.error);
        setSavedEvaluationForm([]);}
      else {
        console.log('Etter if: ', (r));

        setSavedEvaluationForm(r);
      }
      
    });
    console.log('Etter if: ', item._id)
    databaseFunctions.getCapAttachmentXML(item._id).then((r) => {
      const options = {
        ignoreAttributes: false,
      };
      console.log('Etter if: ', r.error);
      if (r.error === 'AxiosError') {
        
        setAttachmentXML([]);}
      else {
      
        const parser = new XMLParser(options);
        let jsonObj = parser.parse(r);
        console.log(jsonObj);

        const threshold = jsonObj?.alert?.info[1]?.parameter?.find(
          (param: any) => param.valueName === 'triggerLevel',
        )?.value;
        //console.log('threshold: : ',jsonObj?.alert?.info[1]?.parameter);

        const colour = jsonObj?.alert?.info[1]?.parameter?.find(
          (param: any) => param.valueName === 'awareness_level',
        )?.value;
        //console.log('colour: ',colour);

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
  return (
    <Box sx={{ width: "100%" }}>
    <Typography variant="h5">Results ({warning.length})</Typography>
    <Paper sx={{ width: '100%', mb: 2 }}>

        <TableContainer component={Paper} sx={{ maxHeight: 320,...styles.table }} >
            <Table
                stickyHeader={true}
                sx={{ minWidth: 500 ,...styles.table}}
                aria-labelledby="tableTitle"
                size={'small' }
            >
                <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                //   onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                />
                <TableBody >
                {visibleRows.map((row, index) => {

                    return (
                        <React.Fragment key={row._id}>

                            <TableRow
                                hover
                                selected={false}
                                onClick={() => onClickTableRow(row)}
                                
                                >
                                <TableCell >
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
                                
                                <TableCell
                                component="th"
                                scope="row"
                                
                                >
                                    {row.phenomenon}
                                </TableCell>
                                <TableCell  align="right">{row.colour}</TableCell>
                                <TableCell  align="right">{row.areaDesc.en}</TableCell>
                                <TableCell align="right"><Checkbox checked={false}/></TableCell>
                                <TableCell align="right">{row.onset}/{row.expires}</TableCell>
                                <TableCell  align="right">
                                    <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => onClickCapDialog(row)}
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
                    );
                })}
                
                </TableBody>
            </Table>
            </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={warning.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
  
    </Box>
      
  );
};
export default EnhancedTable;