import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getUsersByPostLikes } from "../../services/postService";

function LikesModal({ showLikes, setShowLikes, postId }) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUsersByPostLikes(postId)
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleModalClose() {
    setShowLikes(false);
  }

  return (
    <Modal show={showLikes} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Likes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {users &&
            users.map((user, i) => {
              return (
                <li key={i}>
                  {/* <img src={user.avatar} alt={user.name} /> */}
                  <p>{user.username}</p>
                </li>
              );
            })}
        </ul>
      </Modal.Body>
    </Modal>
  );
}

export default LikesModal;
