import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const TypewriterAnimation: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 100,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      setDisplayedText((prevText) => {
        const nextChar = text[currentIndex];
        currentIndex++;

        if (currentIndex > text.length) {
          clearInterval(interval);
          return prevText;
        }

        return prevText + nextChar;
      });
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return <Typography variant="body1">{displayedText}</Typography>;
};

const MyComponent: React.FC = () => {
  const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel urna a lorem ultricies vestibulum vitae id lectus.";

  return <TypewriterAnimation text={text} delay={100} />;
};

export default MyComponent;
