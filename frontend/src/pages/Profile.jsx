import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const Image = styled("div")({
  width: "100%",
  paddingTop: "57%", // keeps aspect ratio
  borderRadius: "8px",
});

const Profile = () => {
    const loading = true;
  return(
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} sm={8} md={6}>
        {/* Avatar + Name */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box sx={{ marginRight: 2 }}>
            <Skeleton variant="circular" width={200} height={200}>
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Skeleton width={200} height={70}>
              <Typography>s</Typography>
            </Skeleton>
          </Box>
        </Box>

        {/* Cover Image Placeholder */}
        <Skeleton variant="rectangular" width="100%">
          <Image />
        </Skeleton>

        {/* Some extra lines to simulate profile info */}
        <Box sx={{ mt: 1 }}>
          <Skeleton height={50} width="80%" sx={{ mb: 1 }} />
          <Skeleton height={20} width="50%" sx={{ mb: 1 }} />
          <Skeleton height={30} width="90%" />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Profile
