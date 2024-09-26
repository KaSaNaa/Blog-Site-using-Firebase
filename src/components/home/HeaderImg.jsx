import Card from '@mui/material/Card';
import { useThemeContext } from '../../contexts/ThemeContext';

export default function HeaderImg() {
  const { theme } = useThemeContext();

  return (
    <Card
      sx={{
        maxWidth: '100%',
        height: { xs: '190px', sm: '285px', md: '332.5px' },
        margin: '20px',
        padding: '80px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="animated-header">
        <h1>Dev at Deakin</h1>
      </div>
      <div className="bubbles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx>{`
        .animated-header {
          font-family: 'Inter', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: ${theme.palette.text.primary};
          animation: fadeIn 3s ease-in-out infinite alternate;
          position: relative;
          z-index: 1;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bubbles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .bubble {
          position: absolute;
          bottom: -100px;
          width: 40px;
          height: 40px;
          background-color: ${theme.palette.primary.main};
          border-radius: 50%;
          opacity: 0.6;
          animation: rise 10s infinite ease-in;
        }

        .bubble:nth-child(2) {
          width: 60px;
          height: 60px;
          left: 20%;
          animation-duration: 12s;
          background-color: ${theme.palette.secondary.main};
        }

        .bubble:nth-child(3) {
          width: 80px;
          height: 80px;
          left: 40%;
          animation-duration: 14s;
          background-color: ${theme.palette.error.main};
        }

        .bubble:nth-child(4) {
          width: 50px;
          height: 50px;
          left: 60%;
          animation-duration: 16s;
          background-color: ${theme.palette.warning.main};
        }

        .bubble:nth-child(5) {
          width: 70px;
          height: 70px;
          left: 80%;
          animation-duration: 18s;
          background-color: ${theme.palette.info.main};
        }

        .bubble:nth-child(6) {
          width: 90px;
          height: 90px;
          left: 10%;
          animation-duration: 20s;
          background-color: ${theme.palette.success.main};
        }

        .bubble:nth-child(7) {
          width: 30px;
          height: 30px;
          left: 30%;
          animation-duration: 22s;
          background-color: ${theme.palette.primary.light};
        }

        .bubble:nth-child(8) {
          width: 50px;
          height: 50px;
          left: 50%;
          animation-duration: 24s;
          background-color: ${theme.palette.secondary.light};
        }

        .bubble:nth-child(9) {
          width: 70px;
          height: 70px;
          left: 70%;
          animation-duration: 26s;
          background-color: ${theme.palette.error.light};
        }

        .bubble:nth-child(10) {
          width: 40px;
          height: 40px;
          left: 90%;
          animation-duration: 28s;
          background-color: ${theme.palette.warning.light};
        }

        @keyframes rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-1000px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </Card>
  );
}