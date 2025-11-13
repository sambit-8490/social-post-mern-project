import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  // ✅ Use environment variable for API base URL
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${API_URL}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
