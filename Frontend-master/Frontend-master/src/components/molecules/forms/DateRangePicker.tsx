import { FC, useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const DateRangeButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  cursor: 'pointer',
  boxShadow: `
    4px 4px 20px 0px #6F8CB069,
    -6px -6px 20px 0px #FFFFFF,
    2px 2px 4px 0px #728EAB1A
  `,
  '&:hover': {
    backgroundColor: '#f8f9fa',
  },
});

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

const DateRangePicker: FC<DateRangePickerProps> = ({
  startDate,
  endDate,
//   onStartDateChange,
//   onEndDateChange,
  }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'dd MMM yy');
  };

  return (
    <DateRangeButton onClick={() => setIsOpen(!isOpen)}>
      <CalendarIcon size={20} />
      <Typography>
        {startDate && endDate
          ? `${formatDate(startDate)} - ${formatDate(endDate)}`
          : 'Select date range'}
      </Typography>
    </DateRangeButton>
  );
};

export default DateRangePicker;