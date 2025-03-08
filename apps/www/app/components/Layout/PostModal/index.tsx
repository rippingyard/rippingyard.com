import { FC } from 'react';

import { Modal } from '~/components/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const PostModal: FC<Props> = ({ isOpen = false, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpened={isOpen} onClose={onClose}>
      <h1>Post Modal</h1>
    </Modal>
  );
};
