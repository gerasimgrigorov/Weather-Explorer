import { useRouteError } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h6">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body1">
        <i>{error.statusText || error.message}</i>
      </Typography>
    </Box>
  );
}

export default ErrorPage;
