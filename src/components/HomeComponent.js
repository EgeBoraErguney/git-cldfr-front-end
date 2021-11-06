import { useEffect, useState, useRef } from "react";
import {
  Paper,
  Typography,
  Button,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import logo from "../logo.svg";
import PostComponent from "./PostComponent";
import { ThumbUp, ThumbDown } from "@mui/icons-material";

function HomeComponent() {
  const [posts, setPosts] = useState([]);
  const [postModalOpen, setPostModalOpen] = useState(true);
  const [modalPost, setModalPost] = useState({});
  const [skipFirstRender, setSkipFirstRender] = useState(true);

  function handlePostModalOpen(post) {
    setModalPost(post);
  }
  useEffect(() => {
    setPostModalOpen(!postModalOpen);
  }, [modalPost]);
  function handlePostModalClose() {
    setModalPost({});
  }
  useEffect(() => {
    let loaded = false;
    fetch("https://back-end.egeboraerguney.workers.dev/posts/")
      .then((resp) => resp.json())
      .then((jsonResp) => {
        if (!loaded) {
          setPosts(jsonResp);
        }
      })
      .catch((err) => console.log(err));
    return () => (loaded = true);
  }, []);

  function HandleClickVotes(postId, voteType) {
    var postToChange = posts.find((post) => post.id === postId);
    if (voteType === "up") postToChange.upvotes += 1;
    else if (voteType === "down") postToChange.downvotes += 1;
    setPosts([...posts]);
  }
  return (
    <>
      <img style={{ marginTop: "16px", width: "400px" }} src={logo} />
      <Typography
        sx={{
          mt: "0px",
        }}
        variant="h6"
      >
        Social Media Application
      </Typography>
      <Button
        sx={{
          mt: "32px !important",
        }}
        variant="contained"
      >
        Create new Post
      </Button>
      {posts.map((post) => (
        <Paper
          key={post.id}
          sx={{
            mt: "32px !important",
            margin: "auto",
            width: "60%",
            padding: "16px",
          }}
          elevation={3}
        >
          <Typography variant="h5">{post.title}</Typography>
          <Typography
            sx={{
              mt: "8px",
              mb: "8px",
            }}
            paragraph={true}
          >
            {post.content}
          </Typography>
          <Typography
            sx={{
              mt: "8px",
              mb: "16px",
            }}
            variant="h6"
          >
            <IconButton onClick={() => HandleClickVotes(post.id, "up")}>
              <ThumbUp color="primary" />
              <span style={{ marginLeft: "4px" }}>{post.upvotes}</span>
            </IconButton>
            <IconButton onClick={() => HandleClickVotes(post.id, "down")}>
              <ThumbDown sx={{ color: "red" }} />
              <span style={{ marginLeft: "4px" }}>{post.downvotes}</span>
            </IconButton>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: "-16px",
              float: "right",
            }}
          >
            {post.username}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: "-16px",
              float: "left",
            }}
            onClick={() => handlePostModalOpen(post)}
          >
            {post.comments.length} comments
          </Typography>
        </Paper>
      ))}
      <Modal open={postModalOpen} onClose={handlePostModalClose}>
        <PostComponent modalPost={modalPost}/>
      </Modal>
    </>
  );
}

export default HomeComponent;
