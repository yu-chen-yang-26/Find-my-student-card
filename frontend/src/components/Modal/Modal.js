import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import api from "../../api";
import bcrypt from "bcryptjs";
const PasswordModal = ({ open, onCancel, onConfirm }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState(0);
  const handleConfirm = async () => {
    const salt = "$2a$10$kD.dDtPBQUelsXx4zOBoXO";
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    await api
      .post(
        "/change/password",
        { password: hashedPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.result) {
          setNewPassword("");
          setStatus(0);
          onConfirm();
        }
      })
      .catch((err) => console.log(err));
  };
  const handleNext = async () => {
    const salt = "$2a$10$kD.dDtPBQUelsXx4zOBoXO";
    const hashedPassword = bcrypt.hashSync(password, salt);
    await api
      .get("/check/password", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        params: { password: hashedPassword },
      })
      .then((response) => {
        if (response.data.result) {
          setPassword("");
          setStatus(1);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Reset password"
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            setStatus(0);
            onCancel();
          }}
        >
          Cancel
        </Button>,
        status ? (
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            Done
          </Button>
        ) : (
          <Button key="confirm" type="primary" onClick={handleNext}>
            Next
          </Button>
        ),
      ]}
    >
      {!status ? (
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Please enter current password"
          style={{ marginBottom: "2vmin" }}
        />
      ) : (
        <Input.Password
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Please enter new password"
        />
      )}
    </Modal>
  );
};

export default PasswordModal;
