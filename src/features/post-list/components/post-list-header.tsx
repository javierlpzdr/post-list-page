import React from 'react';
import {TableCell, TableHead, TableRow} from "@mui/material";


const PostListHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Body</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default PostListHeader;
