import { useRouteError } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import angryCloud from '../assets/Angry-cloud.png';
import NavBar from "../components/AppBar";
import Footer from "../components/Footer";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let title = "An error occurred.";
  let message = "Something went wrong, try again later...";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find the page.";
  }

  return (
    <>
      <div id="main-root-section">
        <NavBar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(90vh - 64px)',
            textAlign: 'center',
          }}
        >
          <div>
            <img src={angryCloud} alt="Angry cloud image." width={300} />
          </div>
          <Typography variant="h1" sx={{fontFamily: "Poppins, sans-serif", fontWeight: "600" }}>
            <span>{error.status}</span>
          </Typography>
          <Typography variant="h5" sx={{fontFamily: "Poppins, sans-serif", fontWeight: "500" }}>
            {message}
          </Typography>
        </Box>
      </div>
      <Footer />
    </>
  );
}

export default ErrorPage;
