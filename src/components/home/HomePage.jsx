import { Box } from "@mui/material";
import NavBar from "./NavBar";
import HeaderImg from "./HeaderImg";
import FeaturedArticles from "./Articles";
import FeaturedTutorials from "./Tutorials";
import SubscribeForm from "./subsEmail";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
    {/* TODO: add necessary Nav Bar links */}
      <NavBar /> 
      <HeaderImg />
      {/* TODO: load featured articles and questions */}
      <FeaturedArticles />
      <FeaturedTutorials />
      <SubscribeForm />
      {/* TODO: update footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;