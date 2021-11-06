import { Typography, Box, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const CreatePostComponent = () => {
  const [formData, setFormData] = useState({});
  function postData() {
    var newFormData = { ...formData, upvotes: 0, downvotes: 0 };
    const headers = {
      contentType: "application/json",
    };
    axios
      .post(
        "https://back-end.egeboraerguney.workers.dev/posts/",
        newFormData,
        {
          headers,
        }
      )
      .then((response) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Create new post
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <TextField
            onChange={(event) => {
              setFormData({ ...formData, title: event.target.value });
            }}
            label="title"
            variant="outlined"
          />
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <TextField
            onChange={(event) => {
              setFormData({ ...formData, username: event.target.value });
            }}
            label="username"
            variant="outlined"
          />
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <TextField
            onChange={(event) => {
              setFormData({ ...formData, content: event.target.value });
            }}
            label="content"
            variant="outlined"
          />
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <Button onClick={() => postData()} variant="contained">
            Submit
          </Button>
        </Typography>
      </Box>
    </>
  );
};
const style = {
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default CreatePostComponent;
