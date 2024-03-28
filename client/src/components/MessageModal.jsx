import { useState } from "react";
import { Modal, Input } from "antd";
import io from "socket.io-client";

const { TextArea } = Input;
const socket = io("http://localhost:3001");

const MessageModal = ({ show, handleClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleSend = async () => {
    if (socket.connected) {
      try {
        socket.emit("admin-message", { text: textAreaValue });
        setConfirmLoading(true);
      } catch (error) {
        console.error(error);
      } finally {
        setConfirmLoading(false);
        handleClose();
      }
    }
  };

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  return (
    <>
      <Modal
        title="Send Message "
        open={show}
        onOk={handleSend}
        confirmLoading={confirmLoading}
        onCancel={handleClose}
      >
        <TextArea rows={4} onChange={handleTextAreaChange} />
      </Modal>
    </>
  );
};

export default MessageModal;
