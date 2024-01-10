import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const Ranking = () => {
  const [rankings, setRankings] = useState([]);

  const api = 'http://localhost:8080/api/v1/ranking';

  const updateRanking = async () => {
    try {
      const response = await axios.post(api);
      console.log(response.data);
    } catch (error) {
      console.error('Error updating ranking:', error);
    }
  };

  const apiCallEco = () => {
    axios
      .get(api)
      .then((response) => {
        console.log(response, 'res =====');
        setRankings(response?.data);
      })
      .catch((err) => 'da co loi: ' + err);
  };

  useEffect(() => {
    updateRanking();
  }, []);

  useEffect(() => {
    apiCallEco();
  }, []);

  const sortedRankings = [...rankings].sort((a, b) => a.total_points - b.total_points);

  // Add a 'stt' property to each ranking object with consecutive numbers
  const rankedData = sortedRankings.map((ranking, index) => {
    const customTitle = index < 3 ? `Danh hiệu TOP${index + 1}` : '';
    return { ...ranking, stt: index + 1, title: customTitle };
  });

  const columns = [
    {
      title: 'Xếp hạng',
      dataIndex: 'stt',
      key: 'stt',
      width: 100,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
      width: 200,
    },
    {
      title: 'Dấu chân sinh thái',
      dataIndex: 'total_points',
      key: 'total_points',
      width: 200,
    },
    {
      title: 'Danh hiệu',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
  ];

  return (
    <div>
      <h2>Bảng xếp hạng</h2>
      <Table
        columns={columns}
        dataSource={rankedData}
        rowKey={(record) => record.stt}
      />
    </div>
  );
};

export default Ranking;
