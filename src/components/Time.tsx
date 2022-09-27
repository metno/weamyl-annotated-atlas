import * as React from 'react';
import nbLocale from 'date-fns/locale/nb';
import enLocale from 'date-fns/locale/en-US';
import { format } from 'date-fns';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

type Props = {
  searchObject: object;
  setSearchObject: any;
  nullObject: boolean;
  setNullObject: any;
};

const localeMap = {
  en: enLocale,
  nb: nbLocale,
};

const Time: React.FC<Props> = ({
  searchObject,
  setSearchObject,
  setNullObject,
  nullObject,
}) => {
  const [locale, setLocale] = React.useState<keyof typeof localeMap>('nb');
  const [startValue, setStartValue] = React.useState<Date | null>(null);
  const [endValue, setEndValue] = React.useState<Date | null>(null);

  const selectLocale = (newLocale: any) => {
    setLocale(newLocale);
  };

  const onChangeStartTime = (option: any) => {
    const newDate = format(option, "yyyy-MM-dd'T'HH:mm");
    const phenomSearch = { ...searchObject, onset: newDate };
    setSearchObject(phenomSearch);
    setStartValue(option);
  };

  const onChangeEndTime = (option: any) => {
    const newDate = format(option, "yyyy-MM-dd'T'HH:mm");
    const phenomSearch = { ...searchObject, expires: newDate };
    setSearchObject(phenomSearch);
    setEndValue(option);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={localeMap[locale]}
    >
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <ToggleButtonGroup value={locale} exclusive sx={{ display: 'block' }}>
            {Object.keys(localeMap).map((localeItem) => (
              <ToggleButton
                key={localeItem}
                value={localeItem}
                onClick={() => selectLocale(localeItem)}
              >
                {localeItem}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>

        <Stack direction="row" spacing={3}>
          <DateTimePicker
            value={startValue}
            onChange={onChangeStartTime}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            value={endValue}
            onChange={onChangeEndTime}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};

export default Time;
