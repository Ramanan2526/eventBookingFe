// pages/HomePage.tsx
import Sidebar from '@/components/Layout/sidebar'
import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'

export default function HomePage() {

  // useEffect (()=>{
  //   const fetchData = async () => {
  //     const apiCall = await fetch('http://localhost:3001/events/fetchEvents')
  //     const data = await apiCall.json()
  //     console.log(data)
  //   }
  //   fetchData();
  // },[])

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3001/events/fetchEvents');
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('API error:', error);
    }
  };

  fetchData();
}, []);

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
