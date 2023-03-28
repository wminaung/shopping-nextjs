import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { SetStateAction, useState } from "react";

interface Props {
  size: string;
  setSize: React.Dispatch<SetStateAction<string>>;
}

export default function ToggleSize({ size, setSize }: Props) {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setSize(newAlignment);
    }
  };
  return (
    <Stack spacing={2} alignItems="center">
      <ToggleButtonGroup
        value={size}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value={"XS"}>XS</ToggleButton>
        <ToggleButton value="S">S</ToggleButton>
        <ToggleButton value="M">M</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
