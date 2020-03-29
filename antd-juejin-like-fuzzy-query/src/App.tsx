import * as React from 'react';
import axios from 'axios'
import { Table, Tag, Button } from 'antd';
import './App.css'
type Props = {
};
interface Article {
  title: string;
  author: 'string';
  objectId: string;
  type: string;
  tags: any[];
  collectionCount: number;
  viewsCount: number;
  createdAt: string;
  description: string
}
// originalUrl
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    render: (text: string) => <div>{text}</div>,
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: '类别',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any[]) => (
      <span>
        {tags.map(tag => {
          return (
            <Tag color={'volcano'} key={tag.title}>
              {tag.title}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '点赞数目',
    dataIndex: 'collectionCount',
    key: 'collectionCount',
    sorter: (a: Article, b: Article) => a.collectionCount - b.collectionCount,

  },
  {
    title: '阅读量',
    dataIndex: 'viewsCount',
    key: 'viewsCount',
    sorter: (a: Article, b: Article) => a.viewsCount - b.viewsCount,
  },
  {
    title: '发布时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text: string) => <div>{text}</div>,
    // sorter: (a: Article, b: Article) => a.viewsCount - b.viewsCount,
  },
];


//  getDate(date: string): string ={
//   var date = new Date(1398250549490);
//   Y = date.getFullYear() + '-';
//   M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
//   D = date.getDate() + ' ';
//   h = date.getHours() + ':';
//   m = date.getMinutes() + ':';
//   s = date.getSeconds();
//   console.log(Y + M + D + h + m + s);
//   return something.length;
// }
// let standardTime: (date: string) => string = {
//   const date = new Date(date);
//   Y = date.getFullYear() + '-';
//   M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
//   D = date.getDate() + ' ';
//   h = date.getHours() + ':';
//   m = date.getMinutes() + ':';
//   s = date.getSeconds();
//   return "something.length";
// }


type State = {
  count: number;
  likeList: any[];
  pagination: any;
};

export default class App extends React.Component<Props, State> {
  state: State = {
    count: 0,
    pagination: { position: 'bottom' },
    likeList: [],

  };
  componentDidMount() {
    const _this = this;
    axios.get('/api/getList/5c2b49556fb9a049ee808e96')
      .then(function (response) {
        // handle success
        console.log(response.data);
        _this.setState({
          likeList: response.data
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  render() {
    const { likeList } = this.state
    return (
      <div>
        <Button>刷新数据</Button>
        <Table
          {...this.state}
          rowKey={record => record.objectId}
          columns={columns}
          dataSource={likeList}
          expandable={{
            expandedRowRender: record => <p >
              {record.description}
              <a href="#components-anchor-demo-basic" target="_blank">阅读全文</a>
            </p>,
            rowExpandable: record => record.description !== '没有摘要',
          }}
          pagination={false}
          size="small"

        />

      </div>
    );
  }
}