import React from 'react';
import '../styles/style.css';
import { Box, Typography, Grid, Paper } from '@mui/material';
import img from "../assets/about.png";

function About() {
  return (
    <>
      <header>
        <Typography variant="h2" align="center" gutterBottom>
          About Us
        </Typography>
      </header>

      <main>
        <section className="intro">
          <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <img 
                  src={img}
                  alt="Sustainable Practices" 
                  style={{ width: '100%', borderRadius: '8px', height: '100%' }} 
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Our Mission
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                    At <strong style={{ color: 'rgb(255, 68, 0)' }}>Food Recovery Network</strong>, our mission is to combat food waste and promote sustainable practices in the retail and e-commerce sectors. We provide a smart platform that leverages demand forecasting, dynamic pricing, and intelligent inventory management to minimize food loss. 
                    By connecting businesses with environmentally conscious customers, we create a win-win solution: businesses reduce financial losses, and customers save money while making a positive environmental impact.
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: 'justify', marginTop: 2 }}>
                    With features like real-time inventory updates, personalized recommendations, and rewarding incentives, we strive to build a community committed to reducing food waste and fostering a greener future.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </section>

        <section className="join-us" style={{ marginTop: '2rem' }}>
          <Typography variant="h4" align="center">Join Us</Typography>
          <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
            Whether you’re looking to reduce your environmental footprint or simply want to save money while shopping sustainably, we invite you to be part of our community.
          </Typography>
          <Typography variant="h6" align="center" sx={{ marginTop: '3rem', fontSize: 'larger' }}>
            Thank you for choosing <strong style={{ color: 'rgb(255, 68, 0)' }}>Food Recovery Network</strong>—together, we can make a difference!
          </Typography>
        </section>
      </main>
    </>
  );
}

export default About;
