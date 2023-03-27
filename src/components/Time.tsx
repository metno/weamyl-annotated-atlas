import * as React from 'react';
import nbLocale from 'date-fns/locale/nb';
import enLocale from 'date-fns/locale/en-US';
import { format } from 'date-fns';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

type Props = {
  searchObject: object;
  setSearchObject: any;
};

const localeMap = {
  en: enLocale,
  nb: nbLocale,
};

const Time: React.FC<Props> = ({ searchObject, setSearchObject }) => {
  const [startValue, setStartValue] = React.useState<Dayjs | null>(null);
  const [endValue, setEndValue] = React.useState<Dayjs | null>(dayjs());
  let phenomSearch = {
    ...searchObject,
    onset: '2016-01-01T00:00',
    expires: '',
  };

  const onChangeStartTime = (option: any) => {
    const newDate = dayjs(option).format('YYYY-MM-DDTHH:mm');
    phenomSearch = { ...phenomSearch, onset: newDate };
    setSearchObject(phenomSearch);
    setStartValue(option);
    console.log(option);
  };

  const onChangeEndTime = (option: any) => {
    const newDate = dayjs(option).format('YYYY-MM-DDTHH:mm');
    phenomSearch = { ...phenomSearch, expires: newDate };
    setSearchObject(phenomSearch);
    setEndValue(option);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={localeMap['nb']}
    >
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack>
            <DateTimePicker
              value={startValue}
              onChange={onChangeStartTime}
              renderInput={(params) => <TextField {...params} />}
            />
            <Typography variant="caption">Onset</Typography>
          </Stack>
          <Stack>
            <DateTimePicker
              value={endValue}
              onChange={onChangeEndTime}
              renderInput={(params) => <TextField {...params} />}
            />
            <Typography variant="caption">Expires</Typography>
          </Stack>
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};

export default Time;
