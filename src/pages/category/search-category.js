import { Button, Col, Form, Input, Row, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import categoryService from "../../services/category.service";
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteCategoryModal from "./delete-category-modal";
import ReactTimeAgo from "react-time-ago";

const manipulateTableParamsObject = (tableParams) => {
  return {
    pageNumber: tableParams.pagination.current,
    pageSize: tableParams.pagination.pageSize,
    searchText: tableParams.searchText,
  };
};

const SearchCategory = () => {
  const [reloadTable, setReloadTable] = useState(false);
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
        setReloadTable((prev) => !prev);
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
      render: (item) => {
        return (
          item &&
          item.createdTime && (
            <ReactTimeAgo date={new Date(item.createdTime)} locale="en-US" />
          )
        );
      },
      responsive: ["lg"],
    },
    {
      title: "Modified time",
      render: (item) => {
        return (
          item &&
          item.modifiedTime && (
            <ReactTimeAgo date={new Date(item.modifiedTime)} locale="en-US" />
          )
        );
      },
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
                onClick={() => handleDelete(item)}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const onSearchFormSubmitted = (data) => {
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
    reloadTable,
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
        onFinish={onSearchFormSubmitted}
        name="basic"
        initialValues={{ searchText: tableParams.searchText }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col span={8}>
            <Form.Item label="Search" name="searchText">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Space>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                >
                  Search
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to="add">
                  <Button htmlType="button" icon={<FileAddOutlined />}>
                    Add New
                  </Button>
                </Link>
              </Form.Item>
            </Space>
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
