import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Modal, Form, Input, message, Select, Upload, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Slide } from "react-awesome-reveal";
import axios from "axios";
import moment from "moment";
import {
  CustomerSection,
  ContentWrapper,
} from "./styles"; 

interface Customer {
  id_customer: number;
  tenant_id: string;
  nama_customer: string;
  email: string;
  nik: string;
  kk: string;  
  agama_id: string;
  tempat_lahir: string;
  tgl_lahir: string;
  gender_id: string;
  pekerjaan_id: string;
  alamat: string;
  status_id: string;
  info: any;
}

const UrlCustomer = 'http://localhost:5000/customers';

const Customer: React.FC = () => {
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const storedLoggedInStatus = localStorage.getItem('isLoggedIn');  
  const accessToken = localStorage.getItem('accessToken');
  const { Option } = Select;
  const [agamaOptions, setAgamaOptions] = useState<any[]>([]);
  const [genderOptions, setGenderOptions] = useState<any[]>([]);
  const [pekerjaanOptions, setPekerjaanOptions] = useState<any[]>([]);
  const [statusOptions, setStatusOptions] = useState<any[]>([]);

  useEffect(() => {
    if (!storedLoggedInStatus && !accessToken) {
      window.location.href = "/login";
    }
    fetchData();
    fetchAgamaData();
    fetchGenderData();
    fetchPekerjaanData();
    fetchStatusData();
  }, []);

  const fetchAgamaData = async () => {
    try {
      const response = await fetch('http://localhost:5000/agama', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${accessToken}`, // If you have authentication
        },
      });
      const data = await response.json();
      setAgamaOptions(data);
    } catch (error) {
      console.error('Error fetching agama data:', error);
    }
  };

  const fetchGenderData = async () => {
    try {
      const response = await fetch('http://localhost:5000/gender', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${accessToken}`, // If you have authentication
        },
      });
      const data = await response.json();
      setGenderOptions(data);
    } catch (error) {
      console.error('Error fetching gender data:', error);
    }
  };

  const fetchPekerjaanData = async () => {
    try {
      const response = await fetch('http://localhost:5000/pekerjaan', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${accessToken}`, // If you have authentication
        },
      });
      const data = await response.json();
      setPekerjaanOptions(data);
    } catch (error) {
      console.error('Error fetching pekerjaan data:', error);
    }
  };

  const fetchStatusData = async () => {
    try {
      const response = await fetch('http://localhost:5000/status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${accessToken}`, // If you have authentication
        },
      });
      const data = await response.json();
      setStatusOptions(data);
    } catch (error) {
      console.error('Error fetching status data:', error);
    }
  };

  //GET 
  const fetchData = async () => {
    try {
      const response = await fetch(UrlCustomer, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${accessToken}`, // Jika Anda memiliki mekanisme autentikasi
        },
      });
      const data = await response.json();
      setCustomer(data);
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
    setSelectedCustomer(null);
    form.resetFields();
    editForm.resetFields();
  };

  const onFinishPost = async (values: Customer) => {
    try {
      console.log(values);
      await axios.post(UrlCustomer, values);
      fetchData();
      message.success("Data Berhasil Ditambah");
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  //UPDATE
  const handleEdit = (row: Customer) => {
    setSelectedCustomer(row);
    setEditModalVisible(true);
    editForm.setFieldsValue({
      tenant_id: row.tenant_id,
      nama_customer: row.nama_customer,
      email: row.email,
      nik: row.nik,
      kk: row.kk,
      agama_id: row.agama_id,
      tempat_lahir: row.tempat_lahir,
      tgl_lahir: moment(row.tgl_lahir, "YYYY-MM-DD"),
      gender_id: row.gender_id,
      pekerjaan_id: row.pekerjaan_id,
      alamat: row.alamat,
      status_id: row.status_id
    });
  };

  const onFinishEdit = async (values: any) => {
    try {
      await axios.put(UrlCustomer+`/${selectedCustomer?.id_customer}`, values);
      fetchData();
      message.success("Data Berhasil Diubah");
      editForm.resetFields();
      setEditModalVisible(false);
      setSelectedCustomer(null);
    } catch (error) {
      console.error('Error editing customer:', error);
    }
  };
  //DELETE
  const handleDelete = async (row: Customer) => {
    try {
      await fetch(UrlCustomer+`/${row.id_customer}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${accessToken}`, // Jika Anda memiliki mekanisme autentikasi
        },
      });

      message.success("Data Berhasil Dihapus");
      fetchData();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const actionColumn = {
    title: 'Aksi',
    key: 'aksi',
    render: (row: Customer) => (
      <div>
        <Button onClick={() => handleEdit(row)}>Edit</Button>
        <Button onClick={() => handleDelete(row)}>Hapus</Button>
      </div>
    ),
  };

  const columns = [
    { title: "Tenant ID", dataIndex: "tenant_id", key: "tenant_id" },
    { title: "Nama Customers", dataIndex: "nama_customer", key: "nama_customer" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "NIK", dataIndex: "nik", key: "nik" },
    { title: "KK", dataIndex: "kk", key: "kk" },
    {
      title: "Agama",
      dataIndex: "agama_id",
      key: "agama_id",
      render: (agamaId: string) => {
        const agama = agamaOptions.find((agama) => agama.id_agama === agamaId);
        return agama ? agama.desc_agama : agamaId;
      },
    },
    { title: "Tempat Lahir", dataIndex: "tempat_lahir", key: "tempat_lahir" },
    { title: "Tanggal Lahir", dataIndex: "tgl_lahir", key: "tgl_lahir" },
    {
      title: "Gender",
      dataIndex: "gender_id",
      key: "gender_id",
      render: (genderId: string) => {
        const gender = genderOptions.find((gender) => gender.id_gender === genderId);
        return gender ? gender.desc_gender : genderId;
      },
    },
    {
      title: "Pekerjaan",
      dataIndex: "pekerjaan_id",
      key: "pekerjaan_id",
      render: (pekerjaanId: string) => {
        const pekerjaan = pekerjaanOptions.find((pekerjaan) => pekerjaan.id_pekerjaan === pekerjaanId);
        return pekerjaan ? pekerjaan.desc_pekerjaan : pekerjaanId;
      },
    },
    { title: "Alamat", dataIndex: "alamat", key: "alamat" },
    {
      title: "Status",
      dataIndex: "status_id",
      key: "status_id",
      render: (statusId: string) => {
        const status = statusOptions.find((status) => status.id_status === statusId);
        return status ? status.desc_status : statusId;
      },
    },
  ];

  const columnsWithAction = [...columns, actionColumn];

  return (
    <> 
      <CustomerSection>
          <Row justify="center">
            <Col lg={24} md={24} sm={24} xs={24}>
            <p style={{textAlign: 'center', marginBottom: '16px' }}>Daftar Customer</p>
            <Button onClick={showModal} style={{marginBottom: '10px', marginLeft: '3px' }}>Tambah</Button>
            <ContentWrapper>
                <Table dataSource={customer} columns={columnsWithAction}  />
                <Modal
                  title="Tambah Customer"
                  visible={isModalVisible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <Form
                    form={form}
                    onFinish={onFinishPost}
                    initialValues={{
                      tenant_id: "",
                      nama_customer: "",
                      email: "",
                      nik: "",
                      kk: "",
                      agama_id: "",
                      tempat_lahir: "",
                      tgl_lahir: "",
                      gender_id: "",
                      pekerjaan_id: "",
                      alamat: ""
                    }}
                  >
                    <Form.Item label="Tenant ID" name="tenant_id">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Nama Customer" name="nama_customer">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input />
                    </Form.Item>
                    <Form.Item label="NIK" name="nik">
                      <Input />
                    </Form.Item>
                    <Form.Item label="KK" name="kk">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Agama" name="agama_id">
                      <Select>
                        {agamaOptions.map((agama) => (
                          <Option key={agama.id_agama} value={agama.id_agama}>
                            {agama.desc_agama}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Tempat Lahir" name="tempat_lahir">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Tanggal Lahir" name="tgl_lahir">
                      <DatePicker />
                    </Form.Item>
                    <Form.Item label="Gender" name="gender_id">
                      <Select>
                        {genderOptions.map((gender) => (
                          <Option key={gender.id_gender} value={gender.id_gender}>
                            {gender.desc_gender}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Pekerjaan" name="pekerjaan_id">
                      <Select>
                        {pekerjaanOptions.map((pekerjaan) => (
                          <Option key={pekerjaan.id_pekerjaan} value={pekerjaan.id_pekerjaan}>
                            {pekerjaan.desc_pekerjaan}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Alamat" name="alamat">
                      <Input.TextArea />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                      Simpan
                    </Button>
                  </Form>
                </Modal>
                <Modal
                  title="Edit Customer"
                  visible={editModalVisible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <Form
                    form={editForm}
                    onFinish={onFinishEdit}
                    initialValues={{
                      tenant_id: selectedCustomer?.tenant_id,
                      nama_customer: selectedCustomer?.nama_customer,
                      email: selectedCustomer?.email,
                      nik: selectedCustomer?.nik,
                      kk: selectedCustomer?.kk,
                      agama_id: selectedCustomer?.agama_id,
                      tempat_lahir: selectedCustomer?.tempat_lahir,
                      tgl_lahir: moment(selectedCustomer?.tgl_lahir, "YYYY-MM-DD"),
                      gender_id: selectedCustomer?.gender_id,
                      pekerjaan_id: selectedCustomer?.pekerjaan_id,
                      alamat: selectedCustomer?.alamat,
                      status_id: selectedCustomer?.status_id,
                    }}
                  >
                    <Form.Item label="Tenant ID" name="tenant_id">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Nama Customer" name="nama_customer">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input />
                    </Form.Item>
                    <Form.Item label="NIK" name="nik">
                      <Input />
                    </Form.Item>
                    <Form.Item label="KK" name="kk">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Agama" name="agama_id">
                      <Select>
                        {agamaOptions.map((agama) => (
                          <Option key={agama.id_agama} value={agama.id_agama}>
                            {agama.desc_agama}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Tempat Lahir" name="tempat_lahir">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Tanggal Lahir" name="tgl_lahir">
                      <DatePicker />
                    </Form.Item>
                    <Form.Item label="Gender" name="gender_id">
                      <Select>
                        {genderOptions.map((gender) => (
                          <Option key={gender.id_gender} value={gender.id_gender}>
                            {gender.desc_gender}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Pekerjaan" name="pekerjaan_id">
                      <Select>
                        {pekerjaanOptions.map((pekerjaan) => (
                          <Option key={pekerjaan.id_pekerjaan} value={pekerjaan.id_pekerjaan}>
                            {pekerjaan.desc_pekerjaan}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Alamat" name="alamat">
                      <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Status" name="status_id">
                      <Select>
                        {statusOptions.map((status) => (
                          <Option key={status.id_status} value={status.id_status}>
                            {status.desc_status}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                      Simpan
                    </Button>
                  </Form>
                </Modal>
            </ContentWrapper>
            </Col>
          </Row>
      </CustomerSection>
    </>
  );
};

export default Customer;