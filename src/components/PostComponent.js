import { Typography, Box,Paper } from "@mui/material";

const PostComponent = ({ modalPost }) => {
  return (
    <>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {modalPost.title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{modalPost.content}</Typography>
        <Typography sx={{ mt: 2 }}>Comments: </Typography>
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
              <Typography variant="h4">{comment.username}</Typography>
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
