import React from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  styled,
  Alert,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import api from "../../../api";

type EditPostProps = {
  post: { title: string; body: string; id: number; authorId: number };
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: "24px",
  padding: "24px",
};

const FormStyled = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
});

const EditPost = ({ post }: EditPostProps) => {
  const [visible, setVisible] = React.useState(false);
  const [body, setBody] = React.useState(post.body);
  const [title, setTitle] = React.useState(post.title);

  const mutation = useMutation({
    mutationFn: (postFields: { body: string; title: string }) => {
      return api.updatePost(post.id, postFields);
    },
  });

  const toggleEditPost = () => {
    mutation.reset()
    setVisible(!visible);
  };

  const handleEdit: React.FormEventHandler = (e) => {
    e.preventDefault();
    mutation.mutate({ body, title });
  };

  return (
    <>
      <Button onClick={toggleEditPost}>Edit post</Button>
      <Modal
        open={visible}
        onClose={toggleEditPost}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" style={{ marginBottom: "30px" }}>
            Edit your post
          </Typography>
          <FormStyled onSubmit={handleEdit}>
            {mutation.isSuccess && (
              <Alert severity="success">Saved succesfully!</Alert>
            )}
            {mutation.isError && <Alert severity="error">Error</Alert>}
            <TextField
              label="Post title"
              defaultValue={post.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Post body"
              defaultValue={post.body}
              onChange={(e) => setBody(e.target.value)}
              multiline
            />
            {mutation.isPending ? (
              <Button disabled>Saving...</Button>
            ) : (
              <Button type="submit" disabled={post.title === title && body === post.body}>Save</Button>
            )}
          </FormStyled>
        </Box>
      </Modal>
    </>
  );
};

export default EditPost;
