import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useCallback, useState, memo } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const FileDropzone = ({ file, setFile }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    const isJpgOrPng =
      newFile.type === "image/jpeg" || newFile.type === "image/png";

    if (!isJpgOrPng) {
      return console.log("//?ase upload a JPG or PNG image file.s");
    }

    setFile(newFile);

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
    };

    reader.readAsDataURL(newFile);
  }, []);

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });
  console.log("file", file, "***********");
  if (imagePreview) {
    return (
      <Stack spacing={1}>
        <Image src={imagePreview} alt="Preview" width={170} height={170} />
        <Button size="small" variant="outlined" onClick={handleRemoveImage}>
          Remove Image
        </Button>
      </Stack>
    );
  }

  return (
    <Box
      {...getRootProps()}
      className={isDragActive ? "dropzone-active" : "dropzone"}
      sx={{
        border: "2px solid black",
        borderStyle: "dotted",
        borderRadius: 4,
        py: 3,
        textAlign: "center",
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="body2">
        Drag and drop image here, or click to select image
      </Typography>
    </Box>
  );
};

export default memo(FileDropzone);
