import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = ({ size, color, thickness, variant }) => {
  return (
    <CircularProgress size={size} color={color} thickness={thickness} variant={variant} />
  );
};

export default Spinner;
