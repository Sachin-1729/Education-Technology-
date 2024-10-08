import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { loadStripe } from "@stripe/stripe-js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {fetchAllActiveSubscriber} from '../Redux/gettingallactivesubscriber'
import { useEffect } from "react";

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

const stripePromise = loadStripe(
  "pk_test_51PiUSvRsJPFvYFKyLba75beol7KtsiWyjj70r15zDLkZPKg28LV3lHEUstpxwBPz5XI2WnXdXT2zKJUOiHkzJhWe00V7tlgWzf"
);

function Product() {

 
  const [boughtStatus, setBoughtStatus] = React.useState({});
  const [product, setproduct] = React.useState([]);
  const [planid, setPlanid] = React.useState("");
  const [sessionid, setsessionid] = React.useState(Boolean);
  const location = useLocation();
  const [Activesubscribers, setActiveSubscribers] = React.useState([]);
  const dispatch = useDispatch();

  // Get state from Redux
  const { allactivesubscriber, loading, error } = useSelector(
    (state) => state.currentactivesubscriber
  );

 
  // Dispatch action to fetch data on component mount
  useEffect(() => {
    dispatch(fetchAllActiveSubscriber());
  }, [dispatch]);

  console.log(allactivesubscriber , "allactive")
  // // Set local state when Redux state updates
  useEffect(() => {
    if (!loading && allactivesubscriber.length) {
      console.log(allactivesubscriber , "allactivesubscriber")
      setActiveSubscribers(allactivesubscriber);
    }
  }, [allactivesubscriber, loading]);

  async function handlebuy(plan_id, event) {
    console.log("buy clicked");
    event.preventDefault(); // Prevent default anchor behavior
    const response = await fetch("http://localhost:7000/payment/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan_id: plan_id,
        Token: localStorage.getItem("Token"),
      }),
    });
    const data = await response.json();

    if (response.ok) {
      console.log(data);
      setsessionid(data.id);
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
    }
  }

  async function gettingallproduct(req, res) {
    const response = await fetch("http://localhost:7000/plans/getallplan");
    const data = await response.json();

    setproduct(data);
  }

  React.useEffect(() => {
    gettingallproduct();
 }, []); 


  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 1, // Optional: rounds the corners of the border
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <ToastContainer />
        <Grid container spacing={2}>
          {product.map((product) => (
            <Grid item xs={4} key={product.plan_id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {product.Productname}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontWeight: "bold" }}
                  >
                    {product.productDescription}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box
                    sx={{
                      display: "flex", // Flexbox layout
                      justifyContent: "space-between", // Optional: space between the boxes
                      alignItems: "center", // Align items vertically in the center
                      gap: 2, // Optional: gap between the boxes
                      p: 2, // Optional: padding around the container
                    }}
                  >
                    <Box
                      sx={{
                        width: "45%", // Box 1 takes 45% of the container width
                        p: 2, // Padding inside the box

                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.primary",
                          fontSize: "24px",
                          fontWeight: "bold",
                        }}
                      >
                        ₹{product.PriceinInr}
                      </Typography>
                    </Box>

                    <Box>
                      <Button
                        sx={{
                          width: "45%", // Box 2 takes 45% of the container width
                          px: 4, // Padding inside the box
                          ml: 10,

                          textAlign: "center",
                        }}
                        variant="contained"
                        disabled={allactivesubscriber.activeplan.includes(product._id) ? true : false}
                        onClick={(event) => handlebuy(product.plan_id, event)}
                        size="large"
                      >
                        buy
                      </Button>
                    </Box>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Product;
