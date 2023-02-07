import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';


function PostModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="show-post">Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostPage />
        </Modal>
      )}
    </>
  );
}

export default PostModal;