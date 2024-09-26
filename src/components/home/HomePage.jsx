import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderImg from './HeaderImg';
import FeaturedArticles from './Articles';
import FeaturedTutorials from './Tutorials';
import SubscribeForm from './subsEmail';
import Footer from './Footer';

/**
 * HomePage component renders the main content of the home page with animations.
 * It includes the following sections:
 * - Header image
 * - Featured articles
 * - Featured tutorials
 * - Subscribe form
 * - Footer
 *
 * Each section is wrapped in a motion.div or motion.section for animation effects
 * using the AnimatePresence component from Framer Motion.
 *
 * @component
 * @returns {JSX.Element} The rendered HomePage component.
 */
const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
      }}
    >
      <AnimatePresence>
        <motion.div
          key={'header'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <HeaderImg />
        </motion.div>

        <motion.div
          key={'articles'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <FeaturedArticles />
        </motion.div>

        <motion.section
          key={'featured'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px',
          }}
        >
          <FeaturedTutorials />
        </motion.section>

        <motion.div
          key={'subscribe'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <SubscribeForm />
        </motion.div>

        <motion.div
          key={'footer'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        >
          <Footer />
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default HomePage;
