import { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { BackendGuestResource } from '@/apis/resources/guest/backend.resource';
import { progressAtom } from '@/contexts/common';
import type { SignValue, SignFlow, ResFrontError } from '@/schema';
import { SignValueScheme } from '@/schema';

export type useSignUpType = () => [
  boolean,
  ResFrontError,
  (signValue: SignValue) => Promise<void>,
  (flow: SignFlow) => Promise<void>,
];

export const useSignUp: useSignUpType = () => {
  const [isProgress, setIsProgress] = useRecoilState(progressAtom);
  const [isError, setIsError] = useState<ResFrontError>({ statusCode: null, message: null });

  const setError = (statusCode: number, message: string): void => {
    setIsError({ statusCode, message });
  };

  const onSubmit = async (signValue: SignValue) => {
    setIsProgress(true);
    // 検証
    const parsedSignValue = await SignValueScheme.parseAsync(signValue);
    // TODO stateを作成しrecoilに保存
    const backendGuestResource = new BackendGuestResource();
    const tmpCode = await backendGuestResource.signUp(parsedSignValue);

    if (tmpCode.kind === 'success') {
    } else {
      setError(tmpCode.value[0].statusCode, tmpCode.value[0].message);
    }
    await new Promise((r) => setTimeout(r, 5000)).finally(() => setIsProgress(false));
  };

  const onSnsLogin = useCallback(async (flow: SignFlow) => {
    setIsProgress(true);
    console.log(flow);
    await new Promise((r) => setTimeout(r, 5000)).finally(() => setIsProgress(false));
  }, []);

  return [isProgress, isError, onSubmit, onSnsLogin];
};
