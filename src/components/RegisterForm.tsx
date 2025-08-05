import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation'
export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', form);

    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if(res.ok){
        router.push('/event')
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Card sx={{ width: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" mb={2}>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
            <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
            <Button variant="contained" type="submit">Register</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
