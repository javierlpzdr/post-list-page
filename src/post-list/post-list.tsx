import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import { styled } from "@mui/system";

import api from "../api/api";

export const isPrimeNumber = (n: number) =>
  Math.abs(n) <= 3 || (n - 1) % 6 == 0 || (n + 1) % 6 == 0;

const Title = styled("span")(({ id }) => ({
  textStyle: isPrimeNumber(id) ? "italic" : "normal",
}));

const PostListBody = ({ filter }) => {
  console.log(filter);
  const { isPending, error, data } = useQuery({
    queryKey: ["getPosts", filter],
    queryFn: () => api.getPosts(filter),
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
            <Title id={post.id}>{post.title}</Title>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

const PostList = () => {
  const [filter, setFilter] = React.useState("");

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <h1>Post list</h1>
      <TextField
        id="filter-posts-field"
        label="Filter posts"
        variant="outlined"
        onChange={handleFilter}
      />
      <Table data-testid="post-data-grid">
        <TableHead>
          <TableRow>
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
