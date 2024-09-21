import { Oval } from "react-loader-spinner";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const Spinner = ({ color = "#4fa94d", text = "Loading..." }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.01)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Oval
        height={80}
        width={80}
        color={color}
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={color}
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ marginTop: "20px" }}
      >
        {text}
      </Typography>
    </div>
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
};

export default Spinner;