import { useState, useContext } from "react";
import { Modal, Input, Select, Tag } from "antd";
import { UsersContext } from "../context/UsersContext";
import io from "socket.io-client";

const { TextArea } = Input;
const { Option } = Select;
const socket = io("http://localhost:3001");

const MessageModal = ({ show, handleClose }) => {
  const users = useContext(UsersContext);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const tagRender = (props) => {
    const { label, closable, onClose } = props;

    return (
      <Tag
        color="blue"
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const handleCloseModal = () => {
    setTextAreaValue("");
    handleClose();
  };

  const handleSend = async () => {
    if (socket.connected) {
      try {
        selectedUsers.forEach((user) => {
          socket.emit("client-side-message", {
            text: textAreaValue,
            userId: user,
          });
        });
        setConfirmLoading(true);
      } catch (error) {
        console.error(error);
      } finally {
        setConfirmLoading(false);
        handleCloseModal();
      }
    }
  };

  return (
    <Modal
      title={
        selectedUsers.length > 0
          ? `Send message to ${selectedUsers.length} users`
          : "Select users"
      }
      open={show}
      onOk={handleSend}
      okText="Send"
      confirmLoading={confirmLoading}
      onCancel={handleCloseModal}
      okButtonProps={{ disabled: textAreaValue.trim() === "" }} // This disables the "OK" button when the text area is empty
    >
      <Select
        mode="multiple"
        tagRender={tagRender}
        style={{ width: "100%", marginBottom: "20px" }}
        onChange={setSelectedUsers}
      >
        {users.map((user) => (
          <Option key={user.uid} value={user.id} avatar={user.avatar}>
            {user.name}
          </Option>
        ))}
      </Select>
      {selectedUsers.length > 0 && (
        <TextArea
          rows={4}
          onChange={(e) => setTextAreaValue(e.target.value)}
          value={textAreaValue}
          placeholder="Enter your message"
        />
      )}
    </Modal>
  );
};

export default MessageModal;
