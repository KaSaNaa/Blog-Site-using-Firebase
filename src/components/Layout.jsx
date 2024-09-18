import { Box, Container } from "@mui/material";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          paddingX: 2,
          paddingY: 4,
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default Layout;