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
  const [open, setOpen] = useState(true)

  const toggleSidebar = () => {
    setOpen(!open)
  }

  const hoverStyles = {
    '&:hover': {
      bgcolor: 'white',
      color: 'black',
      '& .MuiListItemIcon-root': {
        color: 'black'
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
        width: open ? 240 : 64,
        height: '100vh',
        bgcolor: '#111',
        color: '#fff',
        paddingTop: 2,
        position: 'fixed',
        transition: 'width 0.3s',
        fontFamily: `'Rubik'`
      }}
    >
      <IconButton
        onClick={toggleSidebar}
        sx={{ color: 'white', ml: open ? 2 : 0.5 }}
      >
        <MenuIcon />
      </IconButton>

      <List sx={{ mt: 2 }}>
        {navItems.map((item, index) => (
          <Tooltip key={index} title={!open ? item.label : ''} placement="right">
            <ListItemButton onClick={() => router.push(item.path)} sx={hoverStyles}>
              <ListItemIcon sx={{ color: 'white', minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.label} />}
            </ListItemButton>
          </Tooltip>
        ))}

        <Divider sx={{ my: 1, borderColor: '#333' }} />

        <Tooltip title={!open ? 'Logout' : ''} placement="right">
          <ListItemButton onClick={handleLogout} sx={hoverStyles}>
            <ListItemIcon sx={{ color: 'white', minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
              <LogoutIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </Tooltip>
      </List>
    </Box>
  )
}
