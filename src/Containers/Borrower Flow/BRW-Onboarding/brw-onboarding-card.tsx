import React from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  Paper,
  CardMedia,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Button,
  Radio,
  Link,
} from "@mui/material";

interface cardProps {
  title: String;
  subTitle: String;
  buttonLabel: string;
  bgcolor?: String;
  image?: any;
  radioGroupArray: any;
  onClick: (name: any) => void;
}

function CustomCard(props: cardProps) {

  const [value, setValue] = React.useState("")
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)

  }

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #DBE0FF",
        borderRadius: "18px",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          xs: {
            // maxWidth: "100px",
            width: "100%",
            height: "auto",
            marginLeft: "8px",
            marginTop: "8px",
            display: { xs: "none", md: "flex" },
          },
          display: { xs: "none", md: "flex" },
          maxWidth: "190px",
          width: "100%",
          height: "auto",
          marginLeft: "16px",
          marginTop: "16px",
        }}
        image={props?.image}
        alt="apply-loan"
      />
      <Box
        sx={{
          padding: "0 8px",
          display: "flex",
          flexDirection: "column",
          // border:"1px solid red",
          width: "100%"
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
            {props?.subTitle}
          </Typography>
          <Typography sx={{ fontSize: "40px", fontWeight: "500", lineHeight: "48px", letterSpacing: ".05%" }}>
            {props?.title}{" "}
          </Typography>
          <Box mt={1} mb={1} >
            <RadioGroup
              color="secondary"
              defaultValue="existingBusiness"
              name="radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              {props?.radioGroupArray && props?.radioGroupArray.length && props?.radioGroupArray.map((radioItem: any) => (
                <FormControlLabel
                  sx={{ fontSize: "16px", fontWeight: 400 }}
                  value={radioItem}
                  control={<Radio />}
                  label={radioItem}
                />
              ))}

            </RadioGroup>
          </Box>
          <Box mt={1}>
            <Button
              onClick={() => props?.onClick(props?.title)}
              sx={{
                fontSize: "16px", fontWeight: 500,
                height: "46px",
                bgcolor: `${props?.bgcolor ? props?.bgcolor : "secondary.main"}`,
                textTransform: "capitalize",
              }}
              fullWidth
              variant="contained"
            >
              {props?.buttonLabel}
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}

export default CustomCard;
