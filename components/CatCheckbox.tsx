import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  Dispatch,
  memo,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { CategoryCheck } from "@/types/types";
import { Typography } from "@mui/material";

interface Props {
  categories: string[];
  checkCat: string;
  setCheckCat: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CatCheckbox = ({
  categories,
  checkCat,
  setCheckCat,
  setLoading,
}: Props) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setLoading(true);
    setCheckCat(value);
  };
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        <Typography variant="h5">Category</Typography>
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel
          key={"all"}
          value={""}
          control={<Radio />}
          label={"All"}
        />
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            value={category}
            control={<Radio />}
            label={category}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
export default memo(CatCheckbox);
