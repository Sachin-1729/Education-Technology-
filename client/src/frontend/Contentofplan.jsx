import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, List, ListItem, Link, ListItemIcon } from "@mui/material";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import Video from "../components/VideoComp";

function Contentofplan() {
  const { id } = useParams(); // Extract id from URL path
  const [content, setContent] = useState([]);
  const baseURL = "http://localhost:7000/";

  async function getPlanByUserSubscription() {
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
          subscription_id_stripe: id,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setContent(data);
    } else {
      console.log(await response.json());
    }
  }

  useEffect(() => {
    getPlanByUserSubscription();
  }, [id]);

  return (
    <Box sx={{ padding: 4 }}>
      {content.map((row, rowIndex) => (
        <Box key={rowIndex} sx={{ mb: 4 }}>
          <Typography gutterBottom variant="h5" component="div">
            {row.Content_title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {row.Content_description}
          </Typography>

          <Typography gutterBottom variant="h6" component="div">
            Videos
          </Typography>
          <Grid container spacing={2}>
            {row?.videos?.map((video, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Video videoSrc={`${baseURL}${video.url}`} />
              </Grid>
            ))}
          </Grid>

          <Typography gutterBottom variant="h6" component="div">
            Documents
          </Typography>
          <List>
            <Grid container spacing={2}>
              {row?.documents?.map((document, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <ListItem>
                    <Link
                      href={`${baseURL}${document.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ListItemIcon>
                        <PictureAsPdfSharpIcon />
                      </ListItemIcon>
                    </Link>
                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </List>
        </Box>
      ))}
    </Box>
  );
}

export default Contentofplan;
