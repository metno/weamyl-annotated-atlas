import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  PaperProps,
} from '@mui/material';
import Draggable from 'react-draggable';
import databaseFunctions from '../utils/databaseFunctions';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

type Props = {
  openDialog: boolean;
  setOpenDialog: any;
};

const CapDialog: React.FC<Props> = (props) => {
  const { openDialog, setOpenDialog } = props;

  const handleClose = () => {
    setOpenDialog(false);
  };

  /*const displayCAP = databaseFunctions
    .getCapFiles('2.4.249885')
    .then((r) => console.log(r));*/

  var xTest =
    '<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>\n' +
    '<csw:GetRecords\n' +
    '    xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"\n' +
    '    xmlns:gml="http://www.opengis.net/gml"\n' +
    '    xmlns:ogc="http://www.opengis.net/ogc"\n' +
    '    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
    '    service="CSW"\n' +
    '    version="2.0.2"\n' +
    '    resultType="results"\n' +
    '    maxRecords="10"\n' +
    '    outputFormat="application/xml"\n' +
    '    outputSchema="http://www.opengis.net/cat/csw/2.0.2"\n' +
    '    xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd" >\n' +
    '  <csw:Query typeNames="csw:Record">\n' +
    '    <csw:ElementSetName>full</csw:ElementSetName>\n' +
    '    <csw:Constraint version="1.1.0">\n' +
    '      <ogc:Filter>\n' +
    '        <ogc:Intersects>\n' +
    '          <ogc:PropertyName>ows:BoundingBox</ogc:PropertyName>\n' +
    '          <gml:Polygon>\n' +
    '            <gml:exterior>\n' +
    '              <gml:LinearRing>\n' +
    '                <gml:posList>\n' +
    '                  62.0896 8.56313 60.4449 6.00234 60.128 10.2408 62.0896 8.56313\n' +
    '                </gml:posList>\n' +
    '              </gml:LinearRing>\n' +
    '            </gml:exterior>\n' +
    '          </gml:Polygon>\n' +
    '        </ogc:Intersects>\n' +
    '      </ogc:Filter>\n' +
    '    </csw:Constraint>\n' +
    '  </csw:Query>\n' +
    '</csw:GetRecords>';

  return (
    <div>
      <Dialog
        fullWidth={true}
        PaperProps={{ sx: { width: "75%", height: "100%" } }}
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Cap-file
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <pre>
              <code
                style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
              >
                {xTest}
              </code>
            </pre>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CapDialog;
