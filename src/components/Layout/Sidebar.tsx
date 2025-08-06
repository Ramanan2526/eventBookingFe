// components/Sidebar.tsx
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import EventNoteIcon from '@mui/icons-material/EventNote'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import { useRouter } from 'next/router'

export default function Sidebar() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    router.push('/')
  }

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        bgcolor: '#111',
        color: '#fff',
        paddingTop: 2,
        position: 'fixed'
      }}
    >
      <List>
        <ListItemButton onClick={() => router.push('/')}>
          <ListItemIcon sx={{ color: 'white' }}><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton onClick={() => router.push('/myevents')}>
          <ListItemIcon sx={{ color: 'white' }}><EventNoteIcon /></ListItemIcon>
          <ListItemText primary="My Events" />
        </ListItemButton>

        <ListItemButton onClick={() => router.push('/event')}>
          <ListItemIcon sx={{ color: 'white' }}><AddCircleIcon /></ListItemIcon>
          <ListItemText primary="Create Event" />
        </ListItemButton>

        <ListItemButton onClick={handleLogout}>
          <ListItemIcon sx={{ color: 'white' }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  )
}
