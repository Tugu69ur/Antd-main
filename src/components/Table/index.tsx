import React, { useState, useEffect } from "react";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { EditOutlined, DeleteOutlined, KeyOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import UserForm from "../userForm";
import dayjs from "dayjs";

const payload = [
  {
      "userId": 1,
      "name": "Alice Smith",
      "email": "alice.smith@example.com",
      "password": "password123",
      "phone": "9876543210",
      "role": "user"
  },
  {
      "userId": 2,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "your_password_here",
      "phone": "1234567890",
      "role": "admin"
  },
  {
      "userId": 3,
      "name": "Bob Johnson",
      "email": "bob.johnson@example.com",
      "password": "securepass456",
      "phone": "5678901234",
      "role": "financiar"
  }
];


type TableListItem = {
  key: number;
  name: string;
  lastname: string;
  role: string;
  register: string;
  age: number;
  gender: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  whoAdded: string;
  approachDate: string;
  entryBorder: string;
  direction: string;
  containerNumber: string;
  capacity: string;
  brokerName: string;
  loadStatus: string;
  forSale: boolean;
  salePrice: number;
  brokerCode: string;
  locationNumber: string;
  fieldDisassembly: string;
  fieldArrival: string;
  disassembled: string;
  released: string;
  loaded: string;
  timeAfterArrival: string;
};

const UserTable: React.FC<{ selectedTable: string | null; searchQuery: string; setTotalUsers: (count: number) => void }> = ({ selectedTable, searchQuery, setTotalUsers }) => {
  useEffect(() => {
    console.log("Selected Table:", selectedTable);
  }, [selectedTable]);
  const [originalData, setOriginalData] = useState<TableListItem[]>([]);
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TableListItem | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        
        switch (selectedTable) {
          case "Ачаа дөхөлт":
            data = payload;
            break;
          case "Үлдэгдэл":
            data = payload;
            break;
          case "Талбайд ирсэнээр":
            data = payload;
            break;
          default:
            data = payload;
        }

        const users = data.map((user: any, index: number) => ({
          key: index,
          name: user.name,
          lastname: user.name,
          role: user.role,
          register: "N/A",
          age: 30,
          gender: "N/A",
          phoneNumber: user.phone,
          email: user.email,
          createdAt: new Date().toISOString(),
          whoAdded: "System",
          approachDate: "N/A",
          entryBorder: "N/A",
          direction: "N/A",
          containerNumber: "N/A",
          capacity: "N/A",
          brokerName: "N/A",
          loadStatus: "N/A",
          forSale: false,
          salePrice: 0,
          brokerCode: "N/A",
          locationNumber: "N/A",
          fieldDisassembly: "N/A",
          fieldArrival: "N/A",
          disassembled: "N/A",
          released: "N/A",
          loaded: "N/A",
          timeAfterArrival: "N/A",
        }));

        setOriginalData(users);
        setDataSource(users);
        setTotalUsers(users.length);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchData();
  }, [setTotalUsers, selectedTable]);

  useEffect(() => {
    if (!searchQuery) {
      setDataSource(originalData);
      setTotalUsers(originalData.length);
      return;
    }

    const lowerValue = searchQuery.toLowerCase();
    const filteredData = originalData.filter((item) =>
      Object.values(item).some((field) => typeof field === "string" && field.toLowerCase().includes(lowerValue))
    );

    setDataSource(filteredData);
    setTotalUsers(filteredData.length);
  }, [searchQuery, originalData, setTotalUsers]);

  const handleEdit = (record: TableListItem) => {
    setSelectedUser(record);
    form.setFieldsValue({
      ...record,
      createdAt: record.createdAt ? dayjs(record.createdAt) : null,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: TableListItem) => {
    console.log("Deleting user:", record);
  };

  const handleKeyAction = (record: TableListItem) => {
    console.log("Key action for user:", record);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log("Updated User Data:", values);
      setIsModalVisible(false);
      setSelectedUser(null);
      form.resetFields();
    });
  };

  const handleView = (record: TableListItem) => {
    console.log("Viewing details for:", record);
    // Add your view logic here
  };

  const columnStyle = {
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '0%',
  };

  const getColumns = () => {
    const baseColumns: ProColumns<TableListItem>[] = [
      { title: "Овог", dataIndex: "name", key: "name" },
      { title: "Нэр", dataIndex: "lastname", key: "lastname" },
      { title: "Үүрэг", dataIndex: "role", key: "role" },
      { title: "Регистрийн дугаар", dataIndex: "register", key: "register" },
      { title: "Нас", dataIndex: "age", key: "age" },
      { title: "Хүйс", dataIndex: "gender", key: "gender" },
      { title: "Утас", dataIndex: "phoneNumber", key: "phoneNumber" },
      { title: "Имейл", dataIndex: "email", key: "email" },
      { title: "Бүртгэсэн огноо", dataIndex: "createdAt", key: "createdAt" },
      { title: "Бүртгэсэн ажилтан", dataIndex: "whoAdded", key: "whoAdded" },
    ];

    switch (selectedTable) {
      case "Ачаа дөхөлт":
        return [
          ...baseColumns,
          { title: "Ачаа дөхөлтийн дугаар", dataIndex: "cargoApproachId", key: "cargoApproachId" },
          { title: "Огноо", dataIndex: "date", key: "date" },
        ];
      case "Үлдэгдэл":
        return [
          { 
            title: "Дөхөлт огноо", 
            dataIndex: "approachDate", 
            key: "approachDate",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Орох хил", 
            dataIndex: "entryBorder", 
            key: "entryBorder",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Ирэх/Явах", 
            dataIndex: "direction", 
            key: "direction",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Чингэлэг дугаар", 
            dataIndex: "containerNumber", 
            key: "containerNumber",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Даац", 
            dataIndex: "capacity", 
            key: "capacity",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Зуучийн нэр", 
            dataIndex: "brokerName", 
            key: "brokerName",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Хоосон/Ачаатай", 
            dataIndex: "loadStatus", 
            key: "loadStatus",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Зарах эсэх", 
            dataIndex: "forSale", 
            key: "forSale",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Зарах үнэ", 
            dataIndex: "salePrice", 
            key: "salePrice",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Зууч код", 
            dataIndex: "brokerCode", 
            key: "brokerCode",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Байр №", 
            dataIndex: "locationNumber", 
            key: "locationNumber",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Талбайд задарсан", 
            dataIndex: "fieldDisassembly", 
            key: "fieldDisassembly",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Талбайд ирсэн", 
            dataIndex: "fieldArrival", 
            key: "fieldArrival",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Задарсан", 
            dataIndex: "disassembled", 
            key: "disassembled",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Суларсан", 
            dataIndex: "released", 
            key: "released",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Ачилт хийсэн", 
            dataIndex: "loaded", 
            key: "loaded",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          { 
            title: "Талбайд ирсэнээс хойш", 
            dataIndex: "timeAfterArrival", 
            key: "timeAfterArrival",
            onHeaderCell: () => ({
              style: columnStyle
            })
          },
          {
            title: "Үйлдэл",
            key: "action",
            onHeaderCell: () => ({
              style: columnStyle
            }),
            render: (_: any, record: TableListItem) => (
              <Button 
                type="primary" 
                icon={<EyeOutlined />} 
                size="large" 
                style={{ 
                  background: '#ffffff',
                  color: "#344054", 
                  boxShadow: 'none' 
                }} 
                onClick={() => handleView(record)} 
              />
            ),
          },
        ];
      case "Талбайд ирсэнээр":
        return [
          ...baseColumns,
          { title: "Ирсэн огноо", dataIndex: "arrivalDate", key: "arrivalDate" },
          { title: "Байршил", dataIndex: "location", key: "location" },
        ];
      default:
        return baseColumns;
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: "Үйлдэл",
      key: "action",
      render: (_, record) => (
        <Button.Group>
          <Button type="primary" icon={<EditOutlined />} size="large" style={{ background: '#ffffff' ,color: "#344054", boxShadow: 'none'  }} onClick={() => handleEdit(record)} />
          <Button type="primary" icon={<DeleteOutlined />} size="large" style={{ background: '#ffffff', color: "#344054", boxShadow: 'none'  }} onClick={() => handleDelete(record)} />
          <Button type="primary" icon={<KeyOutlined />} size="large" style={{ background: '#ffffff', color: "#344054", boxShadow: 'none' }} onClick={() => handleKeyAction(record)} />
        </Button.Group>
      ),
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        columns={getColumns()}
        dataSource={dataSource}
        rowKey="key"
        options={false}
        search={false}
        pagination={{ pageSize: 10 }}
        style={{ marginTop: 20 }}
      />

      <UserForm isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} form={form} />
    </>
  );
};

export default UserTable;
