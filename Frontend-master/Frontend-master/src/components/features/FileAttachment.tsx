import { Box, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { FileText, Download, Image, File } from 'lucide-react';

const commonStyles = {
  boxShadow: `
    4px 4px 20px 0px #6F8CB069,
    -6px -6px 20px 0px #FFFFFF,
    2px 2px 4px 0px #728EAB1A
  `,
  background: '#E7EBF0',
  borderRadius: '10px',
  height: '150px',
  padding: 2,
};

interface FileItem {
  name: string;
  type: 'document' | 'image' | 'other';
  size: string;
}

const files: FileItem[] = [
  { name: 'Project_Brief.pdf', type: 'document', size: '2.5 MB' },
  { name: 'Design_Mock.png', type: 'image', size: '1.8 MB' },
  { name: 'Requirements.docx', type: 'document', size: '500 KB' },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'document':
      return <FileText size={20} />;
    case 'image':
      return <Image size={20} />;
    default:
      return <File size={20} />;
  }
};

const FileAttachments = () => {
  return (
    <Box sx={commonStyles} mt={2}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        File Attachments
      </Typography>
      <List sx={{ maxHeight: '80px', overflowY: 'auto' }}>
        {files.map((file, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" size="small">
                <Download size={16} />
              </IconButton>
            }
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            {/* <ListItemIcon sx={{ size: 36 , boxShadow: '2.5px 2.5px 5px 0px #A7AABB80 inset,-2.5px -2.5px 5px 0px #FAFBFF inset'}}>
              {getFileIcon(file.type)}
            </ListItemIcon> */}
            <Box  sx={{
              mr: 1,
              color: 'primary.main',
              borderRadius: 50,
              boxShadow: `-2.5px -2.5px 5px 0px #FAFBFF inset`,
              p:0.5,
              width: 34,
              height: 34
            }}>{getFileIcon(file.type)}</Box>
            
            <ListItemText
              primary={file.name}
              secondary={file.size}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FileAttachments;