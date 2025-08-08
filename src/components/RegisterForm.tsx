import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Person, 
  Email, 
  Lock,
  CheckCircle 
} from '@mui/icons-material';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
}

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthLabel = (strength: number) => {
    if (strength < 25) return { label: 'Weak', color: '#f44336' };
    if (strength < 50) return { label: 'Fair', color: '#ff9800' };
    if (strength < 75) return { label: 'Good', color: '#2196f3' };
    return { label: 'Strong', color: '#4caf50' };
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (getPasswordStrength(form.password) < 50) {
      newErrors.password = 'Password is too weak. Include uppercase, lowercase, and numbers.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear field-specific error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', password: '' });
        
        // Show success state briefly before redirecting
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        // Handle different error types
        if (res.status === 409) {
          setErrors({ email: 'An account with this email already exists' });
        } else if (res.status === 400) {
          setErrors({ general: data.message || 'Please check your information and try again' });
        } else {
          setErrors({ general: 'Registration failed. Please try again.' });
        }
      }
    } catch (err) {
      console.error('Error:', err);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(form.password);
  const strengthInfo = getPasswordStrengthLabel(passwordStrength);

  if (success) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" 
           sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Card sx={{ width: 400, p: 3, textAlign: 'center' }}>
          <CardContent>
            <CheckCircle sx={{ fontSize: 60, color: '#4caf50', mb: 2 }} />
            <Typography variant="h5" mb={2}>Registration Successful!</Typography>
            <Typography variant="body2" color="text.secondary">
              Redirecting you to the application...
            </Typography>
            <LinearProgress sx={{ mt: 2 }} />
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2
      }}
    >
      <Card sx={{ 
        width: { xs: '100%', sm: 400 }, 
        maxWidth: 400,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Typography 
            variant="h4" 
            align="center" 
            mb={1}
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Create Account
          </Typography>
          
          <Typography 
            variant="body2" 
            align="center" 
            color="text.secondary" 
            mb={3}
          >
            Join us today and get started
          </Typography>

          {errors.general && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.general}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
              disabled={isLoading}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color={errors.name ? 'error' : 'action'} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              required
              disabled={isLoading}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color={errors.email ? 'error' : 'action'} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              required
              disabled={isLoading}
              sx={{ mb: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color={errors.password ? 'error' : 'action'} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={isLoading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {form.password && (
              <Box sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    Password Strength
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ color: strengthInfo.color, fontWeight: 600 }}
                  >
                    {strengthInfo.label}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={passwordStrength} 
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: strengthInfo.color,
                      borderRadius: 3,
                    }
                  }}
                />
              </Box>
            )}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{ 
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                },
                '&:disabled': {
                  background: 'rgba(0,0,0,0.12)',
                }
              }}
            >
              {isLoading ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <CircularProgress size={20} color="inherit" />
                  Creating Account...
                </Box>
              ) : (
                'Create Account'
              )}
            </Button>

            <Typography 
              variant="body2" 
              align="center" 
              color="text.secondary" 
              sx={{ mt: 2 }}
            >
              Already have an account?{' '}
              <Button 
                variant="text" 
                sx={{ 
                  p: 0, 
                  minWidth: 'auto',
                  color: '#667eea',
                  textTransform: 'none',
                  fontWeight: 600
                }}
                onClick={() => router.push('/login')}
              >
                Sign In
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}