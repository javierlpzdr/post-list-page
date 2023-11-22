import React from 'react';
import TextField from "@mui/material/TextField";

type FilterFormProps = {
    onSubmit: (fields: {title: string}) => React.FormEventHandler
}

const FilterForm = ({onSubmit}:FilterFormProps) => {
    const [formFields, setFormFields] = React.useState({title: ""})
  
    return (<form onSubmit={onSubmit(formFields)}>
      <TextField
        value={formFields.title}
        name="title"
        label="Filter posts"
        variant="outlined"
        onChange={(e) => {
          setFormFields({title: e.target.value})}
        }
      />
      <button type="submit">Search</button>
    </form>)
  }

  export default FilterForm