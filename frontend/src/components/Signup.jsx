import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AuthForm() {
  const labelStyle = { mt: 1, mb: 1 };
  const [isSignup, setIsSignup] = useState(false);
  const [userType, setUserType] = useState("");
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleInputValue = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType === "") {
      alert("Please select a user type.");
      return;
    }

    console.log('Sign Up Data:', { ...input, userType }); 
    if (isSignup) {
      alert("Signup successful!"); 
    } else {
      alert("Login successful!");
    }

    // Clear input fields after submission
    setInput({ name: "", email: "", password: "", phone: "" });
    setUserType(""); // Reset user type
  };

  return (
    <>
      <Dialog open={true} PaperProps={{ style: { borderRadius: 20, overflow: 'hidden', width: 500, overFlow: 'auto' } }}>
        <Box sx={{ ml: 'auto', padding: 1 }}>
          <IconButton component={Link} to="/">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          <Box display={'flex'} alignItems="center" justifyContent="space-between" padding={3} sx={{transform: 'transLateY(-2rem)'}}>
            <Typography variant='h5'>
              {isSignup ? "Sign Up" : "Login"}
            </Typography>
            <div className="user-type" style={{marginRight: '15rem'}}>
              <label>
                <input
                  type="radio"
                  value="User"
                  checked={userType === 'User'}
                  onChange={(e) => {
                    setUserType(e.target.value);
                    console.log('Selected User Type:', e.target.value); // Log user type
                  }}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  value="Admin"
                  checked={userType === 'Admin'}
                  onChange={(e) => {
                    setUserType(e.target.value);
                    console.log('Selected User Type:', e.target.value); // Log user type
                  }}
                />
                Admin
              </label>
            </div>
          </Box>

                  <Typography paddingLeft={3} variant='h6' display={"flex"} textAlign={'left'} sx={{ transform: 'transLateY(-2rem)' }}>
            {isSignup ? "" : "Don't have an account?"}
            <Typography variant='h6' paddingLeft={2}>
              <Button sx={{ borderRadius: 10 }} style={{ width: '100%' }} variant='standard' onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Login" : "Sign Up"}
              </Button>
            </Typography>
          </Typography>
        </Box>

              <form onSubmit={handleSubmit} style={{transform: 'transLateY(-2rem)'}}>
          <Box padding={6} display={"flex"} justifyContent={"center"} flexDirection="column" width={400} margin="auto" alignContent={"center"}>
            {isSignup && (
              <>
                <FormLabel>Name</FormLabel>
                <TextField
                  type={'text'}
                  value={input.name}
                  onChange={handleInputValue}
                  name='name'
                  variant='standard'
                  margin='normal'
                  sx={{ mb: 4 }}
                />
              </>
            )}
            <FormLabel>Email</FormLabel>
            <TextField
              type={'email'}
              value={input.email}
              onChange={handleInputValue}
              name='email'
              variant='standard'
              margin='normal'
              sx={{ mb: 4 }}
            />
            <FormLabel sx={labelStyle}>Password</FormLabel>
            <TextField
              type={'password'}
              value={input.password}
              onChange={handleInputValue}
              name='password'
              variant='standard'
              margin='normal'
            />
            {isSignup && (
              <>
                <FormLabel>Phone</FormLabel>
                <TextField
                  type={'text'}
                  value={input.phone}
                  onChange={handleInputValue}
                  name='phone'
                  variant='standard'
                  margin='normal'
                  sx={{ mb: 4 }}
                />
              </>
            )}
            
            <Button
              type='submit'
              sx={{ borderRadius: 10 }}
              style={{ width: '100%' }}
              variant='contained'
              bgcolor='#1b1b1b'
            >
              {isSignup ? "Sign Up" : "Login"}
            </Button>

          </Box>
        </form>
      </Dialog>
    </>
  );
}
