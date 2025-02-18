import React from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Checkbox,
  Row,
  Col,
  Radio,
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;

interface UserFormProps {
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  form: any;
  selectedTable?: string | null;
}

const UserForm: React.FC<UserFormProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
  form,
  selectedTable,
}) => {
  if (selectedTable === "Үлдэгдэл") {
    return (
      <Modal
        title="Ачаа чингэлэг тээврийн бүртгэл"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Form form={form} layout="vertical">
          {/* First Row */}
          <div style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
            <Form.Item
              label="Чингэлэг дугаар"
              name="containerNumber"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1, width: "235px" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Даац"
              name="capacity"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1, width: "35px" }}
            >
              <DatePicker style={{ width: "100%" }} picker="year" />
            </Form.Item>
            <Form.Item
              label="Зуучийн нэр"
              name="brokerName"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Select>
                <Option value="togo">Төгө</Option>
                <Option value="gune">Гүнэ</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Second Row */}
          <Form.Item
            label="Тээврийн чиглэл"
            name="transportDirection"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <Input />
          </Form.Item>

          {/* Third Row */}
          <Form.Item label="Чиглэл" name="direction">
            <div style={{ display: "flex", gap: "20px" }}>
              <Checkbox value="front">Урд</Checkbox>
              <Checkbox value="back">Хойд</Checkbox>
            </div>
          </Form.Item>

          {/* Fourth Row */}
          <Form.Item
            label="Дөхөлтийн мэдээний огноо"
            name="approachDate"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <DatePicker style={{ width: "100%" }} picker="year" />
          </Form.Item>

          {/* Header for Cargo Section */}
          <div style={{ marginTop: "20px", marginBottom: "10px" }}>
            <h1 style={{ color: "#000", fontSize: "16px", fontWeight: "bold" }}>
              Ачаа
            </h1>
          </div>

          {/* Cargo Name Row */}
          <Form.Item
            label="Ачааны нэр төрөл"
            name="cargoType"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <Input />
          </Form.Item>

          {/* Contact Info Row */}
          <div style={{ display: "flex", gap: "20px" }}>
            <Form.Item
              label="Хүлээн авагч"
              name="receiver"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Утас"
              name="phone"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <h1
              style={{ color: "#101828", fontSize: "16px", fontWeight: "bold" }}
            >
              Авах
            </h1>
          </div>

          {/* First Row */}
          <div style={{ display: "flex", gap: "20px" }}>
            <Form.Item
              label="Тээврийн хөлс"
              name="transportationFee"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Валют"
              name="currency"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Select>
                <Option value="USD">USD</Option>
                <Option value="MNT">MNT</Option>
                <Option value="JPN">JPN</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Харилцагч"
              name="customer"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Select>
                <Option value="bat">Bat</Option>
                <Option value="tugs">Tugs</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Second Row */}
          <div style={{ display: "flex", gap: "20px" }}>
            <Form.Item
              label="Төлөх арга"
              name="paymentMethod"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Select>
                <Option value="cash">Бэлэн</Option>
                <Option value="bank">Дансаар</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Э/Хураамж санамж"
              name="feeNote"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <h1
              style={{ color: "#101828", fontSize: "16px", fontWeight: "bold" }}
            >
              Өгөх
            </h1>
          </div>
          {/* Cargo Name Row */}
          <Form.Item
            label="Шилжүүлэх тээврийн хөлс"
            name="cargoType"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <Input />
          </Form.Item>

          {/* Contact Info Row */}
          <div style={{ display: "flex", gap: "20px" }}>
            <Form.Item
              label="Гадаад тээвэр зууч"
              name="receiver"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Төлбөр хариуцагчийн нэр"
              name="email"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    );
  }

  if (selectedTable === "Харилцагч компани") {
    return (
      <Modal
        title="Харилцагч компани нэмэх"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          {/* First Row */}
          <div style={{ display: "flex", gap: "20px" }}>
            <Form.Item
              label="Товчлол"
              name="abbreviation"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Компаний нэр"
              name="companyName"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
          </div>

          {/* Second Row */}
          <Form.Item label="Зууч эсэх" name="isBroker">
            <div style={{ display: "flex", gap: "20px" }}>
              <Radio.Group>
                <Radio value="yes">
                  <span>Тийм</span>
                </Radio>
                <Radio value="no">
                  <span>Үгүй</span>
                </Radio>
              </Radio.Group>
            </div>
          </Form.Item>

          {/* Third Row */}
          <div style={{ display: "flex", gap: "20px" }}>
            <Form.Item
              label="Данс"
              name="account"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Харилцах дугаар"
              name="contactNumber"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    );
  }

  if (selectedTable === "Нэмэлт хураамж тохиргоо") {
    return (
      <Modal
        title="Нэмэлт хураамж тохиргоо нэмэх"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          {/* First Row */}
          <div style={{ display: "flex", gap: "20px" , marginTop: "20px"}}>
            <Form.Item
              label="Ангилал код"
              name="categoryCode"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Хураамжийн код"
              name="feeCode"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
          </div>

          {/* Second Row */}
          <div style={{ display: "flex", gap: "20px" }}>
            <Form.Item
              label="Хураамжийн нэр"
              name="feeName"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Хэмжих нэгж"
              name="measurementUnit"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
          </div>

          {/* Third Row */}
          <Form.Item
            label="Хураамжийн дүн"
            name="feeAmount"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  if (selectedTable === "Харилцагчдын дансны тооцоо") {
    return (
      <Modal
        title="Дансны зузаатгал нэмэх"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          {/* First Row */}
          <div style={{ display: "flex", gap: "20px" }}>
            <Form.Item
              label="Огноо"
              name="date"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Данс"
              name="account"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Select>
                <Option value="1001">1001</Option>
                <Option value="1002">1002</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Second Row */}
          <div style={{ display: "flex", gap: "20px" }}>
            <Form.Item
              label="Бэлэн"
              name="cash"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Бэлэн бус"
              name="nonCash"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
          </div>

          {/* Third Row */}
          <div style={{ display: "flex", gap: "20px" }}>
            <Form.Item
              label="Баримт"
              name="receipt"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Төлөгч"
              name="payer"
              rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    );
  }

  return (
    <Modal
      title="Системд нэвтрэх бүртгэл үүсгэх"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" name="user-form">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="lastname"
              label="Овог"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="name" label="Нэр" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="role" label="Үүрэг" rules={[{ required: true }]}>
              <Select>
                <Option value="admin">Admin</Option>
                <Option value="financiar">Financiar</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="register"
              label="Регистрийн дугаар"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="age"
              label="Нас"
              rules={[{ type: "number", min: 0, max: 99, required: true }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="gender" label="Хүйс" rules={[{ required: true }]}>
              <Select>
                <Option value="male">Эр</Option>
                <Option value="female">Эм</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Имейл"
              rules={[{ type: "email", required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="Утас"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="createdAt"
          label="Огноо"
          rules={[{ required: true, message: "Огноо оруулна уу!" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
