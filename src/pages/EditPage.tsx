import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function EditPage() {
  const [form] = Form.useForm();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getCourse = async () => {
      const res = await axios.get(
        `http://localhost:3000/courses/${id}`
      );

      form.setFieldsValue(res.data);
    };

    getCourse();
  }, [id, form]);

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      await axios.put(
        `http://localhost:3000/courses/${id}`,
        values
      );
    },

    onSuccess: () => {
      toast.success("Cập nhật thành công");
      navigate("/list");
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Cập nhật khóa học
      </h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề",
            },
            {
              min: 5,
              message: "Tối thiểu 5 ký tự",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Thời lượng"
          name="duration"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thời lượng",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Hình ảnh"
          name="thumbnail"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập hình ảnh",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="category"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn danh mục",
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Frontend",
                value: "Frontend",
              },
              {
                label: "Backend",
                value: "Backend",
              },
              {
                label: "Mobile",
                value: "Mobile",
              },
            ]}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={mutation.isPending}
        >
          Cập nhật
        </Button>
      </Form>
    </div>
  );
}

export default EditPage;