import * as React from 'react';
import { nb as nbLocale, enUS as enLocale } from 'date-fns/locale';
import { format } from 'date-fns';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

type Props = {
  searchObject: object;
  setSearchObject: any;
};

const localeMap = {
  en: enLocale,
  nb: nbLocale,
};

const Time: React.FC<Props> = ({ searchObject, setSearchObject }) => {
  const [startValue, setStartValue] = React.useState<Date | null>(null);
  const [endValue, setEndValue] = React.useState<Date | null>(null);
  let phenomSearch = { ...searchObject };

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
            />
            <Typography variant="caption">Onset</Typography>
          </Stack>
          <Stack>
            <DateTimePicker
              value={endValue}
              onChange={onChangeEndTime}
            />
            <Typography variant="caption">Expires</Typography>
          </Stack>
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};

export default Time;
