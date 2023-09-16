import React, { useState, useEffect } from "react";
import '../styles/HeaderStyles.css'
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import { UnorderedListOutlined, AreaChartOutlined,EditOutlined , DeleteOutlined } from "@ant-design/icons";
import Layout from "../components/layout/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alltransaction, setAlltransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState('  ')
  //TABLE DATA
  const colums = [
    {
      title: "Data",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render:(text,record)=>(
        <div>
        <EditOutlined onClick={()=>{
          setEditable(record)
          setShowModal(true)
        }}/>
        <DeleteOutlined className="mx-2" onClick={()=>{handleDelete(record)}}/>
        </div>
      )
    },
  ];

  //GET ALL TRANSACTIONS

  useEffect(() => {
    const getAlltransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post(
          "http://localhost:4000/transaction/gettransaction",
          { userid: user._id, frequency, selectedDate, type }
        );
        setLoading(false);
        setAlltransaction(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Issue with getting transactions");
      }
    };
    getAlltransaction();
  }, [frequency, selectedDate, type]);

  //Delete handler
  const handleDelete=async(record )=>{
    try {
      setLoading(true)
      await axios.post('http://localhost:4000/transaction/deletetransaction',{transactionId:record._id})
      setLoading(false)
      message.success('Transaction deleted successfully')
    } catch (error) {
      setLoading(false)
      console.log(error)
      message.error('Unable to delete')
    }
  }
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
     if(editable){
      await axios.post("http://localhost:4000/transaction/edittransaction", {
       payload:{
        ...values,
        userId:user._id,
       },
       transactionId:editable._id
      });
      setLoading(false);
      message.success("Transactions edited successfully");
     }else{
      await axios.post("http://localhost:4000/transaction/addtransaction", {
        ...values,
        userid: user._id,
      });
      setLoading(false);
      message.success("Transactions added successfully");
     }
      setShowModal(false);
      setEditable(null)
    } catch (error) {
      setLoading(false);
      message.error("Cant add the transaction");
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => {
                setSelectedDate(values);
              }}
            />
          )}
        </div>
        <div>
          <h6>Select type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expenses </Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => {
                setSelectedDate(values);
              }}
            />
          )}
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => {
              setViewData("analytics");
            }}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add new
          </button>
        </div>
      </div>
      <div className="content">
      {viewData==='table'?
        <Table columns={colums} dataSource={alltransaction} />
        : <Analytics alltransaction={alltransaction}/>}
      </div>
      <Modal
        title={editable?'Edit Transacction':'Add Transaction'}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item name="amount" label="Amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tips">Tips</Select.Option>
              <Select.Option value="project">Projects</Select.Option>
              <Select.Option value="food">Foods</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="college">College</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fees</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Homepage;
