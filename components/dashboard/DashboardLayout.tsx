import * as React from 'react';
import {Box, Drawer, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, Tab, Stack} from '@mui/material';
import {TabList, TabContext, TabPanel} from '@mui/lab'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add'

const drawerWidth = 200;

export  const  DashboardLayout : React.FC<({children: JSX.Element})> = ({children})=> {
  return (
    <Box sx={{ display: 'flex' }}>
  
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          
        }}
        variant="permanent"
        anchor="left"
      >
       
       <Box sx={{p: 2.8}}>

        <Typography>Palasio</Typography>
       </Box>
         
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{p: 0.2, pl:2}}>
                <ListItemIcon sx={{ '&': {minWidth: 35}}}>
                  {index % 2 === 0 ? <InboxIcon  /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText  primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
       
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', }}
      >
     
    <Box
    sx={{p: 1, pb: 0, pl: 0}}
    >
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5'>Notes</Typography>
        <Button size='small' variant='contained' startIcon={<AddIcon/>}>Add a note</Button>
      </Stack>
      <Box sx={{display: 'flex', gap: 1}}>
        <Button size='small' sx={{fontSize: '0.75rem', p: 0, pl: 0}}>private</Button>
        <Button size='small' sx={{borderBottom: '1px solid red',fontSize: '0.75rem', borderRadius: 0, p: 0, padding: 0, m: 0}}>shared</Button>
      </Box>
    </Box>
        <Divider/>
       <Box >{children}</Box>
      </Box>
    </Box>
  );
}

