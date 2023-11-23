import React, { FormEventHandler } from "react";
import {Container, Table, Typography} from "@mui/material";
import FilterForm from "./components/filter-form";
import PostListBody from "./components/post-list-body";
import PostListHeader from './components/post-list-header';

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  marginTop: "60px",
  marginBottom: "60px"
}

const PostList = () => {
  const [filter, setFilter] = React.useState("");

  const handleFilter: (title: string) => FormEventHandler =
    (title) => (e) => {
      e.preventDefault();
      setFilter(title);
    };

  return (
    <Container sx={styles}>
      <Typography variant="h2" component="h1">Post list</Typography>

      <FilterForm onSubmit={handleFilter} />
      <Table data-testid="post-data-grid">
        <PostListHeader />
        <PostListBody filter={filter} />
      </Table>
    </Container>
  );
};

export default PostList;
