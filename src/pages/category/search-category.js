import { Button, Col, Form, Input, Row, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import categoryService from "../../services/category.service";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteCategoryModal from "./delete-category-modal";

const manipulateTableParamsObject = (tableParams) => {
  return {
    pageNumber: tableParams.pagination.current,
    pageSize: tableParams.pagination.pageSize,
    searchText: tableParams.searchText,
  };
};

const SearchCategory = () => {
  // const searchInput = useRef();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    searchText: "",
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpened(true);
  };

  const onDeleteItemHandler = () => {
    setConfirmLoading(true);
    categoryService
      .delete(selectedItem.id)
      .then(() =>
        toast.success(`Deleted successfully category: ${selectedItem.name}`)
      )
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      })
      .finally(() => {
        setConfirmLoading(false);
        setIsDeleteModalOpened(false);
      });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      responsive: ["lg"],
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Created time",
      dataIndex: "createdTime",
      responsive: ["lg"],
    },
    {
      title: "Modified time",
      dataIndex: "modifiedTime",
      responsive: ["lg"],
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Space>
            <Tooltip title="Edit">
              <Link to={`/category/${item.id}`}>
                <Button type="primary" shape="circle" icon={<EditOutlined />} />
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                type="danger"
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const onSearchFormSubmited = (data) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
      searchText: data.searchText,
    });
  };

  const searchData = () => {
    setLoading(true);
    const params = manipulateTableParamsObject(tableParams);
    categoryService
      .search(params)
      .then((res) => {
        setData(res.data.data);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.data.totalItems,
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    searchData();
  }, [
    tableParams.pagination.pageSize,
    tableParams.searchText,
    tableParams.pagination.current,
  ]);

  const handleTableChange = (pagination) => {
    setTableParams({ ...tableParams, pagination });
  };

  return (
    <>
      <div className="row">
        <h1>List of categories</h1>
      </div>
      <Form
        onFinish={onSearchFormSubmited}
        name="basic"
        initialValues={{ searchText: tableParams.searchText }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={8}>
            <Form.Item label="Search" name="searchText">
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                Search
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <DeleteCategoryModal
        isOpened={isDeleteModalOpened}
        handleOk={onDeleteItemHandler}
        confirmLoading={confirmLoading}
        handleCancel={() => setIsDeleteModalOpened(false)}
      />
    </>
  );
};

export default SearchCategory;
