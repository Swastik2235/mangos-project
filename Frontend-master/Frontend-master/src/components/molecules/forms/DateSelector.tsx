import { FC } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Calendar } from 'lucide-react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';  // Import Adapter for date-fns
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'; // Use dayjs for conversion from Date to Dayjs

interface DateSelectorProps {
  value: Date; // Using native Date type from JavaScript
  onChange: (date: Date | null) => void;
}

const DateSelector: FC<DateSelectorProps> = ({ value, onChange }) => {
  // Convert the native Date object to Dayjs for compatibility
  const dayjsValue = value ? dayjs(value) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>  {/* Provide Adapter for date-fns */}
      <DatePicker
        value={dayjsValue} // Pass Dayjs value to DatePicker
        onChange={(newValue) => {
          // Convert Dayjs value back to Date before passing to onChange
          onChange(newValue ? newValue.toDate() : null);
        }}
        slots={{
          openPickerIcon: Calendar
        }}
        slotProps={{
          textField: {
            size: "small",
            sx: { width: 150 }
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
