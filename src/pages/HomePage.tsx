// pages/HomePage.tsx
import Sidebar from '@/components/Layout/sidebar'
import { Box, Typography } from '@mui/material'

export default function HomePage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ marginLeft: 30, padding: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Feed
        </Typography>
        {/* More feed components go here */}
      </Box>
    </Box>
  )
}
