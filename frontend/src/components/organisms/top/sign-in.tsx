import type { NextComponentType, NextPageContext } from 'next';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SignValue, SignFlow } from '@/schema';
import { SignValueScheme } from '@/schema';

import { SnsSign } from '@/components/molecules';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

type Props = {
  onSubmit: (singValue: SignValue) => Promise<void>;
  onSnsLogin: (flow: SignFlow) => void;
};

/** 全体の設定 */
const Wrapper = styled.section`
  width: 100%;
`;

export const SignIn: NextComponentType<NextPageContext, null, Props> = ({
  onSubmit,
  onSnsLogin,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignValue>({
    resolver: zodResolver(SignValueScheme),
  });

  // const onSubmit: SubmitHandler<SignValueType> = (data) => console.log(data);
  const errorEmail = errors.email?.message as string;
  const errorPassword = errors.password?.message as string;

  return (
    <Wrapper data-testid='login-form'>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                autoComplete='email'
                autoFocus
                {...register('email')}
              />
              {!!errorEmail && (
                <Typography component='h5' variant='h5' sx={{ mt: 3, mb: 2 }}>
                  {errorEmail}
                </Typography>
              )}
              <TextField
                margin='normal'
                required
                fullWidth
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                {...register('password')}
              />
              {!!errorPassword && (
                <Typography component='h5' variant='h5' sx={{ mt: 3, mb: 2 }}>
                  {errorPassword}
                </Typography>
              )}
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>

              <Typography
                component='h5'
                variant='h5'
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '15px',
                }}
              >
                or
              </Typography>
              {/* SNS */}
              <Box component='div'>
                <SnsSign onClick={onSnsLogin} />
              </Box>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/user/signup' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Wrapper>
  );
};
