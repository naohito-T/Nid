import type { NextComponentType, NextPageContext } from 'next';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SingValueType } from '@/libs/validation/schema';
import { SingValueScheme } from '@/libs/validation/schema';

type Props = {};

/** 全体の設定 */
const Wrapper = styled.section`
  width: 100%;
`;

export const SingForm: NextComponentType<NextPageContext, null, Props> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingValueType>({
    resolver: zodResolver(SingValueScheme),
  });

  const onSubmit: SubmitHandler<SingValueType> = (data) => console.log(data);
  const errorEmail = errors.email?.message as string;
  const errorPassword = errors.password?.message as string;

  return (
    <Wrapper data-testid='login-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} />
        {errorEmail && <p>{errorEmail}</p>}
        <input type='password' {...register('password', { valueAsNumber: true })} />
        {errorPassword && <p>{errorPassword}</p>}
        <input type='submit' />
      </form>
    </Wrapper>
  );
};
