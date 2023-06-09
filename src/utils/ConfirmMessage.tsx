import { Modal, ModalFuncProps } from "antd";
import { ReactNode } from "react";
export default async function ConfirmMessage(
  title: string | ReactNode,
  content: string | ReactNode
) {
  return new Promise((resolve) => {
    const config: ModalFuncProps = {
      title: title,
      content: content,
      okButtonProps: { className: "bg-purple-500" },
      onOk: () => {
        resolve(true);
      },
      onCancel: () => {
        resolve(false);
      },
    };
    Modal.confirm(config);
  });
}
