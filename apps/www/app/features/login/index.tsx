import { Form, useSubmit } from '@remix-run/react';
import { FC, useState } from 'react';
import { ZodError, typeToFlattenedError } from 'zod';

import { Button } from '~/components/Button';
import { Errors } from '~/components/Errors';
import { FormField } from '~/components/FormField';
import { FormInput } from '~/components/FormInput';
import { useLogin } from '~/hooks/firebase/useLogin';
import { Auth } from '~/schemas/auth';
import { containerStyle } from '~/styles/container.css';

export const Login: FC = () => {
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<typeToFlattenedError<Auth, string>>(
    new ZodError<Auth>([]).flatten()
  );
  const submit = useSubmit();

  const emailId = 'email';
  const passwordId = 'password';

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    setErrors(new ZodError<Auth>([]).flatten());
    const formData = new FormData(event.currentTarget);

    const email = (formData.get('email') || '') as string;
    const password = (formData.get('password') || '') as string;

    const { user, token, errors } = await useLogin({
      email,
      password,
    });
    console.log('authedUser', user);

    setErrors(errors);

    if (!user) {
      setPending(false);
      return;
    }

    submit(
      { token, uid: user?.uid || '' },
      {
        method: 'POST',
        action: '/login',
        navigate: false,
        replace: false,
      }
    );

    setPending(false);
  };

  return (
    <Form
      key="login"
      onSubmit={onSubmit}
      className={containerStyle}
      method="post"
      navigate={false}
      replace={false}
    >
      <Errors errors={errors.formErrors} />
      <FormField
        label="メールアドレス"
        id={emailId}
        errors={errors?.fieldErrors?.email}
      >
        <FormInput
          type="email"
          placeholder="メールアドレスを入力"
          id={emailId}
          name={emailId}
          defaultValue=""
        />
      </FormField>
      <FormField
        label="パスワード"
        id={passwordId}
        errors={errors?.fieldErrors?.password}
      >
        <FormInput
          type="password"
          placeholder="パスワードを入力"
          id={passwordId}
          name={passwordId}
          defaultValue=""
        />
      </FormField>
      <FormField>
        <Button color="success" isLoading={pending}>
          ログイン
        </Button>
      </FormField>
    </Form>
  );
};
