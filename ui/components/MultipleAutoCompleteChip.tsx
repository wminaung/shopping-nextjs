import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import { Category } from "@/src/types/types";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Checkbox,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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
        getOptionLabel={(option) => option.name}
        onChange={handleSelectedCategories}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        )}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Categories"
            placeholder="chooose category"
          />
        )}
      />
    </FormControl>
  );
};
export default MultipleAutoCompleteChip;
