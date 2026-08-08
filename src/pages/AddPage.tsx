import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Select, message  } from "antd";
import axios from "axios";

function AddPage() {
  const onFinish = (data: any) => {
    mutate(data);
  };

  const { mutate } = useMutation({
  mutationFn: async (data: any) => {
    return await axios.post("http://localhost:3000/courses", data);
  },
  onSuccess: () => {
    message.success("Thêm khóa học thành công");
  },
  onError: () => {
    message.error("Thêm khóa học thất bại");
  },
});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <Form
        layout="vertical"
        className="space-y-6"
        onFinish={onFinish}
      >
        {/* Text input */}
        <Form.Item
          label="title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập thông tin" />
        </Form.Item>

        {/* Text input */}
        <Form.Item
          label="duration"
          name="duration"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập thông tin" />
        </Form.Item>

        <Form.Item
          label="thumbnail"
          name="thumbnail"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập link ảnh" />
        </Form.Item>

        {/* Select */}
        <Form.Item
          label="Danh mục"
          name="category"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Chọn danh mục"
            options={[
              {
                value: "JS",
                label: "JS",
              },
              {
                value: "React",
                label: "React",
              },
              {
                value: "NodeJS",
                label: "NodeJS",
              },
            ]}
          />
        </Form.Item>
        {/* Submit button */}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddPage;