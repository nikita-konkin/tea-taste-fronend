import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";
import { ThemeProvider , createTheme } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
	width: '98%',
	margin: '40px 0 0 0',
  "& label, & label.Mui-focused": {
    color: "#ffffff",
  },
  "& div": {
    color: "#ffffff",
  },

  '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ffffff',
      },
      '&:hover fieldset': {
        borderColor: '#ffffff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00ffaf',
      },
    },
});


function TeaTextField(props) {

  const theme = createTheme({
     typography: {
      "fontFamily": `jura`,
      "fontSize": 16,
      // "color": '#FFFFFF',
      // "fontWeightLight": 300,
      // "fontWeightRegular": 400,
      // "fontWeightMedium": 500
     }
      }, []);

  const [textValue, setValue] = React.useState(props.defaultValue);

  useEffect(() => {
    const obj_len = props.commentText ? Object.keys(props.commentText).length : 0
    if (obj_len != 0) {
      setValue(props.commentText[String(props.straitNum) + String(props.id)])
    }
  }, [props.commentText])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    // props.commentText.current[props.straitNum + '_description'] = event.target.value;
    // props.commentText.current[props.straitNum].description = event.target.value;
    props.stagesHandler(event.target.value, event.target.id)

  };

  const handleChangeWoStraitNum = (event)=>{
    setValue(event.target.value);
    props.handler(event.target.value, props.keyId, props.boxId)
  }

	return(
	<>
		<ThemeProvider  theme={theme}>
      <StyledTextField
        id={String(props.straitNum) + String(props.id)}
        label={props.label}
        multiline
        maxRows={5}
        value={textValue}
        // defaultValue={props.defaultValue}
        onChange={props.woStraitNum ? handleChangeWoStraitNum : handleChange}
      />
		</ThemeProvider>

	</>
		)
}

export default TeaTextField;