import React, { useState } from "react";

import { Box } from "@mui/system";

import admin_login_background from "../../Assets/Img/admin-login-bg.png";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Grid, InputLabel, TextField, Typography, Button, Link, InputAdornment, IconButton } from "@mui/material"

const AdminLogin = () => {
  const [values, setValues] = useState({
    showPass: false,
  });

  const handlePassVisibilty = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };
  return (
    <>
      <Box style={{ height: "100vh" }}>
        <Grid container style={{ height: "100vh" }}  >

          <Grid item xs={6}
            sx={{
              display: {
                xs: "none", md: "block",

              },
              backgroundImage: `url(${admin_login_background})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              // backgroundSize: "cover"
            }}
          >

            <Typography variant="h4" sx={{
              color: "white", fontSize: 70, fontWeight: 100,
              fontStyle: 'normal', marginTop: 10, alignItems: "center", marginLeft: 3, marginBottom: 2
            }}>Let us get you money

            </Typography>
            <Typography variant="h6" sx={{ color: "white", fontStyle: "normal", marginLeft: 3, }}>
              The right financing when you need it
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>

            <Box p={3} >
              <Typography variant="h5" sx={{ fontWeight: 700, marginTop: 15, fontStyle: "normal", fontSize: 24, color: "black", alignItems: "center" }}>
                Welcome to
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#0E3DD2", fontSize: 30, fontWeight: "bold", fontStyle: "normal", alignItems: "center" }}>
                SimplySimple
                <Typography variant="subtitle1" sx={{ fontSize: 20, marginLeft: 1 }}>
                  Admin
                </Typography>
              </Typography>
              <Box marginTop={8}>
                <InputLabel sx={{ fontWeight: "bold", fontSize: "small", color: "black" }}>
                  Email/Mobile Number
                </InputLabel>
                <TextField
                  sx={{
                    marginBottom: 3, "& fieldset": {
                      borderRadius: "10px"
                    }
                  }}
                  type="text"
                  placeholder="Enter your ID or Mobile Number"
                  variant="outlined"
                  fullWidth>
                </TextField>
                <InputLabel
                  sx={{ fontWeight: "bold", fontSize: "small", color: "black", }}>
                  Password
                </InputLabel>
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handlePassVisibilty}
                          aria-label="toggle password"
                          edge="end"
                          sx={{ color: "black" }}
                        >
                          {/* {values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />} */}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& fieldset": {
                      borderRadius: "10px",
                    }
                  }}
                  type="password"
                  placeholder="Enter your password"
                  variant="outlined"
                  fullWidth
                >
                </TextField>
                <Typography>
                  <Link href="#" sx={{ fontWeight: 700, float: "right", fontStyle: "normal", marginBottom: 3, marginRight: 4 }}
                  >Forgot Password</Link>
                </Typography>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 3, padding: 2 }}
                  fullWidth> Login</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default AdminLogin;