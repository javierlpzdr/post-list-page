import React from "react";
import { Button, TextField, styled } from "@mui/material";

type FilterFormProps = {
  onSubmit: (title: string) => React.FormEventHandler;
};

const FormStyled = styled("form")({
  display: "flex",
  gap: "10px"
});

const FilterForm = ({ onSubmit }: FilterFormProps) => {
  const [titleField, setTitleField] = React.useState("");

  return (
    <FormStyled onSubmit={onSubmit(titleField)}>
      <TextField
        value={titleField}
        name="title"
        label="Filter posts by title"
        variant="outlined"
        onChange={(e) => {
          setTitleField(e.target.value);
        }}
      />
      <Button type="submit">Filter</Button>
    </FormStyled>
  );
};

export default FilterForm;
