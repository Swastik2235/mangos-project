import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextField, IconButton, Paper, Avatar, Typography } from '@mui/material';
// import {  Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import sendMsg from '../../assets/send.png';


interface Message {
  id: string;
  text: string;
  isSelf: boolean;
  timestamp: Date;
  profileImage?: string;
}

const MessageBubble = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isSelf',
})<{ isSelf: boolean }>(({ theme, isSelf }) => ({
  padding: theme.spacing(1.5),
  maxWidth: '150px',
  minHeight: '44px',
  position: 'relative',
  backgroundColor: isSelf ? '#2564E6' : '#D3E0FA',
  color: isSelf ? '#fff' : 'inherit',
  borderRadius: isSelf ? '10px 10px 0 10px' : '0 10px 10px 10px',
  boxShadow: `
    4px 4px 20px rgba(111,140,176,0.41),
    -6px -6px 20px #FFFFFF,
    2px 2px 4px rgba(114,142,171,0.10)
  `,
}));

// const FileUploadButton = styled(IconButton)(({ _ }) => ({
//   width: 36,
//   height: 36,
//   backgroundColor: '#E7EBF0',
//   boxShadow: `
//     inset 2.5px 2.5px 5px rgba(167,170,187,0.5),
//     inset -2.5px -2.5px 5px #FAFBFF
//   `,
//   '&:hover': {
//     backgroundColor: '#D8DDE3',
//   },
// }));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    boxShadow: `
      inset 2.5px 2.5px 5px rgba(167,170,187,0.5),
      inset -2.5px -2.5px 5px #FAFBFF
    `,
    backgroundColor: '#fff',
    '& input::placeholder': {
      color: '#A7AABB',
    },
  },
}));

export default function ChatThread() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey, how are you?",
      isSelf: false,
      timestamp: new Date(Date.now() - 120000),
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    {
      id: '2',
      text: "I'm doing great!",
      isSelf: true,
      timestamp: new Date(Date.now() - 60000),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() || selectedFile) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        isSelf: true,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
      setSelectedFile(null);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const profiles = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61'
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '87.5vh',
      bgcolor: '#E7EBF0',borderRadius:'12px',
      p: 3,
      boxShadow: "4px 4px 20px 0px #6F8CB069,-6px -6px 20px 0px #FFFFFF,2px 2px 4px 0px #728EAB1A"  }}>
        <Typography variant="h3" sx={{  display: 'flex', alignItems: 'center' }}>Chat Thread</Typography>
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            }}
        >
            <Box sx={{ display: 'flex', ml: -1, mt:1 }}>
                {profiles.map((profile, index) => (
                <Box
                    key={index}
                    component="img"
                    src={profile}
                    alt={`Profile ${index + 1}`}
                    sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    // border: '2px solid #fff',
                    ml: -1,
                    '&:first-of-type': { ml: 0 }
                    }}
                />
                ))}
            </Box>
            <Typography sx={{color: '#242A54', fontSize:12}}>View +10</Typography>
        </Box>
        <Box sx={{ 
            flexGrow: 1, 
            overflowY: 'auto',
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
        }}>
            {messages.map((message) => (
            <Box
                key={message.id}
                sx={{
                display: 'flex',
                alignItems: 'start',
                gap: 1,
                flexDirection: message.isSelf ? 'row-reverse' : 'row',
                }}
            >
                {/* {!message.isSelf && ( */}
                <Avatar
                    src={message.profileImage}
                    sx={{ width: 30, height: 30 }}
                />
                {/* // )} */}
                <Box sx={{ position: 'relative' }}>
                <MessageBubble isSelf={message.isSelf}>
                    <Typography variant="body2">
                    {message.text}
                    </Typography>
                </MessageBubble>
                <Typography
                    variant="caption"
                    sx={{
                    position: 'absolute',
                    bottom: -20,
                    color: '#7C7F98',
                    right: 0,
                    }}
                >
                       {formatDistanceToNow(message.timestamp, { addSuffix: true })
                        .replace('minutes', 'min')
                        .replace('minute', 'min')}
                </Typography>
                </Box>
            </Box>
            ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', position: 'relative' }}>
            <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            />
            

            <Box sx={{ flexGrow: 1, position: 'relative' }}>
            <StyledTextField
                fullWidth
                size="small"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type Something"
                variant="outlined"
            />
            {selectedFile && (
                <Paper
                elevation={1}
                sx={{
                    position: 'absolute',
                    top: -32,
                    left: 8,
                    p: 0.5,
                    px: 1,
                    bgcolor: 'primary.50',
                }}
                >
                <Typography variant="caption">{selectedFile.name}</Typography>
                </Paper>
            )}
            </Box>

            <IconButton
            onClick={handleSendMessage}
            sx={{
                // bgcolor: '#2564E6',#D3E0FA
                '&:hover': {
                bgcolor: '#D3E0FA',
                },
            }}
            >
            {/* <Send size={20} /> */}
            <Box component="img" src={sendMsg} alt="OnProgressStatus" sx={{ width: 20, height: 20 }} />
            
            </IconButton>
        </Box>
    </Box>
  );
}