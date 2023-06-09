import { Modal, ModalFuncProps } from "antd";
import { ReactNode } from "react";
type TYPE = "info" | "success" | "error" | "warn" | "warning" | "confirm";
export default async function ShowMessage(
  type: TYPE,
  title: string | ReactNode,
  content: string | ReactNode
) {
  return new Promise((resolve) => {
    const config: ModalFuncProps = {
      type: type,
      title: title,
      content: content,
      okButtonProps: { className: "bg-purple-500" },
      onOk: () => {
        resolve(true);
      },
    };
    if (type === "confirm") {
      Modal.confirm(config);
    } else if (type === "error") {
      Modal.error(config);
    } else if (type === "info") {
      Modal.info(config);
    } else if (type === "success") {
      Modal.success(config);
    } else if (type === "warn" || type === "warning") {
      Modal.warning(config);
    }
  });
}
