import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const circleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const circleTransition = {
    duration: 0.5,
    repeat: Infinity,
  };

  return (
    <motion.div variants={containerVariants} initial="start" animate="end">
      <motion.span variants={circleVariants} transition={circleTransition} />
      <motion.span variants={circleVariants} transition={circleTransition} />
      <motion.span variants={circleVariants} transition={circleTransition} />
    </motion.div>
  );
};

export default Loading;
