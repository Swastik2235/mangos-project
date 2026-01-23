import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Typography,
  Avatar
} from '@mui/material';
import { FileSpreadsheet, FileText, MoreVertical } from 'lucide-react';

// FileData interface
export interface FileData {
  id: number;
  name: string;
  type: 'excel' | 'pdf';
  size: string;
  date: string;
  owner: string;
}

// Sample data
const fileData: FileData[] = [
  {
    id: 1,
    name: "PG Odish - PACKING LIST",
    type: "excel",
    size: "—",
    date: "Mar 15, 2022",
    owner: "rayward"
  },
  {
    id: 2,
    name: "INDENT",
    type: "excel",
    size: "—",
    date: "Mar 15, 2022",
    owner: "rayward"
  },
  {
    id: 3,
    name: "PO-111, Tower Angles.pdf",
    type: "pdf",
    size: "3.9 MB",
    date: "Dec 9, 2021",
    owner: "rayward"
  },
  {
    id: 4,
    name: "PG INSPECTION OFFER LIST-2.xlsx",
    type: "excel",
    size: "20 KB",
    date: "Feb 24, 2022",
    owner: "rayward"
  }
];

// FileIcon component
interface FileIconProps {
  type: 'excel' | 'pdf';
}
export const FileIcon = ({ type }: FileIconProps) => {
  if (type === 'excel') {
    return <FileSpreadsheet style={{ color: '#10B981' }} />;
  }
  return <FileText style={{ color: '#EF4444' }} />;
};

// UserAvatar component
interface UserAvatarProps {
  name: string;
}
const UserAvatar = ({ name }: UserAvatarProps) => {
  const initial = name.charAt(0).toUpperCase();
  
  return (
    <Avatar 
      sx={{ 
        width: 24, 
        height: 24, 
        bgcolor: '#F59E0B',
        fontSize: '0.75rem'
      }}
    >
      {initial}
    </Avatar>
  );
};

// FileList component
interface FileListProps {
  files: FileData[];
}
const FileList = ({ files }: FileListProps) => {
  return (
    <TableContainer
  sx={{
    // p: 2,
    bgcolor: '#E7EBF0',
    borderRadius: '12px',
    boxShadow: "4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A",
  }}
>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: '40%' }}>Name</TableCell>
        <TableCell>Owner</TableCell>
        <TableCell>Last modified</TableCell>
        <TableCell>File size</TableCell>
        <TableCell padding="checkbox" />
      </TableRow>
    </TableHead>
    <TableBody>
      {files.map((file) => (
        <TableRow
          key={file.id}
          hover
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <FileIcon type={file.type} />
              <Typography variant="body2">{file.name}</Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <UserAvatar name={file.owner} />
              <Typography variant="body2" color="text.secondary">
                {file.owner}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Typography variant="body2" color="text.secondary">
              {file.date}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2" color="text.secondary">
              {file.size}
            </Typography>
          </TableCell>
          <TableCell padding="checkbox">
            <IconButton size="small">
              <MoreVertical size={16} />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

  );
};

// Main component
const ProjectSummary = () => {
  return <FileList files={fileData} />;
};

export default ProjectSummary;