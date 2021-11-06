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
import CreatePostComponent from "./CreatePostComponent";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import axios from "axios";

function HomeComponent() {
  const [posts, setPosts] = useState([]);
  const [postModalOpen, setPostModalOpen] = useState(true);
  const [sortByUpvotes, setSortByUpvotes] = useState(true);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
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
    const headers = {
      contentType: "application/json",
    };
    axios
      .post(
        "https://back-end.egeboraerguney.workers.dev/posts/",
        postToChange,
        {
          headers,
        }
      )
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
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
        Social Media Application by Ege Bora Ergüney
      </Typography>
      <Button
        sx={{
          mt: "16px !important",
        }}
        variant="contained"
        onClick={() => setCreatePostModalOpen(true)}
      >
        Create new Post
      </Button>
      <Typography
        sx={{
          mt: "0px",
        }}
      >
        <Button
          sx={{
            mt: "16px !important",
          }}
          variant="primary"
          onClick={() => setSortByUpvotes(!sortByUpvotes)}
        >
          Sorting by
          {sortByUpvotes ? (
            <span style={{ marginLeft: "4px" }}>upvotes</span>
          ) : (
            <span style={{ marginLeft: "4px" }}>downvotes</span>
          )}
        </Button>
      </Typography>

      {posts
        .sort((a, b) => {
          return sortByUpvotes
            ? b.upvotes - a.upvotes
            : b.downvotes - a.downvotes;
        })
        .map((post) => (
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
              {post.comments && <span>{post.comments.length} comments</span>}
              {!post.comments && <span>Add a comment</span>}
            </Typography>
          </Paper>
        ))}
      <Modal open={postModalOpen} onClose={handlePostModalClose}>
        <PostComponent modalPost={modalPost} />
      </Modal>
      <Modal
        open={createPostModalOpen}
        onClose={() => {
          setCreatePostModalOpen(false);
        }}
      >
        <CreatePostComponent />
      </Modal>
    </>
  );
}

export default HomeComponent;
