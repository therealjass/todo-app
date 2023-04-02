import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import '../Assets/Css/customSelectBoxMainDiv.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const CustomSelectBox = React.memo((props: any) => {

  console.log("props", props);
  const [inputValue, setInputValue] = useState<string>('');
  // const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    if (props?.value) {
      setInputValue(props?.value);
    }
  }, [props?.value]);

  const optionSelected = (key: string, value: string) => {
    // setInputValue(key);
    setInputValue(value);
    props.onChange(key);
  };

  return (
    <FormControl fullWidth sx={{
      "& fieldset": {
        top: 0,
        borderRadius: "10px",
      }
    }
    } >
      {/* <InputLabel
        id="demo-simple-select-label"
        sx={props?.inputLabelSX ? props?.inputLabelSX : {}}
        className={props?.className ? props?.className : ""}
      >
        {props?.inpurLabelValue ? props?.inpurLabelValue : ""}
      </InputLabel> */}
      <Select
        fullWidth
        id="demo-simple-select"
        labelId="demo-simple-select-label"
        defaultValue=''
        name={props?.name}
        value={inputValue}
        onBlur={props?.onBlur}
        sx={props?.selectSX ? props?.selectSX : {}}
        error={props?.error}
        MenuProps={MenuProps}
        inputProps={
          {
            readOnly: props?.isReadOnly,
            sx: {
              color: props?.isReadOnly ? "var(--uiDarkGreyColor)" : "var(--gradientColorBlack)"
            }
          }
        }

      >
        {

          props.options && props.options.length ?
            props.options.map((item: any, index: number) => {
              return (
                <MenuItem key={index} value={item[props?.valueKey] ? item[props?.valueKey] : ""} onClick={() => {
                  optionSelected(item[props?.valueKey], item[props?.labelKey]);
                }}
                >
                  {/* <Typography variant="body2" color="textSecondary"> */}
                  <Typography variant="body2">
                    {item[props?.labelKey] ? item[props?.labelKey] : ""}
                  </Typography>
                </MenuItem>
              )
            })
            : <MenuItem></MenuItem>
        }
      </Select>
      {
        props?.formHelperText ?
          <FormHelperText sx={{ color: "red" }}>
            {props?.formHelperText}
          </FormHelperText>
          : null
      }
    </FormControl >
  );
});

export default CustomSelectBox;