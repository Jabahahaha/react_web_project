import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

const LoadingSpinner: React.FC = () => (
  <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
    <CircularProgress />
  </Box>
)

export default LoadingSpinner
