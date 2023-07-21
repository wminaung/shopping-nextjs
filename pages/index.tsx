import { Box, Button, Fade, Grow } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import wave1Svg from "@/src/assets/wave1.svg";
import wave2Svg from "@/src/assets/wave2.svg";
import wave3Svg from "@/src/assets/wave3.svg";
import SvgWave from "@/ui/components/SvgWave";

const HomePage = () => {
  const [innerWidth, setInnerWidth] = useState(0);
  const [checked, setChecked] = React.useState(true);
  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    // Add event listener to track window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let waveSvg = wave1Svg;

  if (innerWidth < 700) {
    waveSvg = wave2Svg;
  } else if (innerWidth < 400) {
    waveSvg = wave3Svg;
  }
  useEffect(() => {
    setChecked(false);
    setChecked(true);
  }, [waveSvg]);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        bgcolor: "lightblue",
      }}
    >
      <SvgWave svg={waveSvg} />
    </Box>
  );
};

export default HomePage;
