import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditPage() {
  const [form] = Form.useForm();
  const { id } = useParams();

  useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/courses/" + id);
      form.setFieldsValue(res.data);
      return res.data;
    },
  });

  const onFinish = (data: any) => {
    mutate(data);
  };

  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await axios.put("http://localhost:3000/courses/" + id,data);
    },
    onSuccess: () => {
      message.success("Cập nhật khóa học thành công");
    },
    onError: () => {
      message.error("Cập nhật khóa học thất bại");
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Cập nhật khóa học
      </h1>

      <Form
        form={form}
        layout="vertical"
        className="space-y-6"
        onFinish={onFinish}
      >
        <Form.Item
          label="title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập thông tin" />
        </Form.Item>

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

        

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}

export default EditPage;