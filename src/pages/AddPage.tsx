import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddPage() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      await axios.post("http://localhost:3000/courses", values);
    },

    onSuccess: () => {
      toast.success("Thêm thành công");
      navigate("/list");
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <Form
        layout="vertical"
        className="space-y-6"
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
              message: "Tiêu đề tối thiểu 5 ký tự",
            },
          ]}
        >
          <Input placeholder="Nhập tiêu đề khóa học" />
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
            placeholder="Nhập thời lượng"
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
          <Input placeholder="Nhập URL hình ảnh" />
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
            placeholder="Chọn danh mục"
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
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddPage;