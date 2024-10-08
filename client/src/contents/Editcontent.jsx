import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  OutlinedInput,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const CustomBox = styled(Box)({
  padding: 10,
});

const CustomBox_For_Form = styled(Box)({
  paddingTop: 50,
  paddingBottom: 50,
  paddingLeft: 100,
  paddingRight: 100,
});

function CreateProperties() {
  const [plans, setplans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(""); // State to store the selected value
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const[Contenttitle , setContenttitle] = useState([]);
  const[Contentdescription , setContentdescription] = useState([]);
  const { id } = useParams(); // Extract id from URL path
  const[content , setcontent] = useState([]);
  const Navigate = useNavigate();
  

  async function gettingallplan(req, res) {
    const response = await fetch("http://localhost:7000/plans/getallplan");
    if (response.ok) {
      const data = await response.json();
      setplans(data);
    }
  }
async function gettingsinglecontent()
{
const response = await fetch('http://localhost:7000/content/getsinglecontent',{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
      
})
if (response.ok) {
    const data = await response.json();
    console.log(data)
    setSelectedPlan(data.planId);
    setContenttitle(data.Content_title);
    setContentdescription(data.Content_description);

  }
}

useEffect(()=>{
    gettingsinglecontent();
} , [])
  useEffect(() => {
    gettingallplan();
  }, [setplans]);

  console.log(plans);

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files); // Get the selected files
    setSelectedVideos(files); // Store the selected files in state
  };

  function handlechangeplan(event) {
    setSelectedPlan(event.target.value); // Update state with the selected value
  }
 

  const handleDocumentUpload = (event) => {
    const files = event.target.files;
    setSelectedDocuments([...files]);
  };
 
  function handleContenttitle(event)
  {
    setContenttitle(event.target.value)
  }

  function handleContentDescription(event)
  {
    setContentdescription(event.target.value);
  }





async function handlesubmit(event)
{   event.preventDefault();
    const formData = new FormData();
      // Append the selected plan ID
  formData.append("planId", selectedPlan);
  // Append video title and description
  formData.append("id" , id);
  formData.append("contentTitle", Contenttitle);
  formData.append("contentDescription", Contentdescription);

    // Append selected video files
    selectedVideos.forEach((video, index) => {
        formData.append(`videos`, video); // key 'videos' is used for video files
      });



    // Append selected document files
    selectedDocuments.forEach((document, index) => {
        formData.append(`documents`, document); // key 'documents' is used for document files
      });


        // Make a POST request with FormData
  const response = await fetch("http://localhost:7000/content/updatecontent", {
    method: "POST",
    body: formData, // Send the FormData object
  });


  if (response.ok) {
    const result = await response.json();
    setplans([]);                // Reset plans to an empty array
    setSelectedPlan("");          // Reset selectedPlan to an empty string
    setSelectedVideos([]);        // Reset selectedVideos to an empty array
    setSelectedDocuments([]);     // Reset selectedDocuments to an empty array
    setContenttitle("");          // Reset Contenttitle to an empty string
    setContentdescription("");    // Reset Contentdescription to an empty string
    setTimeout(() => {
        Navigate('/content');
      }, 2000);
  
    
    
    toast.success("Content Updated successfully!");
  } else {
    toast.error("Failed to Update content");
  }
    
}

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CustomBox>
          <Paper>
            <ToastContainer />
            <CustomBox_For_Form>
              <form id = "form" onSubmit={handlesubmit} >
                <FormControl fullWidth margin="normal">
                  <InputLabel id="plans-dropdown-label">Plans</InputLabel>
                  <Select
                    labelId="plans-dropdown-label"
                    id="plans-dropdown"
                    label="Plans"
                    value={selectedPlan}
                    onChange={handlechangeplan}
                  >
                    {plans?.map((plan) => (
                      <MenuItem key={plan._id} value={plan._id}>
                        {plan?.Productname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <br />
                <br />

                <TextField
                  label="Content Title"
                  variant="outlined"
                  name="title"
                  fullWidth
                  onChange={handleContenttitle}
                  value={Contenttitle}
                />
                <br />
                <br />
                <TextField
                  label="Content Description"
                  variant="outlined"
                  name="Description"
                  fullWidth
                  onChange={handleContentDescription}
                  value={Contentdescription}
                />
                <br />
                <br />

                <Typography variant="contained" gutterBottom>
                  Video
                </Typography>

                <Box
                  sx={{
                    maxWidth: 500,
                    mx: "auto",
                    mt: 4,
                    mb: 2,
                    p: 2,
                    border: "2px dashed #ccc",
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <input
                    id="upload-video-button"
                    type="file"
                    accept="video/*" // Allow only video files
                    style={{ display: "none" }}
                    multiple // Allow multiple video files
                    onChange={handleVideoUpload} // Handle video file selection
                  />
                  <label htmlFor="upload-video-button">
                    <IconButton
                      color="primary"
                      aria-label="upload video"
                      component="span"
                    >
                      <CloudUploadIcon />
                    </IconButton>
                  </label>
                  <Typography variant="body2" color="textSecondary">
                    Drag and drop videos here or click to select files
                  </Typography>

                  {/* List of selected videos */}
                  <List>
                    {selectedVideos.map((video, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <VideoLibraryIcon /> {/* Icon for video files */}
                        </ListItemIcon>
                        <ListItemText
                          primary={video.name}
                          secondary={`${(video.size / (1024 * 1024)).toFixed(
                            2
                          )} MB`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <br />
                <br />

                <Typography variant="contained" gutterBottom>
                  Document
                </Typography>

                <Box
                  sx={{
                    maxWidth: 500,
                    mx: "auto",
                    mt: 4,
                    mb: 2,
                    p: 2,
                    border: "2px dashed #ccc",
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <input
                    id="upload-document-button"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx" // Allow only document types
                    style={{ display: "none" }}
                    multiple // Allow multiple document files
                    onChange={handleDocumentUpload} // Handle document file selection
                  />
                  <label htmlFor="upload-document-button">
                    <IconButton
                      color="primary"
                      aria-label="upload documents"
                      component="span"
                    >
                      <CloudUploadIcon />
                    </IconButton>
                  </label>
                  <Typography variant="body2" color="textSecondary">
                    Drag and drop documents here or click to select files
                  </Typography>

                  {/* List of selected documents */}
                  <List>
                    {selectedDocuments.map((document, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <InsertDriveFileIcon />{" "}
                          {/* Icon for document files */}
                        </ListItemIcon>
                        <ListItemText
                          primary={document.name}
                          secondary={`${(document.size / (1024 * 1024)).toFixed(
                            2
                          )} MB`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  Edit Content
                </Button>
              </form>
            </CustomBox_For_Form>
          </Paper>
        </CustomBox>
      </Container>
    </div>
  );
}

export default CreateProperties;
