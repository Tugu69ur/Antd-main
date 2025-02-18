import React, { useState, useEffect } from "react";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import Delete from "../hucingui";
import {
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Form, Switch, Modal } from "antd";
import UserForm from "../userForm";
import dayjs from "dayjs";
import { Color } from "antd/es/color-picker";

const payload = [
  {
    userId: 1,
    name: "Alice Smith",
    email: "alice.smith@example.com",
    password: "password123",
    phone: "9876543210",
    role: "user",
  },
  {
    userId: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "your_password_here",
    phone: "1234567890",
    role: "admin",
  },
  {
    userId: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    password: "securepass456",
    phone: "5678901234",
    role: "financiar",
  },
  {
    userId: 1,
    name: "Alice Smith",
    email: "alice.smith@example.com",
    password: "password123",
    phone: "9876543210",
    role: "user",
  },
  {
    userId: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "your_password_here",
    phone: "1234567890",
    role: "admin",
  },
  {
    userId: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    password: "securepass456",
    phone: "5678901234",
    role: "financiar",
  },
  {
    userId: 1,
    name: "Alice Smith",
    email: "alice.smith@example.com",
    password: "password123",
    phone: "9876543210",
    role: "user",
  },
  {
    userId: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "your_password_here",
    phone: "1234567890",
    role: "admin",
  },
  {
    userId: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    password: "securepass456",
    phone: "5678901234",
    role: "financiar",
  },
  {
    userId: 1,
    name: "Alice Smith",
    email: "alice.smith@example.com",
    password: "password123",
    phone: "9876543210",
    role: "user",
  },
  {
    userId: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "your_password_here",
    phone: "1234567890",
    role: "admin",
  },
  {
    userId: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    password: "securepass456",
    phone: "5678901234",
    role: "financiar",
  },
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

const UserTable: React.FC<{
  selectedTable: string | null;
  searchQuery: string;
  setTotalUsers: (count: number) => void;
}> = ({ selectedTable, searchQuery, setTotalUsers }) => {
  useEffect(() => {
    console.log("Selected Table:", selectedTable);
  }, [selectedTable]);
  const [originalData, setOriginalData] = useState<TableListItem[]>([]);
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TableListItem | null>(null);
  const [form] = Form.useForm();
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<TableListItem | null>(null);

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
      Object.values(item).some(
        (field) =>
          typeof field === "string" && field.toLowerCase().includes(lowerValue)
      )
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
    setUserToDelete(record);
    setIsDeleteVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      console.log("Deleting user:", userToDelete);
      // Implement your delete logic here, e.g., filter out the user from dataSource
      setIsDeleteVisible(false);
      setUserToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteVisible(false);
    setUserToDelete(null);
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
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "0%",
    color: "#475467",
  };

  const getBaseColumns = (
    handleView: (record: TableListItem) => void,
    handleEdit: (record: TableListItem) => void,
    handleDelete: (record: TableListItem) => void
  ): ProColumns<TableListItem>[] => {
    return [
      {
        title: "Товчлол",
        dataIndex: "abbreviation",
        key: "abbreviation",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "200px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
      {
        title: "Компаний нэр",
        dataIndex: "companyName",
        key: "companyName",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "300px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
      {
        title: "Зууч эсэх",
        dataIndex: "isBroker",
        key: "isBroker",
        render: (text: boolean) => <Switch checked={text} />,
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "200px", height: "36px" },
        }),
      },
      {
        title: "Данс",
        dataIndex: "account",
        key: "account",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "250px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
      {
        title: "Харилцах дугаар",
        dataIndex: "contactNumber",
        key: "contactNumber",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "200px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
      {
        title: "Үйлдэл",
        key: "action",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "130px", height: "36px" },
        }),
        render: (_: any, record: TableListItem) => (
          <div>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              size="large"
              style={{
                background: "#ffffff",
                color: "#344054",
                boxShadow: "none",
              }}
              onClick={() => handleView(record)}
            />
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="large"
              style={{
                background: "#ffffff",
                color: "#344054",
                boxShadow: "none",
              }}
              onClick={() => handleEdit(record)}
            />
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              size="large"
              style={{
                background: "#ffffff",
                color: "#ff4d4f",
                boxShadow: "none",
              }}
              onClick={() => handleDelete(record)}
            />
          </div>
        ),
      },
    ];
  };

  const getColumns = () => {
    const baseColumns: ProColumns<TableListItem>[] = [
      {
        title: "Овог",
        dataIndex: "lastname",
        key: "lastname",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "150px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
      {
        title: "Нэр",
        dataIndex: "name",
        key: "name",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "150px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
      {
        title: "Үүрэг",
        dataIndex: "role",
        key: "role",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "150px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
      {
        title: "Регистрийн дугаар",
        dataIndex: "register",
        key: "register",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "150px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
      {
        title: "Нас",
        dataIndex: "age",
        key: "age",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "100px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
      {
        title: "Хүйс",
        dataIndex: "gender",
        key: "gender",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "100px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
      {
        title: "Утас",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "150px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
      {
        title: "Имейл",
        dataIndex: "email",
        key: "email",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "200px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
      {
        title: "Бүртгэсэн огноо",
        dataIndex: "createdAt",
        key: "createdAt",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "150px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
      {
        title: "Бүртгэсэн ажилтан",
        dataIndex: "whoAdded",
        key: "whoAdded",
        onHeaderCell: () => ({
          style: { ...columnStyle, width: "150px", height: "36px" },
        }),
        render: (text) => <span style={columnStyle}>{text}</span>,
      },
    ];

    switch (selectedTable) {
      case "Ачаа дөхөлт":
        return [...baseColumns];
      case "Үлдэгдэл":
        return [
          {
            title: "Дөхөлт огноо",
            dataIndex: "approachDate",
            key: "approachDate",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Орох хил",
            dataIndex: "entryBorder",
            key: "entryBorder",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Ирэх/Явах",
            dataIndex: "direction",
            key: "direction",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Чингэлэг дугаар",
            dataIndex: "containerNumber",
            key: "containerNumber",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Даац",
            dataIndex: "capacity",
            key: "capacity",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Зуучийн нэр",
            dataIndex: "brokerName",
            key: "brokerName",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Хоосон/Ачаатай",
            dataIndex: "loadStatus",
            key: "loadStatus",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Зарах эсэх",
            dataIndex: "forSale",
            key: "forSale",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Зарах үнэ",
            dataIndex: "salePrice",
            key: "salePrice",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Зууч код",
            dataIndex: "brokerCode",
            key: "brokerCode",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Байр №",
            dataIndex: "locationNumber",
            key: "locationNumber",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Талбайд задарсан",
            dataIndex: "fieldDisassembly",
            key: "fieldDisassembly",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Талбайд ирсэн",
            dataIndex: "fieldArrival",
            key: "fieldArrival",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Задарсан",
            dataIndex: "disassembled",
            key: "disassembled",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Суларсан",
            dataIndex: "released",
            key: "released",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Ачилт хийсэн",
            dataIndex: "loaded",
            key: "loaded",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
          },
          {
            title: "Талбайд ирсэнээс хойш",
            dataIndex: "timeAfterArrival",
            key: "timeAfterArrival",
            onHeaderCell: () => ({
              style: { ...columnStyle },
            }),
          },
          {
            title: "Үйлдэл",
            key: "action",
            onHeaderCell: () => ({
              style: columnStyle,
            }),
            render: (_: any, record: TableListItem) => (
              <Button
                type="primary"
                icon={<EyeOutlined />}
                size="large"
                style={{
                  background: "#ffffff",
                  color: "#344054",
                  boxShadow: "none",
                }}
                onClick={() => handleView(record)}
              />
            ),
          },
        ];
      case "Талбайд ирсэнээр":
        return [...baseColumns];
      case "Харилцагч компани":
        return getBaseColumns(handleView, handleEdit, handleDelete);
      case "Нэмэлт хураамж тохиргоо":
        return [
          {
            title: "Ангилал код",
            dataIndex: "categoryCode",
            key: "categoryCode",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "368px", height: "36px" },
            }),
          },
          {
            title: "Хураамжийн код",
            dataIndex: "feeCode",
            key: "feeCode",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "368px", height: "36px" },
            }),
          },
          {
            title: "Хураамжийн нэр",
            dataIndex: "feeName",
            key: "feeName",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "368px", height: "36px" },
            }),
          },
          {
            title: "Хэмжих нэгж",
            dataIndex: "unit",
            key: "unit",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "368px", height: "36px" },
            }),
          },
          {
            title: "Хураамжийн дүн",
            dataIndex: "feeAmount",
            key: "feeAmount",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "200px", height: "36px" },
            }),
          },
          {
            title: "Үйлдэл",
            key: "action",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "180px", height: "36px" },
            }),
            render: (_: any, record: TableListItem) => (
              <div>
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  size="large"
                  style={{
                    background: "#ffffff",
                    color: "#344054",
                    boxShadow: "none",
                  }}
                  onClick={() => handleView(record)}
                />
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  size="large"
                  style={{
                    background: "#ffffff",
                    color: "#344054",
                    boxShadow: "none",
                  }}
                  onClick={() => handleEdit(record)}
                />
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  size="large"
                  style={{
                    background: "#ffffff",
                    color: "#ff4d4f",
                    boxShadow: "none",
                  }}
                  onClick={() => handleDelete(record)}
                />
              </div>
            ),
          },
        ];
      case "Харилцагчдын дансны тооцоо":
        return [
          {
            title: "Огноо",
            dataIndex: "date",
            key: "date",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "262.86px", height: "36px" },
            }),
          },
          {
            title: "Данс",
            dataIndex: "account",
            key: "account",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "262.86px", height: "36px" },
            }),
          },
          {
            title: "Бэлэн",
            dataIndex: "cash",
            key: "cash",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "262.86px", height: "36px" },
            }),
          },
          {
            title: "Бэлэн бус",
            dataIndex: "nonCash",
            key: "nonCash",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "262.86px", height: "36px" },
            }),
          },
          {
            title: "Баримт",
            dataIndex: "receipt",
            key: "receipt",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "262.86px", height: "36px" },
            }),
          },
          {
            title: "Төлөгч",
            dataIndex: "payer",
            key: "payer",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "262.86px", height: "36px" },
            }),
          },
          {
            title: "Гүйлгээ хийсэн ажилтан",
            dataIndex: "employee",
            key: "employee",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "260.86px", height: "36px" },
            }),
          },
          {
            title: "Үйлдэл",
            key: "action",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "190px", height: "36px" },
            }),
            render: (_: any, record: TableListItem) => (
              <div>
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  size="large"
                  style={{
                    background: "#ffffff",
                    color: "#344054",
                    boxShadow: "none",
                  }}
                  onClick={() => handleView(record)}
                />
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  size="large"
                  style={{
                    background: "#ffffff",
                    color: "#344054",
                    boxShadow: "none",
                  }}
                  onClick={() => handleEdit(record)}
                />
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  size="large"
                  style={{
                    background: "#ffffff",
                    color: "#ff4d4f",
                    boxShadow: "none",
                  }}
                  onClick={() => handleDelete(record)}
                />
              </div>
            ),
          },
        ];
      case "Э/Х тасалбар хүчингүй болгох":
        return [
          {
            title: "Он сар өдөр",
            dataIndex: "date",
            key: "date",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "258px", height: "36px" },
            }),
          },
          {
            title: "ЭХ тасалбарын №",
            dataIndex: "ticketNumber",
            key: "ticketNumber",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "258px", height: "36px" },
            }),
          },
          {
            title: "Код",
            dataIndex: "code",
            key: "code",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "258px", height: "36px" },
            }),
          },
          {
            title: "Хураамжийн нэр",
            dataIndex: "feeName",
            key: "feeName",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "291px", height: "36px" },
            }),
          },
          {
            title: "Ангилал",
            dataIndex: "category",
            key: "category",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "258px", height: "36px" },
            }),
          },
          {
            title: "Хүсэлт явуулсан кассир",
            dataIndex: "cashier",
            key: "cashier",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "258px", height: "36px" },
            }),
          },
          {
            title: "Төлөв",
            dataIndex: "status",
            key: "status",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "200px", height: "36px" },
            }),
          },
          {
            title: "Үйлдэл",
            key: "action",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "70px", height: "36px" },
            }),
            render: (_: any, record: TableListItem) => (
              <div>
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  size="large"
                  style={{
                    background: "#ffffff",
                    color: "#ff4d4f",
                    boxShadow: "none",
                  }}
                  onClick={() => handleDelete(record)}
                />
              </div>
            ),
          },
        ];
      case "Э/Х орлогын тайлан":
        return [
          {
            title: "Төлөв",
            dataIndex: "status",
            key: "status",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Төрөл",
            dataIndex: "type",
            key: "type",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Баримт дугаар",
            dataIndex: "documentNumber",
            key: "documentNumber",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Огноо",
            dataIndex: "date",
            key: "date",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Нийт төлсөн",
            dataIndex: "totalPaid",
            key: "totalPaid",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Бэлнээр",
            dataIndex: "cash",
            key: "cash",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Бэлэн бусаар",
            dataIndex: "nonCash",
            key: "nonCash",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Нийт төлбөр",
            dataIndex: "totalPayment",
            key: "totalPayment",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Краны төлбөр",
            dataIndex: "craneFee",
            key: "craneFee",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Зам талбай ашиглалт",
            dataIndex: "landUse",
            key: "landUse",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Ачаа хадгаламж",
            dataIndex: "cargoStorage",
            key: "cargoStorage",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Чингэлэг вагон цэвэрлэгээ",
            dataIndex: "containerCleaning",
            key: "containerCleaning",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Вагон ашиглалт",
            dataIndex: "wagonUsage",
            key: "wagonUsage",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "TL вагон ашиглалт",
            dataIndex: "tlWagonUsage",
            key: "tlWagonUsage",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Гаалийн үзлэг",
            dataIndex: "customsInspection",
            key: "customsInspection",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Авто ачигч",
            dataIndex: "autoLoader",
            key: "autoLoader",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
          {
            title: "Машин оролт",
            dataIndex: "vehicleEntry",
            key: "vehicleEntry",
            onHeaderCell: () => ({
              style: { ...columnStyle, width: "150px", height: "36px" },
            }),
          },
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
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="large"
            style={{
              background: "#ffffff",
              color: "#344054",
              boxShadow: "none",
            }}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            size="large"
            style={{
              background: "#ffffff",
              color: "#344054",
              boxShadow: "none",
            }}
            onClick={() => handleDelete(record)}
          />
          <Button
            type="primary"
            icon={<KeyOutlined />}
            size="large"
            style={{
              background: "#ffffff",
              color: "#344054",
              boxShadow: "none",
            }}
            onClick={() => handleKeyAction(record)}
          />
        </Button.Group>
      ),
    },
  ];

  return (
    <>
      <div className="table-container">
        <ProTable<TableListItem>
          columns={getColumns()}
          dataSource={dataSource}
          rowKey="key"
          options={false}
          search={false}
          pagination={{ pageSize: 10 }}
          style={{ marginTop: 20 }}
          scroll={{ x: "max-content" }}
        />
      </div>

      <UserForm
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
      />

      <Delete
        visible={isDeleteVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        user={userToDelete}
      />
    </>
  );
};

export default UserTable;
