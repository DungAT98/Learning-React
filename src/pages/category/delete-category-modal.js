import { Button, Modal } from "antd";
import React from "react";
import PropTypes from "prop-types";

const DeleteCategoryModal = ({
  title = "Confirm",
  isOpened,
  handleOk,
  handleCancel,
  confirmLoading = false,
}) => {
  return (
    <Modal
      title={title}
      open={isOpened}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="danger"
          loading={confirmLoading}
          onClick={handleOk}
        >
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure want to delete?</p>
    </Modal>
  );
};

DeleteCategoryModal.propTypes = {
  title: PropTypes.string,
  isOpened: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool,
};

export default DeleteCategoryModal;
