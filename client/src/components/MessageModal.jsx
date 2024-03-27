import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import io from "socket.io-client";

const { TextArea } = Input;
const socket = io("http://localhost:3001");

const MessageModal = ({ show, handleClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleOk = async () => {
    setModalText("Sending message...");
    setConfirmLoading(true);

    if (socket.connected) {
      try {
        socket.emit("admin-message", { text: textAreaValue });
        console.log("Message sent");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  console.log(modalText);

  return (
    <>
      <Modal
        title="Send Message "
        open={show}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleClose}
      >
        <TextArea rows={4} onChange={handleTextAreaChange} />
      </Modal>
    </>
  );
};

export default MessageModal;
