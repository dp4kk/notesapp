
import { createTheme, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import EventNoteIcon from "@mui/icons-material/EventNote";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonIcon from "@mui/icons-material/Person";
import {ThemeProvider} from '@mui/material/styles'
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AppContext } from '../Context/DataContext';
import {FirebaseData} from '../Firebase/FirebaseContext';


    const theme = createTheme({
      palette: {
        mode: "light",
        primary: { main: "rgb(102,157,246)", contrastText: "#080808" },
        secondary: { main: "rgb(102,157,246)", contrastText: "#080808" },
        background: { paper: "rgb(255, 253, 208)" },
      },
    });
const Sidebar = () => {
    const {currentUser}=useContext(FirebaseData)
    const {openNote,setOpenNote,openList,setOpenList}=useContext(AppContext)
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <Box sx={{display:'flex',border:0}}>
        
          <Drawer
            sx={{
              width: 240,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
              },
            }}
          variant='permanent' anchor='left'>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={currentUser.displayName} />
              </ListItem>
            </List>
            <Divider />
           
                
                <List  sx={{ width: "100%", maxWidth: 240 }}>
                  <ListItem disablePadding secondaryAction={<IconButton edge='end' onClick={()=>setOpenNote(!openNote)}><AddCircleOutlineIcon/></IconButton>}>
                    <ListItemIcon><EventNoteIcon/></ListItemIcon>
                    <ListItemText primary='Notes' />
                  </ListItem>
                </List>
                <List  sx={{ width: "100%", maxWidth: 240 }}>
                  <ListItem disablePadding secondaryAction={<IconButton edge='end' onClick={()=>setOpenList(!openList)}><AddCircleOutlineIcon/></IconButton>}>
                    <ListItemIcon><FormatListBulletedIcon/></ListItemIcon>
                    <ListItemText primary='Task' />
                  </ListItem>
                </List>
          </Drawer>
          </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default Sidebar
