import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Checkbox,
  Box
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { AssigneeChip } from './AssigneeChip';
import { DatasetSelect } from './DatasetSelect';
import { ProjectSelect } from './ProjectSelect';
import { StatusSelect } from './StatusSelect';

interface RowData {
  taskName: string;
  dataset: string;
  project: string;
  status: string;
  assignedTo: string;
  startDate: string;
  endDate: string;
  children?: RowData[];
}

function Row({ row: initialRow, depth = 0 }: { row: RowData; depth?: number }) {
  const [row, setRow] = React.useState(initialRow);
  const [open, setOpen] = React.useState(false);
  const hasChildren = row.children && row.children.length > 0;

  const handleDatasetChange = (newValue: string) => {
    setRow(prev => ({ ...prev, dataset: newValue }));
  };

  const handleProjectChange = (newValue: string) => {
    setRow(prev => ({ ...prev, project: newValue }));
  };

  const handleStatusChange = (newValue: string) => {
    setRow(prev => ({ ...prev, status: newValue }));
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell padding="checkbox">
          <Checkbox size="small" />
        </TableCell>
        <TableCell 
          component="th" 
          scope="row" 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            pl: `${depth * 2}rem`
          }}
        >
          {hasChildren && (
            <IconButton
              size="small"
              onClick={() => setOpen(!open)}
              sx={{ mr: 1 }}
            >
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
          )}
          {row.taskName}
        </TableCell>
        <TableCell>
          <DatasetSelect value={row.dataset} onChange={handleDatasetChange} />
        </TableCell>
        <TableCell>
          <ProjectSelect value={row.project} onChange={handleProjectChange} />
        </TableCell>
        <TableCell>
          <StatusSelect value={row.status} onChange={handleStatusChange} />
        </TableCell>
        <TableCell>
          <AssigneeChip name={row.assignedTo} />
        </TableCell>
        <TableCell>{row.startDate}</TableCell>
        <TableCell>{row.endDate}</TableCell>
      </TableRow>
      {hasChildren && (
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0 }}>
                <Table size="small">
                  <TableBody>
                    {row.children!.map((childRow, index) => (
                      <Row key={index} row={childRow} depth={depth + 1} />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

const mockData: RowData[] = [
  {
    taskName: 'Galva. Job card',
    dataset: 'Galva. Job card',
    project: 'Tata Projects LTD.',
    status: 'In Progress',
    assignedTo: 'Ameya Kulde',
    startDate: '28/07/2021',
    endDate: '28/07/2021',
    children: [
      {
        taskName: 'Galva. Job card',
        dataset: 'Galva. Job card',
        project: 'Tata Projects LTD.',
        status: 'In Progress',
        assignedTo: 'Ameya Kulde',
        startDate: '28/07/2021',
        endDate: '28/07/2021'
      }
    ]
  },
  {
    taskName: 'Tasks Name',
    dataset: '',
    project: '',
    status: '',
    assignedTo: '',
    startDate: '28/07/2021',
    endDate: '28/07/2021'
  }
];

export default function TaskTable() {
  return (
    <TableContainer 
      component={Paper} 
      sx={{
        boxShadow: 'none',
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        '& .MuiTableCell-root': {
          borderBottom: '1px solid #E0E0E0',
          padding: '12px 16px',
        },
        backgroundColor:'#E7EBF0'
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox size="small" />
            </TableCell>
            <TableCell>Tasks Name</TableCell>
            <TableCell>Dataset</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Assigned to</TableCell>
            <TableCell>Start date</TableCell>
            <TableCell>End date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockData.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}