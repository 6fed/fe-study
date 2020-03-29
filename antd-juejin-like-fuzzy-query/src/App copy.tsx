import * as React from 'react';
import { Table, Tag } from 'antd';
type Props = {
  handleChange: () => void;
};
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <div>{text}</div>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any[]) => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: any) => (
      <span>
        <a style={{ marginRight: 16 }}>Invite {record.name}</a>
        <a>Delete</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

// rowSelection object indicates the need for row selection

// const App = () => {
//   state = {
//     filteredInfo: null,
//     sortedInfo: null,
//   };
//   handleChange = (pagination: any, filters: any, sorter: any) => {
//     console.log('Various parameters', pagination, filters, sorter);
//     this.setState({
//       filteredInfo: filters,
//       sortedInfo: sorter,
//     });
//   };
//   return (
//     <div>
//       <Table
//         columns={columns}
//         dataSource={data}
//       />
//     </div>
//   );
// };

export const App: React.FC<Props> = props => {
  // const { label, count, onIncrement } = props;

  const handleIncrement = () => {
    // onIncrement();
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};