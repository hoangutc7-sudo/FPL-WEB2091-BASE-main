import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Space, Table } from "antd";
import axios from "axios";

function ListPage() {
  const queryClient = useQueryClient();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "title",
      dataIndex: "title",
    },
    {
      title: "duration",
      dataIndex: "duration",
    },
    {
      title: "thumbnail",
      dataIndex: "thumbnail",
    },
    {
      title: "category",
      dataIndex: "category",
    },
    {
      title: "Actions",
      render: (record: any) => {
        return (
          <Space>
            <Button
              type="link"
              href={`/edit/${record.id}`}
            >
              Edit
            </Button>
            <Popconfirm
              title="Xóa khóa học?"
              onConfirm={() => mutate(record.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const { data } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/courses");
      return res.data;
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete("http://localhost:3000/courses/" + id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
    },
  });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Danh sách
      </h1>

      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
        />
      </div>
    </div>
  );
}

export default ListPage;