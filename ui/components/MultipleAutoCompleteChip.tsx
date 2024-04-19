import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Checkbox,
  Chip,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { memo } from "react";
import { Category } from "@prisma/client";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
interface Props {
  categories: Category[];
  selectedCategories: Category[];
  handleSelectedCategories: (
    event: React.SyntheticEvent<Element, Event>,
    value: Category[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Category> | undefined
  ) => Promise<void>;
}
//****** */
const MultipleAutoCompleteChip = ({
  categories,
  selectedCategories,
  handleSelectedCategories,
}: Props) => {
  return (
    <FormControl fullWidth>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={categories}
        value={selectedCategories}
        disableCloseOnSelect
        getOptionLabel={(option) => `${option.id}`}
        onChange={handleSelectedCategories}
        isOptionEqualToValue={(option, value) =>
          String(option.id) === String(value.id)
        }
        renderOption={(props, option, { selected }) => {
          return (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </li>
          );
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <div key={option.id}>
              <Chip label={option.name} {...getTagProps({ index })} />
            </div>
          ))
        }
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              value={"ok"}
              label="Categories"
              placeholder="chooose category"
            />
          );
        }}
      />
    </FormControl>
  );
};
export default memo(MultipleAutoCompleteChip);
