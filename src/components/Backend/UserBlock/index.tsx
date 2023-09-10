import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Modal, Form, Input, message, Select, Upload } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import jwt_decode from "jwt-decode";
import { Slide } from "react-awesome-reveal";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  UserSection,
  ContentWrapper,
} from "./styles"; 

interface User {
  id: number;
  username: string;
  password: string;
  confPassword: string;
  name: string;
  email: string;
  role: string;
  status: string;
  info: any;
}

const UrlUser = 'https://api.whnmandiri.co.id/users';

const User: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const storedLoggedInStatus = localStorage.getItem('isLoggedIn');  
  const accessToken = localStorage.getItem('accessToken');
  let role = '';

  useEffect(() => {
    if (!storedLoggedInStatus || !accessToken) {
      window.location.href = "/login"; // Arahkan ke halaman login jika tidak ada token atau status login
    } else {       
        const decodedToken = jwt_decode(accessToken) as { role?: string };
        if (decodedToken && decodedToken.role) {
          role = decodedToken.role;
        } else {
          console.log('Token tidak ada');
        }

        if (role !== "admin") {
          window.location.href = "/dashboard"; // Arahkan ke halaman dashboard jika bukan admin
        } else {
          fetchData(); // Jika admin, maka ambil data
        }
    }
  }, []);

  //GET User
  const fetchData = async () => {
    try {
      const response = await fetch(UrlUser, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Jika Anda memiliki mekanisme autentikasi
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditModalVisible(false);
    setSelectedUser(null);
    form.resetFields();
    editForm.resetFields();
  };

  const onFinishPost = async (values: User) => {
    try {
      console.log(values);
      await axios.post(UrlUser, values, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Tambahkan header Authorization dengan token bearer
        },
      });
      fetchData();
      message.success("Data Berhasil Ditambah");
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  //UPDATE User
  const handleEdit = (row: User) => {
    setSelectedUser(row);
    setEditModalVisible(true);
    editForm.setFieldsValue({
      username: row.username,
      name: row.name,
      email: row.email,
      role: row.role,
      password: "",
      confPassword: "",
      status: row.status,
    });
  };

  const onFinishEdit = async (values: any) => {
    try {
      await axios.put(UrlUser+`/${selectedUser?.id}`, values, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Tambahkan header Authorization dengan token bearer
        },
      });
      fetchData();
      message.success("Data Berhasil Diubah");
      editForm.resetFields();
      setEditModalVisible(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };
  //DELETE USER
  const handleDelete = async (row: User) => {
    try {
      await fetch(UrlUser+`/${row.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Jika Anda memiliki mekanisme autentikasi
        },
      });

      message.success("Data Berhasil Dihapus");
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const actionColumn = {
    title: 'Aksi',
    key: 'aksi',
    render: (row: User) => (
      <div>
        <Button onClick={() => handleEdit(row)}>Edit</Button>
        <Button onClick={() => handleDelete(row)}>Hapus</Button>
      </div>
    ),
  };

  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  const columnsWithAction = [...columns, actionColumn];

  return (
    <> 
      <UserSection>
        <Slide direction="right">
          <Row justify="center" align="middle">
            <ContentWrapper>
              <Col lg={24} md={24} sm={24} xs={24}>
                <p style={{textAlign: 'center', marginBottom: '16px' }}>Daftar User</p>
                <Button onClick={showModal} style={{marginBottom: '10px' }}>Tambah</Button>
                <Table dataSource={user} columns={columnsWithAction}  />
                <Modal
                  title="Tambah User"
                  visible={isModalVisible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <Form
                    form={form}
                    onFinish={onFinishPost}
                    initialValues={{
                      username: "",
                      name: "",
                      email: "",
                      role:"",
                      password:"",
                      confPassword:"",
                    }}
                  >
                    <Form.Item label="Username" name="username">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Name" name="name">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Role" name="role">
                      <Select>
                        <Select.Option value="admin">admin</Select.Option>
                        <Select.Option value="user">user</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confPassword">
                      <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                      Simpan
                    </Button>
                  </Form>
                </Modal>
                <Modal
                  title="Edit User"
                  visible={editModalVisible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <Form
                    form={editForm}
                    onFinish={onFinishEdit}
                    initialValues={{
                      username: selectedUser?.username,
                      name: selectedUser?.name,
                      email: selectedUser?.email,
                      role: selectedUser?.role,
                      password: "",
                      confPassword:"",
                      status: selectedUser?.status,
                    }}
                  >
                    <Form.Item label="Username" name="username">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Name" name="name">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Role" name="role">
                      <Select>
                        <Select.Option value="admin">admin</Select.Option>
                        <Select.Option value="user">user</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confPassword">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                      <Select>
                        <Select.Option value="Y">Y</Select.Option>
                        <Select.Option value="N">N</Select.Option>
                      </Select>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                      Simpan
                    </Button>
                  </Form>
                </Modal>
              </Col>
            </ContentWrapper>
          </Row>
        </Slide>
      </UserSection>
    </>
  );
};

export default User;