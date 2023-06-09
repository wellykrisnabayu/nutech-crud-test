import {
  Form,
  Input,
  InputNumber,
  Modal,
  ModalProps,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { productState } from "../atoms/productState";
import { PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { ProductModel } from "../models/product.model";
import ShowMessage from "../utils/ShowMessage";
export type ACTION = "NEW" | "UPDATE" | "DELETE" | "";

interface maintenanceprops extends ModalProps {
  action: ACTION;
  id?: string;
  exit: () => void;
}
const formItem = ["namaBarang", "hargaJual", "hargaBeli", "stock"] as const;
const MaintenanceProduct: React.FC<maintenanceprops> = ({
  action,
  id,
  exit,
  ...props
}) => {
  const [data, setData] = useRecoilState(productState);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [imageUrl, setImageUrl] = useState<string>();
  useEffect(() => {
    if (action === "UPDATE") {
      resetForm();
      setImageUrl(undefined);
      const product = data.find((p) => p.id === id);
      if (product) {
        form.setFieldsValue({
          namaBarang: product.namaBarang,
          hargaJual: product.hargaJual,
          hargaBeli: product.hargaBeli,
          stock: product.stock,
        });
        setImageUrl(product.image);
      }
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  async function onOk() {
    if (action === "NEW") {
      const valid = await validate();
      if (valid) {
        const { hargaBeli, hargaJual, namaBarang, stock } = getFieldsValue();
        setData((old) => {
          const newData: ProductModel = {
            id: uuidv4(),
            hargaBeli: hargaBeli!,
            hargaJual: hargaJual!,
            namaBarang: namaBarang!,
            stock: Number(stock ?? "0"),
            image: imageUrl!,
          };
          return [...old, newData];
        });
        await ShowMessage(
          "success",
          "Berhasil!",
          "Berhasil menambahkan produk!"
        );
        resetForm();
        exit();
      }
    } else if (action === "UPDATE") {
      const valid = await validate();
      if (valid) {
        const { hargaBeli, hargaJual, namaBarang, stock } = getFieldsValue();
        setData((old) => {
          const newData: ProductModel = {
            id: id!,
            hargaBeli: hargaBeli!,
            hargaJual: hargaJual!,
            namaBarang: namaBarang!,
            stock: Number(stock ?? "0"),
            image: imageUrl!,
          };
          const tmpList = [...old];
          const index = tmpList.findIndex((p) => p.id === id);
          tmpList[index] = newData;
          return [...tmpList];
        });
        await ShowMessage("success", "Berhasil!", "Berhasil mengubah produk!");
        resetForm();
        exit();
      }
    }
  }
  function getFieldsValue() {
    type tmpType = (typeof formItem)[number];
    const result: { [key in tmpType]?: string } = {};
    for (const item of formItem) {
      result[item] = form.getFieldValue(item);
    }
    return result;
  }
  function resetForm() {
    setImageUrl(undefined);
    form.resetFields([...formItem]);
  }
  async function validate() {
    const { namaBarang, hargaBeli, hargaJual, stock } = getFieldsValue();
    if (!namaBarang || namaBarang === "") {
      await ShowMessage(
        "warning",
        "Peringatan!",
        "Nama Barang tidak boleh kosong!"
      );
      return false;
    }
    if (
      isNaN(Number(hargaBeli)) ||
      isNaN(Number(hargaJual)) ||
      isNaN(Number(stock))
    ) {
      await ShowMessage(
        "warning",
        "Peringatan!",
        "Harga barang, Harga jual, dan stock harus angka!"
      );
      return false;
    }
    return true;
  }
  return (
    <Modal
      title={`Maintenance Product - (${action})`}
      {...props}
      okButtonProps={{
        className: "bg-purple-500",
      }}
      onCancel={() => {
        resetForm();
        exit();
      }}
      maskClosable={false}
      onOk={onOk}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        colon={false}
        labelAlign="left"
        wrapperCol={{ span: 10 }}
        className="py-4"
      >
        <Form.Item label="Nama Barang" name={"namaBarang"}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Harga Beli"
          name={"hargaBeli"}
          wrapperCol={{ span: 6 }}
        >
          <InputNumber<string>
            controls={false}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            className="w-full"
            min="0"
          />
        </Form.Item>
        <Form.Item
          label="Harga Jual"
          name={"hargaJual"}
          wrapperCol={{ span: 6 }}
        >
          <InputNumber<string>
            controls={false}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            className="w-full"
            min="0"
          />
        </Form.Item>
        <Form.Item label="Stock" name={"stock"} wrapperCol={{ span: 4 }}>
          <InputNumber controls className="w-full" min={0} />
        </Form.Item>
        <Form.Item label="Image" wrapperCol={{ span: 4 }}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            accept="image/png, image/jpeg"
            beforeUpload={(file) => {
              let isValid =
                file.type === "image/png" || file.type === "image/jpeg";
              setImageUrl(undefined);
              if (!isValid) {
                messageApi.error(`${file.name} is not png / jpg file.`);
                return false;
              }
              isValid = file.size <= 100000;
              if (!isValid) {
                messageApi.error(`${file.name} is to large more then 100kb.`);
                return false;
              }
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                setImageUrl(reader.result as string);
              };
              return true;
            }}
            withCredentials={false}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

const uploadButton = (
  <div>
    {<PlusOutlined />}
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export default MaintenanceProduct;
