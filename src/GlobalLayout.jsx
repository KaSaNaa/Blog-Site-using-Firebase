import { Outlet } from 'react-router-dom';
import NavBar from './components/home/NavBar';

const GlobalLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default GlobalLayout;
