import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Checkbox } from "@mui/material";
import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";

import { useShopper } from "@/src/context/ShopperContextProvider";
import { Category } from "@/src/types/types";

const CatCheckbox = () => {
  const { categories, updateData, catsToShow } = useShopper();
  const data = useShopper();

  const [cats, setCats] = useState([]);

  useEffect(() => {
    if (categories.length) {
      // setCats(
      //   categories.map((category) => ({ ...category, isChecked: false }))
      // );
      updateData({
        ...data,
        catsToShow: categories.map((category) => ({
          ...category,
          isChecked: false,
        })),
      });
    }
  }, [categories]);

  if (!categories.length) return null;

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const value = event.target.value;
    updateData({
      ...data,
      catsToShow: catsToShow.map((cat) => {
        if (String(cat.id) === value) {
          return { ...cat, isChecked: checked };
        }
        return { ...cat };
      }),
    });
  };

  const resetCategory = () => {
    updateData({
      ...data,
      catsToShow: catsToShow.map((cat) => ({ ...cat, isChecked: false })),
    });
  };

  console.log(catsToShow, "catsToShow");
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Categories</FormLabel>

      {catsToShow.map((category) => (
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
