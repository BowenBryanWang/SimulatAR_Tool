import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./App.css";
import {
  Row,
  Col,
  Divider,
  Card,
  Segmented,
  Avatar,
  List,
  Skeleton,
  Switch,
} from "antd";
import ReactPlayer from "react-player";

import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};
interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <>
      <Divider orientation="left">
        {/* 自定义大小粗体 */}
        <h1 style={{ fontSize: 48, fontWeight: 700 }}>SimulatAR Tool</h1>
      </Divider>
      <div>
        <Row gutter={40}>
          <Col span={8}>
            <div className="Col1">
              <Divider orientation="left">Time</Divider>
              <Segmented block options={["morning", "afternoon", "evening"]} />
              <Divider orientation="left">Time</Divider>
              <Segmented block options={["morning", "afternoon", "evening"]} />
              <Divider orientation="left">Time</Divider>
              <Segmented block options={["morning", "afternoon", "evening"]} />
              <Card
                title="Files"
                bordered={false}
                style={{ width: "95%", margin: "5%" }}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
                size="small"
              >
                <div
                  id="scrollableDiv"
                  style={{
                    height: 500,
                    overflow: "auto",
                    padding: "0 16px",
                    border: "1px solid rgba(140, 140, 140, 0.35)",
                  }}
                >
                  <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={
                      <Divider plain>It is all, nothing more 🤐</Divider>
                    }
                    scrollableTarget="scrollableDiv"
                  >
                    <List
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item key={item.email}>
                          <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} shape="square" />}
                            title={
                              <a>Video file name</a>
                            }
                          />
                          <Switch onChange={onChange} defaultChecked={false} />
                        </List.Item>
                      )}
                    />
                  </InfiniteScroll>
                </div>
              </Card>
            </div>
          </Col>
          <Col span={16}>
            <div className="Col2">
              
              <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default App;
