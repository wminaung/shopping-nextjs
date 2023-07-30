import { TextField, TextareaAutosize } from "@mui/material";
import { Dispatch, SetStateAction, memo } from "react";

interface Props {
  value: string;
  setState: (newDescription: string) => void;
}
const MultiTextField = ({ value, setState }: Props) => {
  return (
    <>
      <TextareaAutosize
        value={value}
        onChange={(e) => setState(e.target.value)}
        style={{
          fontFamily: "inherit",
          borderRadius: 5,
          width: "100%",
        }}
        minRows={5}
      />
    </>
  );
};

export default memo(MultiTextField);
