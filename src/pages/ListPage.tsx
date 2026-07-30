import { useMutation , useQuery, useQueryClient } from "@tanstack/react-query";
import { Button ,  Popconfirm , Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import type { Course } from "../types"
import { useNavigate } from "react-router-dom";


function ListPage() {
  const queryClient = useQueryClient();

  const { data = [] } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/courses");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/courses/${id}`);
    },

    onSuccess: () => {
      toast.success("Xóa thành công");
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
    },
  });

  const navigate = useNavigate();

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
    },
    {
      title: "Thời lượng",
      dataIndex: "duration",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "thumbnail",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
    },
    {
      title: "Action",
      render: (_: any, record: Course) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => navigate(`/edit/${record.id}`)}>Sửa</Button>

          <Popconfirm
            title="Bạn có muốn xóa không?"
            onConfirm={() => mutation.mutate(record.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    </div>
  );
}

export default ListPage;
