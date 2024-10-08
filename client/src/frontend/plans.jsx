import React from 'react';
import { Container, Box, Typography, Grid, Button, Paper } from '@mui/material';
import {Link} from 'react-router-dom'

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Introduction Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to ExamPrep Academy
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Unlock your potential with our comprehensive courses designed for competitive examinations like SSC, UPSC, Banking, and more.
        </Typography>
        <Link to="/product">
        
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Explore Courses
        </Button>
        </Link>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Expert Faculty
            </Typography>
            <Typography color="textSecondary">
              Learn from experienced professionals with years of expertise in competitive exams.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Comprehensive Study Material
            </Typography>
            <Typography color="textSecondary">
              Get access to detailed study materials and mock tests designed to help you succeed.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Flexible Membership Plans
            </Typography>
            <Typography color="textSecondary">
              Choose from a range of membership plans that fit your needs and budget.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Ready to Start Your Preparation?
        </Typography>
        <Link to="/product">
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
         Buy Now
        </Button>
        </Link>
      </Box>
    </Container>
  );
}

export default HomePage;
