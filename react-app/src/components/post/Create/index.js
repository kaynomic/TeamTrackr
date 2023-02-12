import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreatePostForm from './CreatePostForm';

function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="create-post">Create Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePostForm />
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;