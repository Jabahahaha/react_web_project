import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

interface ScoreboardHeaderProps {
  liveCount: number
}

const ScoreboardHeader: React.FC<ScoreboardHeaderProps> = ({ liveCount }) => {
  return (
    <Box component="header" sx={{ mb: 3 }}>
      <Typography variant="h4" component="h1">
        Sports Scoreboard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {liveCount > 0
          ? `${liveCount} game${liveCount !== 1 ? "s" : ""} live now`
          : "No live games right now"}
      </Typography>
    </Box>
  )
}

export default ScoreboardHeader
