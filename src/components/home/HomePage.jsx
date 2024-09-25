import { Typography, Box } from "@mui/material";
import NavBar from "./NavBar";
import HeaderImg from "./HeaderImg";
import FeaturedArticles from "./Articles";
// import FeaturedTutorials from "./Tutorials";
import SubscribeForm from "./subsEmail";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <HeaderImg />
      <FeaturedArticles />
      {/* TODO: remove the commented code below */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        {/* Spacer */}
        <Typography variant="h4" component="div" sx={{ alignSelf: "center" }}>
          FEATURED ARTICLES ARE DISABLED DUE TO UNNCESSARY API USAGE
        </Typography>
      </section>

      {/* <FeaturedTutorials /> */}
      <SubscribeForm />
      <Footer />
    </Box>
  );
};

export default HomePage;
