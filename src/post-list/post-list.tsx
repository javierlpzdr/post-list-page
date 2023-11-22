import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import { useQuery } from "@tanstack/react-query";
import { styled } from "@mui/system";
import FilterForm from './components/filter-form.tsx'

import api from "../api/index.ts";

export const isPrimeNumber = (n: number) =>
  Math.abs(n) <= 3 || (n - 1) % 6 == 0 || (n + 1) % 6 == 0;

const Title = styled("span")(({ postId }) => ({
  fontStyle: isPrimeNumber(postId) ? "italic" : "normal",
}));

const EditPost = () => {
  const [visible, setVisible] = React.useState(false)

  const toggleEditPost = () => {
    setVisible(!visible)
  }

  return (
  <>
    <button onClick={toggleEditPost}>Edit post</button>
    <Modal
      open={visible}
      onClose={toggleEditPost}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
      </Box>
    </Modal>
  </>
)

}

const PostListBody = ({ filter }: {filter: string}) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["getPosts", filter],
    queryFn: async () => await api.getPosts(filter),
  });

  if (isPending) {
    return (
      <TableRow>
        <TableCell>Loading</TableCell>
      </TableRow>
    );
  }

  if (error) {
    return (
      <TableRow>
        <TableCell>Error</TableCell>
      </TableRow>
    );
  }



  return (
    <>
      {data.map((post) => (
        <TableRow key={post.id}>
          <TableCell component="th" scope="row">
            {post.id}
          </TableCell>
          <TableCell component="th" scope="row">
            <Title postId={post.id}>{post.title}</Title>
          </TableCell>
          <TableCell component="th" scope="row">
            <EditPost />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

const PostList = () => {
  const [filter, setFilter] = React.useState("");

  const handleFilter = (fields) => (e) => {
    e.preventDefault();
    setFilter(fields.title);
  };

  return (
    <>
      <h1>Post list</h1>

      <FilterForm onSubmit={handleFilter} />
      <Table data-testid="post-data-grid">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <PostListBody filter={filter} />
        </TableBody>
      </Table>
    </>
  );
};

export default PostList;
