import { Button, Typography } from "@mui/material"

const style = {
  buttonbtn: {
    height: "48px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px 0 rgba(35, 219, 123, 0.4)",
    backgroundColor: "#355FE5",
    width: "100%",
    marginBottom: "-1%"
  },
  text: {
    color: "white",
  },
}

type IProps = {
  /**Button Props */
  keyValue: number,
  variant: any,
  style: any
  className: string,
  disabled: boolean,
  onClick?: () => void,
  fullWidth: boolean

  /**Button Inner Text Props */
  textComponent: any,
  textStyle: any,
  textClassName: string,
  textContent: any,
  type?: any
  sx?: any
}
const CustomStyledButton = (props: IProps) => {
  return (
    <Button
      key={props?.keyValue}
      variant={props?.variant}
      sx={props?.sx}
      style={props?.style}
      className={props?.className}
      disabled={props?.disabled || false}
      onClick={props?.onClick}
      fullWidth={props?.fullWidth}
      type={props?.type}
    >
      <Typography
        component={props?.textComponent || "span"}
        style={props?.textStyle || {}}
        className={props?.textClassName || ""}
      >
        {props?.textContent || ""}
      </Typography>
    </Button>
  )
}

export default CustomStyledButton