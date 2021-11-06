import { Typography, Box, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";

const PostComponent = ({ modalPost }) => {
  const [formData, setFormData] = useState({});

  return (
    <>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {modalPost.title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{modalPost.content}</Typography>
        <Typography sx={{ mt: 2 }}>Comments: </Typography>
        <Typography
          sx={{ mt: 2 }}
          onChange={(event) => {
            setFormData({ ...formData, username: event.target.value });
          }}
        >
          {" "}
          <TextField label="username" variant="outlined" />
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {" "}
          <TextField
            onChange={(event) => {
              setFormData({ ...formData, content: event.target.value });
            }}
            label="content"
            variant="outlined"
          />
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {" "}
          <Button variant="contained">Add</Button>
        </Typography>
        {modalPost.comments &&
          modalPost.comments.map((comment) => (
            <Paper
              key={comment.username}
              sx={{
                mt: "16px !important",
                margin: "auto",
                width: "90%",
                padding: "8px",
              }}
              elevation={3}
            >
              <Typography variant="h5">{comment.username}</Typography>
              <Typography variant="h6">{comment.content}</Typography>
            </Paper>
          ))}
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

export default PostComponent;
