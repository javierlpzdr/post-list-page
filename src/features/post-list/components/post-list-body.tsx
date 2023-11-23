import { styled, TableBody, TableCell, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import api from "../../../api";
import { isPrimeNumber } from "../utils";
import EditPost from "./edit-post";

const Title = styled("span")(({ postId }) => ({
  fontStyle: isPrimeNumber(postId) ? "italic" : "normal",
}));

const PostListBody = ({ filter }: { filter: string }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["getPosts", filter],
    queryFn: async () => await api.getPosts(filter),
  });

  if (isPending) {
    return (
      <TableBody>
        <TableRow>
          <TableCell>Loading</TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (error) {
    return (
      <TableBody>
        <TableRow>
          <TableCell>Error</TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.map((post: {title: string, id: number, body: string, authorId: number}) => (
        <TableRow key={post.id}>
          <TableCell component="th" scope="row">
            {post.id}
          </TableCell>
          <TableCell component="th" scope="row">
            <Title postId={post.id}>{post.title}</Title>
          </TableCell>
          <TableCell>{post.body}</TableCell>
          <TableCell component="th" scope="row">
            <EditPost post={post} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default PostListBody;
