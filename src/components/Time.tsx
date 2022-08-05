import * as React from 'react';
import nbLocale from 'date-fns/locale/nb';
import enLocale from 'date-fns/locale/en-US';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const localeMap = {
  en: enLocale,
  nb: nbLocale,
};

export default function LocalizedTimePicker() {
  const [locale, setLocale] = React.useState<keyof typeof localeMap>('nb');
  const [startValue, setStartValue] = React.useState<Date | null>(new Date());
  const [endValue, setEndValue] = React.useState<Date | null>(new Date());

  const selectLocale = (newLocale: any) => {
    setLocale(newLocale);
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
            label="From"
            value={startValue}
            onChange={(newValue) => setStartValue(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            label="To"
            value={endValue}
            onChange={(newValue) => setEndValue(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
}
