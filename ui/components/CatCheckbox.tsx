import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Checkbox } from "@mui/material";
import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import { useShopper } from "@/src/store/slices/shopperSlice";

const CatCheckbox = () => {
  const {
    state: { categories, catshow },
    dispatch,
    actions: { setCatshow, IsCheckedCatshow },
  } = useShopper();

  useEffect(() => {
    if (categories.length) {
      dispatch(
        setCatshow(categories.map((cat) => ({ ...cat, isChecked: false })))
      );
    }
  }, [categories]);

  if (!categories.length) return null;

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const value = event.target.value;
    const isCheckedCat = catshow.items.filter(
      (item) => String(item.id) === String(value)
    )[0];
    dispatch(
      IsCheckedCatshow({ ...isCheckedCat, isChecked: !isCheckedCat.isChecked })
    );
  };

  const resetCategory = () => {
    dispatch(
      setCatshow(categories.map((item) => ({ ...item, isChecked: false })))
    );
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Categories</FormLabel>

      {catshow.items.map((category) => (
        <FormControlLabel
          key={category.id}
          value={category.id}
          checked={category.isChecked}
          control={<Checkbox onChange={handleCheckboxChange} />}
          label={category.name}
        />
      ))}
      <Button variant="text" onClick={resetCategory}>
        Reset Category
      </Button>
    </FormControl>
  );
};
export default memo(CatCheckbox);
