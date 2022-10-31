import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import categoryService from "../../services/category.service";
import { toast } from "react-toastify";
import { Button, Form, Input } from "antd";

export async function categoryIdLoader({ params }) {
  return params.categoryId;
}

const CategoryDetail = () => {
  const categoryId = useLoaderData();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [entityData, setEntityData] = useState();
  const isAdded = categoryId === "add";

  useEffect(() => {
    if (!isAdded) {
      categoryService
        .getById(categoryId)
        .then((res) => {
          form.setFieldsValue(res.data);
          setEntityData(res.data);
        })
        .catch((err) => {
          toast.error(err.message);
          navigate("/category");
        });
    }
  }, []);

  const onFinish = (formData) => {
    console.log(formData);
    const updatedData = { ...entityData, ...formData };
    categoryService[isAdded ? "create" : "update"](updatedData)
      .then(() => {
        toast.success(
          `${isAdded ? "Created" : "Updated"} category successfully`
        );
        navigate("/category");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <h1>{(isAdded ? "Create" : "Edit") + " category"}</h1>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        // wrapperCol={{ span: 10 }}
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CategoryDetail;
