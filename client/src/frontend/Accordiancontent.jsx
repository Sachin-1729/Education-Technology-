import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Link } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FileOpenIcon from '@mui/icons-material/FileOpen';

export default function AccordionUsage() {
  const { id } = useParams(); // Extract id from URL path
  const [content, setContent] = useState([]);
  const baseURL = "http://localhost:7000/";

  const [open, setOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
 

  const handleClickOpen = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentVideoUrl("");
  };

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

  console.log(content);

  return (
    <div>
      <Typography align="center" gutterBottom variant="h5" component="div">
        {content[0]?.planId?.Productname}
      </Typography>
      {content.map((content, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Box sx={{ p: 2 }}>
                <Typography
                  sx={{
                    fontSize: "18px", // Set font size to 19 pixels
                    color: "blue", // Set text color to violet
                  }}
                >
                  {index + 1}
                </Typography>
              </Box>
              <Box>
                <Typography>{content.Content_title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography variant="body2">
                      {content.videos.length} Videos |
                    </Typography>

                    <Typography variant="body2">
                      {content.documents.length} Docs |
                    </Typography>
                  </Box>
                </Typography>
              </Box>
            </AccordionSummary>

            {/* Video Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
              <Box sx={{ position: "relative" }}>
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent>
                  <video
                    src={currentVideoUrl}
                    title="Video"
                    allow="fullscreen"
                    style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain' // Ensure video fits within modal
                      }}
                    controls // Add this line
                  ></video>
                </DialogContent>
              </Box>
            </Dialog>

            <AccordionDetails>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {content.videos.map((video, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemAvatar sx={{ cursor: "pointer" }}>
                        <Avatar>
                          <PlayCircleIcon />
                        </Avatar>
                      </ListItemAvatar>

                      <Link
                        sx={{
                          textDecoration: "none", // Remove underline
                          color: "inherit", // Inherit color from parent or set a specific color
                        }}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleClickOpen(`${baseURL}${video.url}`);
                          }}
                      >
                        <ListItemText
                          primary={video.url.substring(
                            22,
                            video.url.length - 4
                          )}
                        />
                      </Link>
                    </ListItem>
                  );
                })}
                {content.documents.map((documents, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemAvatar sx={{ cursor: "pointer" }}>
                        <Avatar>
                          <FileOpenIcon />
                        </Avatar>
                      </ListItemAvatar>

                      <Link
                        sx={{
                          textDecoration: "none", // Remove underline
                          color: "inherit", // Inherit color from parent or set a specific color
                        }}
                        href={`${baseURL}${documents.url}`}
                      >
                        <ListItemText
                          primary={documents.url.substring(
                            22,
                            documents.url.length - 4
                          )}
                        />
                      </Link>
                    </ListItem>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
