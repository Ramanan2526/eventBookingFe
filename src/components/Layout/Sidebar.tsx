// components/Sidebar.tsx
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Divider
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import EventNoteIcon from '@mui/icons-material/EventNote'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { useRouter } from 'next/router'
import '@fontsource/rubik/900.css'

export default function Sidebar() {
  const router = useRouter()

  const hoverStyles = {
    '&:hover': {
      bgcolor: '#FF4D4D',
      color: 'white',
      transform: "translateY(-2px)", // subtle lift
      '& .MuiListItemIcon-root': {
        color: 'white'
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    router.push('/')
  }

  const navItems = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'My Events', icon: <EventNoteIcon />, path: '/myevents' },
    { label: 'Create Event', icon: <AddCircleIcon />, path: '/event' }
  ]

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        //bgcolor: '#50ce7aff',
        color: 'black',
        paddingTop: 2,
        position: 'fixed',
        transition: 'width 0.3s',
        fontFamily: 'Lexend',
        boxShadow: '4px 0 15px rgba(0, 0, 0, 0.5)'  ,        
        zIndex: 10 // ensure it appears above content
      }}
    >
      <List sx={{ mt: 2 }}>
        {navItems.map((item, index) => (
          <Tooltip key={index} title={item.label} placement="right">
            <ListItemButton onClick={() => router.push(item.path)} sx={hoverStyles}>
              <ListItemIcon sx={{ color: 'black', minWidth: 0, mr: 'auto', justifyContent: 'center' }}>
                {item.icon}
              </ListItemIcon>
              {<ListItemText primary={ item.label} />}
            </ListItemButton>
          </Tooltip>
        ))}

        <Divider sx={{ my: 1, borderColor: '#333' }} />

        <Tooltip title={'Logout'} placement="right">
          <ListItemButton onClick={handleLogout} sx={hoverStyles}>
            <ListItemIcon sx={{ color: 'black', minWidth: 0, mr:'auto', justifyContent: 'center' }}>
              <LogoutIcon />
            </ListItemIcon>
            {<ListItemText primary="Logout" />}
          </ListItemButton>
        </Tooltip>
      </List>
    </Box>
  )
}
