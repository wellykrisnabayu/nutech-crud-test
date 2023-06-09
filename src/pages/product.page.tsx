import { Button, Col, Image, Row, Table, Typography } from "antd";
import React, { lazy, useState } from "react";
import {
  DeleteOutlined,
  HighlightOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ACTION } from "../components/maintenance-product.component";
import { useRecoilState } from "recoil";
import { productState } from "../atoms/productState";
import ConfirmMessage from "../utils/ConfirmMessage";

const ProductPage: React.FC = () => {
  const [data, setData] = useRecoilState(productState);
  const [maintenance, setMaintenance] = useState<{
    show: boolean;
    action: ACTION;
    id?: string;
  }>({ show: false, action: "" });
  async function onClikHandle(action: ACTION, id?: string) {
    if (action === "NEW") {
      setMaintenance((old) => ({
        ...old,
        id: undefined,
        action: "NEW",
        show: true,
      }));
    } else if (action === "UPDATE") {
      setMaintenance((old) => ({
        ...old,
        id: id,
        action: "UPDATE",
        show: true,
      }));
    } else if (action === "DELETE") {
      const confirm = await ConfirmMessage(
        "Konfirmasi",
        "Anda ingin menghapus data?"
      );
      if (confirm) {
        setData((old) => {
          const value = [...old.filter((p) => p.id !== id)];
          return value;
        });
      }
    }
  }

  function onCloseMaintenance() {
    setMaintenance({ show: false, action: "", id: undefined });
  }
  return (
    <div className="w-9/12">
      <Row gutter={[8, 8]} justify={"start"}>
        <Col span={24}>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            className="bg-purple-500"
            onClick={() => {
              onClikHandle("NEW");
            }}
          />
        </Col>
        <Col span={24}>
          <Table
            rowKey={"id"}
            columns={[
              {
                title: "Nama Barang",
                dataIndex: "namaBarang",
                key: "namaBarang",
              },
              {
                title: "Harga Beli",
                dataIndex: "hargaBeli",
                key: "hargaBeli",
                render(value, record, index) {
                  return (
                    <Typography>
                      Rp.{" "}
                      {Number(value).toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}
                    </Typography>
                  );
                },
              },
              {
                title: "Harga Jual",
                dataIndex: "hargaJual",
                key: "hargaJual",
                render(value, record, index) {
                  return (
                    <Typography>
                      Rp.{" "}
                      {Number(value).toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}
                    </Typography>
                  );
                },
              },
              {
                title: "Stock",
                dataIndex: "stock",
                key: "stock",
                render(value, record, index) {
                  return (
                    <Typography>
                      {Number(value).toLocaleString("id-ID")}
                    </Typography>
                  );
                },
              },
              {
                title: "Image",
                dataIndex: "image",
                key: "image",
                render(value, record, index) {
                  return (
                    <div className="w-full flex items-center justify-center">
                      <Image
                        src={value}
                        alt={String(index)}
                        height={50}
                        width={50}
                      />
                    </div>
                  );
                },
              },
              {
                title: "Action",
                dataIndex: "",
                key: "",
                render(value, record, index) {
                  return (
                    <Row gutter={8} justify={"center"}>
                      <Col span={8}>
                        <Button
                          block
                          onClick={() => {
                            onClikHandle("UPDATE", record.id);
                          }}
                          type="primary"
                          className="bg-teal-600"
                          icon={<HighlightOutlined />}
                        />
                      </Col>
                      <Col span={8}>
                        <Button
                          block
                          type="primary"
                          danger
                          onClick={() => {
                            onClikHandle("DELETE", record.id);
                          }}
                          icon={<DeleteOutlined />}
                        />
                      </Col>
                    </Row>
                  );
                },
              },
            ]}
            dataSource={data}
            scroll={{
              x: 500,
              y: 500,
            }}
          />
        </Col>
      </Row>
      <MaintenanceProduct
        open={maintenance.show}
        action={maintenance.action}
        id={maintenance.id}
        onCancel={onCloseMaintenance}
        width={900}
        exit={onCloseMaintenance}
      />
    </div>
  );
};
const MaintenanceProduct = lazy(
  () => import("../components/maintenance-product.component")
);
export default ProductPage;
