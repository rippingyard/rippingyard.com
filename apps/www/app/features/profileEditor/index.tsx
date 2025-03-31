import { FC, useCallback, useMemo, useState } from 'react';
import { Form, useNavigation } from 'react-router';
import { typeToFlattenedError } from 'zod';

import { Button } from '~/components/Button';
import { FormField } from '~/components/FormField';
import { FormInput } from '~/components/FormInput';
import { Wysiwyg } from '~/components/Wysiwyg';
import { User } from '~/schemas/user';

import { AvatarEditor } from './avatarEditor';
import {
  bodyStyle,
  containerStyle,
  footerStyle,
  headerAvatarStyle,
  headerNameStyle,
  headerStyle,
  // labelStyle,
} from './style.css';

type Props = {
  user: User;
  errors?: typeToFlattenedError<User, string>;
  action?: string;
};

export const ProfileEditor: FC<Props> = ({
  user,
  errors,
  action = '/home/profile',
}) => {
  const navigation = useNavigation();

  const isLoading = useMemo(
    () => navigation.formAction === action && navigation.state === 'submitting',
    [action, navigation.formAction, navigation.state]
  );

  const [profile, setProfile] = useState(user.profile || '');
  const [avatar, setAvatar] = useState(user.avatar || '');

  const uploadpath = `users/${user.uid}/`;

  const onUpdateProfile = useCallback((content: string) => {
    setProfile(content);
  }, []);

  return (
    <Form method="POST" action={action} className={containerStyle}>
      <input type="hidden" name="profile" value={profile} />
      <input type="hidden" name="avatar" value={avatar} />

      <header className={headerStyle}>
        <div className={headerNameStyle}>
          <FormField
            label="表示名"
            id="displayName"
            errors={errors?.fieldErrors?.displayName}
          >
            <FormInput
              name="displayName"
              id="displayName"
              defaultValue={user?.displayName || ''}
              hasBorder={false}
              isBold
              isHeading
            />
          </FormField>
        </div>
        <div className={headerAvatarStyle}>
          <AvatarEditor
            avatar={avatar}
            uploadpath={uploadpath}
            onUpdate={setAvatar}
          />
        </div>
      </header>

      <section className={bodyStyle}>
        <FormField
          label="アカウント名"
          id="userName"
          errors={errors?.fieldErrors?.userName}
        >
          <FormInput
            name="userName"
            id="userName"
            defaultValue={user?.userName || ''}
            // hasBorder={false}
          />
        </FormField>

        <FormField
          label="プロフィール"
          id="profile"
          errors={errors?.fieldErrors?.profile}
        >
          <Wysiwyg content={profile} onUpdate={onUpdateProfile} />
        </FormField>
      </section>

      <footer className={footerStyle}>
        <Button
          name="status"
          value="published"
          disabled={isLoading}
          isLoading={isLoading}
          isWide
          color="success"
        >
          更新
        </Button>
      </footer>
    </Form>
  );
};
