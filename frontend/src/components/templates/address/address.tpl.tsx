import type { NextComponentType, NextPageContext } from 'next';
import styled from 'styled-components';
import { useState } from 'react';
import type { SingValueType } from '@/schema';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './address-form';

type Props = {
  onSubmit: (singValue: SingValueType) => Promise<void>;
};

/** 全体の設定 */
const Wrapper = styled.div`
  width: 100%;
`;

export const AddressTpl: NextComponentType<NextPageContext, null, Props> = ({ onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);

  const completionStep = 1;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <Wrapper data-testid='address-tpl'>
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component='h1' variant='h4' align='center'>
            Checkout
          </Typography>
          {activeStep === completionStep ? (
            <>
              <Typography variant='h5' gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant='subtitle1'>
                Your order number is #2001539. We have emailed your order confirmation, and will
                send you an update when your order has shipped.
              </Typography>
            </>
          ) : (
            <>
              <AddressForm />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='contained' onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                  {'send'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Wrapper>
  );
};
