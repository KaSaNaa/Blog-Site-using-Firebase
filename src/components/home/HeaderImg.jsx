import Card from "@mui/material/Card";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LogoSvg from "../../assets/logo.svg";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function HeaderImg() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Card
        sx={{
          maxWidth: "100%",
          height: "350px",
          margin: "20px",
          padding: "80px",
          backgroundSize: "50%",
          background: `url(${LogoSvg}) no-repeat center/cover`,
        }}
      />
    </ThemeProvider>
  );
}
