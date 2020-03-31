import { RouteProps } from 'react-router';
import * as React from 'react';
import moment from 'moment'
import axios from 'axios'
import { Table, Tag, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import './App.css'




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
    sorter: (a: Article, b: Article) => a.author.localeCompare(b.author, 'zh')

  },
  {
    title: '类别',
    dataIndex: 'type',
    key: 'type',
    sorter: (a: Article, b: Article) => a.type.localeCompare(b.type, 'zh')
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
    render: (Time: string) => <div>{moment(Time).format("YYYY-MM-DD")}</div>,
    sorter: (a: Article, b: Article) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  },
  // {
  //   title: 'operation',
  //   dataIndex: 'operation',
  //   render: (text: string, record: Object) =>
  //     this.state.likeList.length >= 1? (
  //       <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
  //         <a>取消赞</a>
  //       </Popconfirm>
  //     ) : null,
  // },
];

interface State {
  count: number;
  likeList: any[];
  pagination: unknown;
  searchText: string,
  searchedColumn: number,
};
interface SearchFunc {
  (value: any[]): any[];
}
interface filterDropdownType {
  setSelectedKeys: SearchFunc;
  selectedKeys: string;
  confirm: unknown,
  clearFilters: unknown,
};
interface ID {
  id: string;
}
interface ID extends Match {
  match: Object;
}
interface Match extends Props {
  props: Object;
}
interface Props {
  match: Object
};
export default class App extends React.Component<Props & RouteProps, State> {
  state: State = {
    count: 0,
    pagination: { position: 'bottom' },
    likeList: [],
    searchText: '',
    searchedColumn: 0,

  };
  componentDidMount () {
    console.log(this.props)
    const { id } = this.props.match.params
    axios.get('/api/getList/5be13123e51d45051d48e116')
      .then((response) => {
        // handle success
        console.log(response.data);
        this.setState({
          likeList: response.data
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  getColumnSearchProps = (dataIndex: number) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: filterDropdownType) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            console.log(node)
            // this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: Boolean) => {
      if (visible) {
        setTimeout(() =>
          console.log(1)
          // this.searchInput.select()
        );
      }
    },
    render: (text: string) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });

  handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters: any) => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  render () {
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
          pagination={{ pageSize: 15 }}
          size="small"
        />

      </div>
    );
  }
}