import React from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';

// Define styled components using MUI's styled API
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
}));

const StyledCardMedia = styled('div')(({ theme }) => ({
  height: 0,
  paddingTop: '56.25%', // 16:9 aspect ratio
  position: 'relative',
  width: '100%',
}));

const StyledIframe = styled('iframe')(({ theme }) => ({
  border: 'none',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
}));

const StyledVideo = styled('video')(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: red[500],
}));

export default function VideoCard({ videoSrc }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
<> 
      <StyledCardMedia>
        {videoSrc.includes("youtube") ? (
          <StyledIframe
            src={videoSrc}
            title="Video"
            allowFullScreen
          />
        ) : (
          <StyledVideo
            src={videoSrc}
            controls
          />
        )}
      </StyledCardMedia>
      <CardHeader
        // avatar={
        //   <StyledAvatar>
        //     R
        //   </StyledAvatar>
        // }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon onClick={handleClick} />
        //   </IconButton>
        // }
        // title={<Typography noWrap align="left">Hello</Typography>}
        // subheader={
        //   <div>
        //     <Typography align="left" color="textSecondary" component="p">
        //       Channel Name
        //     </Typography>
        //     <Typography align="left" color="textSecondary" component="p">
        //       3K Views • 19 hours ago
        //     </Typography>
        //   </div>
        // }
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>
          <PlaylistPlayIcon />
          Add to Queue
        </MenuItem> */}
      </Menu>
    </>
  );
}
