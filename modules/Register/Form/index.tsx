import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { inputFieldValues } from "./const";
import { LoadingButton } from "@mui/lab";
export default function Form() {
  const initialFormValues = {
    nickName: "",
    studentId: "",
    formSubmitted: false,
    success: false
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);

  const [loading, setLoading] = useState(false);

  const [resFromSubmit, setResFromSubmit] = useState("");

  const validate: any = (fieldValues = formValues) => {
    let temp: any = { ...errors };

    if ("nickName" in fieldValues) {
      temp.nickName = fieldValues.nickName ? "" : "This field is required.";
    }

    if ("studentId" in fieldValues) {
      temp.studentId = fieldValues.studentId ? "" : "This field is required.";
      if (!/^[0-9]+$/.test(fieldValues.studentId)) {
        temp.studentId = "Must be only 0-9.";
      } else if (fieldValues.studentId.length != 10) {
        temp.studentId = "StudentId must be 10 numbers.";
      }
    }

    setErrors({
      ...temp
    });
  };

  const handleInputValue = (e: any) => {
    setResFromSubmit("");

    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    validate({ [name]: value });
  };
  const formIsValid = (fieldValues = formValues) => {
    const isValid =
      fieldValues.nickName &&
      fieldValues.studentId &&
      resFromSubmit === "" &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (formIsValid()) {
      try {
        /*
        add code here to handle on summit
        use nickname by value of formValues.nickName
        use studentId by value of formValues.studentId
        */
        console.log(formValues.nickName);
        console.log(formValues.studentId);
        setLoading(false);
        location.href = "/resultShow";
      } catch (err: any) {
        setLoading(false);
        try {
          setResFromSubmit(err.response.data.message[0]);
        } catch (err) {
          console.error(err);
        }
      }
    }
  };
  return (
    <Box
      sx={{
        width: { xs: "min(90%, 340px)", sm: "340px", lg: "380px" },
        height: "auto",
        padding: {
          xs: "40px 40px 40px",
          sm: "40px 50px 50px",
          lg: "40px 60px 60px"
        },
        gap: "40px",
        backgroundColor: "white",
        border: "1px solid #999999",
        borderRadius: "8px",
        flexDirection: "column"
      }}
    >
      <Typography
        sx={{
          width: "100%",
          textAlign: "center",
          height: "73px",

          fontFamily: "Prompt",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: { xs: "37px", sm: "40px", md: "47px" },
          lineHeight: "73px",
          color: "black"
        }}
      >
        ลงทะเบียน
      </Typography>
      <Typography
        sx={{
          width: "100%",
          textAlign: "center",
          height: "21px",

          fontFamily: "Prompt",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "13px",
          lineHeight: "21px",
          mb: "9px",
          color: "black"
        }}
      >
        กรุณากรอกข้อมูลให้ครบถ้วน
      </Typography>

      <form onSubmit={handleFormSubmit}>
        {inputFieldValues.map((inputFieldValue, index) => {
          return (
            <TextField
              key={index}
              id={inputFieldValue.id}
              label={inputFieldValue.label}
              name={inputFieldValue.name}
              onBlur={handleInputValue}
              onChange={handleInputValue}
              variant="outlined"
              size="small"
              type="text"
              {...(errors[inputFieldValue.name] && {
                error: true,
                helperText: errors[inputFieldValue.name]
              })}
              InputLabelProps={{
                style: {
                  fontFamily: "Prompt",
                  fontStyle: "normal",
                  marginTop: "-4px",
                  color: "rgba(180, 180, 180, 1)"
                }
              }}
              InputProps={{
                style: {
                  fontFamily: "Prompt",
                  fontStyle: "normal",
                  padding: "0",
                  height: "32px",
                  paddingLeft: "3px"
                }
              }}
              sx={{ mt: "31px", width: "100%" }}
            />
          );
        })}
        <Typography
          sx={{
            mb: "5px",
            mt: "26px",
            fontFamily: "Prompt",
            fontStyle: "normal",
            fontSize: "13px",
            color: "red"
          }}
        >
          {resFromSubmit ? "*" : ""}
          {resFromSubmit}
        </Typography>
        <LoadingButton
          type="submit"
          loading={loading}
          // disabled={!formIsValid()}
          sx={{
            textTransform: "none",
            color: "white",
            backgroundColor: "#c7ac41",
            width: "100%",
            fontFamily: "Prompt",
            fontStyle: "normal",
            fontWeight: "300",
            "&:hover": {
              backgroundColor: "#9c8117"
            }
          }}
        >
          Submit
        </LoadingButton>
      </form>
    </Box>
  );
}
