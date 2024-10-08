import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { TableRow } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function Pricing() {
  const [plans, setplans] = useState([]);

  async function myplan() {
    const token = localStorage.getItem("Token");
    const response = await fetch(
      "http://localhost:7000/purchased/userpurchasedplan",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userToken: token,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();

      setplans(data);
      console.log("data", data);
    }
  }

  async function handleclick(event, id) {
    event.preventDefault();
    const token = localStorage.getItem("Token");
    const response = await fetch(
      "http://localhost:7000/content/getcontentbyplanforuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userToken: token,
          plan_id: id,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("dwnf", data);
    } else {
      console.log(await response.json());
    }
  }

  useEffect(() => {
    myplan();
  }, []);
  console.log(plans.length);
  return (
    <div>
      {plans.length != 0 ? (
        <Box sx={{ flexGrow: 1, padding: 4 }}>
          <Grid container spacing={2}>
            {plans?.map((plan) => (
              <Grid key={plan?._id} item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {plan?.planId?.Productname}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {plan?.planId?.productDescription}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {plan.status === "active" ? (
                      <Link to={`/visit/${plan?.stripeSubscriptionId}`}>
                        <Button size="small">Visit</Button>
                      </Link>
                    ) : (
                      <Button size="small">{plan?.status}</Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh", // Ensures it takes the full height of the viewport
            
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography sx={{ fontWeight: 'bold'}} gutterBottom variant="h5" component="div">
                Sorry No Courses
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary"  ,  fontWeight: 'bold'}}>
                Please Purchase and then access
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
}

export default Pricing;
