import React, { useContext } from 'react';
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';

import heroImage from '../../../assets/images/Hero_image.png';
import logo from '../../../assets/images/logo.svg';
import { auth } from '../../../common/firebaseApp';
import { UIContext } from '../../Unknown/UIContext';

interface FormValues {
  email: string;
  password: string;
}

const SignInScreen: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const fields: FormValues = {
    email: '',
    password: '',
  };

  function handleSignIn({ email, password }: FormValues) {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      const errorMessage = error.message;
      setAlert({
        show: true,
        severity: 'error',
        message: errorMessage,
      });
    });
  }

  function submit(values: FormValues, helpers: FormikHelpers<FormValues>) {
    handleSignIn(values);
    helpers.setSubmitting(false);
    helpers.resetForm();
  }

  const formik = useFormik({
    initialValues: fields,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('invalid mail format')
        .required('mail is required'),
      password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    }),
    onSubmit: submit,
  });

  return (
    <>
      <Box height="100vh">
        <Container fixed maxWidth="xl">
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Box
                sx={{ display: 'flex', justifyContent: 'center', mt: '5vw' }}
              >
                <img src={logo} alt="logo" />
              </Box>

              <Typography
                variant="h3"
                component="h1"
                align="center"
                sx={{ mb: '4.5vw', mt: '3.5vw' }}
              >
                Login
              </Typography>

              <Stack
                component="form"
                spacing={6}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                sx={{ maxWidth: 400, mx: 'auto' }}
              >
                <TextField
                  fullWidth
                  label="Email"
                  variant="filled"
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                <FormControl variant="filled">
                  <InputLabel
                    color="primary"
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                  >
                    Password
                  </InputLabel>
                  <FilledInput
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error>
                    {formik.touched.password && formik.errors.password}
                  </FormHelperText>
                </FormControl>
                <Button
                  color="secondary"
                  variant="contained"
                  fullWidth
                  size="large"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Login
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SignInScreen;
