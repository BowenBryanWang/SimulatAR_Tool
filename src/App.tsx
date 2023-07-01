import {
  EditOutlined,
  EllipsisOutlined,
  LeftCircleOutlined,
  LeftOutlined,
  PlaySquareTwoTone,
  RightCircleOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./App.css";
import {
  Row,
  Col,
  Divider,
  Card,
  Segmented,
  List,
  Skeleton,
  Switch,
  Button,
  Upload,
  UploadProps,
  message,
  Radio,
  RadioChangeEvent,
  Modal,
  Carousel,
} from "antd";
import ReactPlayer from "react-player";

import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";

const props: UploadProps = {
  beforeUpload: (file) => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
};
const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const options = [
  { label: "Nreal Light", value: "Nreal Light" },
  { label: "Hololens2", value: "Hololens2" },
];
function App() {
  const [data, setData] = useState<String[]>([]);
  const [Timevalue, setTimeValue] = useState<string | number>("");
  const [Locationvalue, setLocationValue] = useState<string | number>("");
  const [Statusvalue, setStatusValue] = useState<string | number>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /**
   * This component represents the main App of the SimulatAR Tool.
   * It displays a UI with a list of files that can be filtered by time, location and status.
   * It also allows the user to upload a design, watch a video and select a platform.
   * @returns The App component.
   */

  const [value4, setValue4] = useState("Apple");
  const loadMoreData = async () => {
    // 获取assets文件夹下file_structrue.txt文件
    try {
      const response = await fetch("/file_structure.txt");
      const text = await response.text(); // extract text content from response
      const lines = text.split("\n");
      // 根据条件Timevalue, Locationvalue, Statusvalue筛选，只保留文件名中包含这三种数据的文件，返回符合条件的文件名列表
      const filteredLines = lines.filter((line) => {
        if (
          line.includes(Timevalue.toString()) &&
          line.includes(Locationvalue.toString()) &&
          line.includes(Statusvalue.toString())
        ) {
          return true;
        }
        return false;
      });
      console.log(filteredLines);
      setData(filteredLines);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, [Timevalue, Locationvalue, Statusvalue]);
  const onChangePlatform = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio4 checked", value);
    setValue4(value);
  };
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  return (
    <>
      <Divider orientation="left">
        <h1 style={{ fontSize: 48, fontWeight: 700 }}>SimulatAR Tool</h1>
      </Divider>
      <div>
        <Row gutter={40}>
          <Col span={8}>
            <div className="Col1">
              <Divider orientation="left">Time</Divider>
              <Segmented
                options={["morning", "noon", "afternoon", "evening"]}
                value={Timevalue}
                onChange={setTimeValue}
              />
              <Divider orientation="left">Location</Divider>
              <Segmented
                options={["indoor", "outdoor", "transport"]}
                value={Locationvalue}
                onChange={setLocationValue}
              />
              <Divider orientation="left">Status</Divider>
              <Segmented
                options={["sit", "stairs", "stand", "walk"]}
                value={Statusvalue}
                onChange={setStatusValue}
              />
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
                    hasMore={data.length < 10}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={
                      <Divider plain>It is all, no video more 🤐</Divider>
                    }
                    scrollableTarget="scrollableDiv"
                  >
                    <List
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            // avatar={<PlaySquareTwoTone style={{ fontSize: '32px' }}/>}
                            style={{ display: "flex", alignItems: "center" }}
                            title={
                              <p style={{ textAlign: "left" }}>
                                {item.split("_").slice(2).join("_")}
                              </p>
                            }
                            description={
                            <div style={{alignItems:"left",textAlign: "left"}}>
                                <Button type="dashed" size="small" style={{color: "#7616FF"}}>
                                  {item
                                  .split("/")
                                  .slice(1, 5)
                                  .map((word) => {
                                    return word
                                      .replace(/_/g, " ")
                                      .replace(/\..+$/, " ");
                                  })
                                  .join(" ")
                                  .split(" ")
                                  [0]}
                                </Button>
                                <Button type="dashed" size="small" style={{color: "#7616FF"}}>
                                  {item
                                  .split("/")
                                  .slice(1, 5)
                                  .map((word) => {
                                    return word
                                      .replace(/_/g, " ")
                                      .replace(/\..+$/, " ");
                                  })
                                  .join(" ")
                                  .split(" ")
                                  [1]}
                                </Button>
                                <Button type="dashed" size="small" style={{color: "#7616FF"}}>
                                  {item
                                  .split("/")
                                  .slice(1, 5)
                                  .map((word) => {
                                    return word
                                      .replace(/_/g, " ")
                                      .replace(/\..+$/, " ");
                                  })
                                  .join(" ")
                                  .split(" ")
                                  [2]}
                                </Button>
                                <Button type="dashed" size="small" style={{color: "#7616FF"}}>
                                  {item
                                  .split("/")
                                  .slice(1, 5)
                                  .map((word) => {
                                    return word
                                      .replace(/_/g, " ")
                                      .replace(/\..+$/, " ");
                                  })
                                  .join(" ")
                                  .split(" ")
                                  [3]}
                                </Button>
                                </div>
                              
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "5%",
                }}
              >
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  {...props}
                >
                  <Button icon={<UploadOutlined />}>Upload your design</Button>
                </Upload>
              </div>
              <div
                className={`overlay${isFullscreen ? ' fullscreen' : ''}`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "5%",
                }}
              >
                <Carousel effect="fade" style={{ width: "640px" }} arrows={true} prevArrow={<LeftCircleOutlined />} nextArrow={<RightCircleOutlined />}>
                  <div>
                    <ReactPlayer
                      url="https://www.youtube.com/watch?v=1_XzrxXnwMM&t=221s&ab_channel=ProwalkTours"
                      controls={true}
                    />
                  </div>
                  <div>
                    <ReactPlayer
                      url="https://www.youtube.com/watch?v=1_XzrxXnwMM&t=221s&ab_channel=ProwalkTours"
                      controls={true}
                    />
                  </div>
                  <div>
                    <ReactPlayer
                      url="https://www.youtube.com/watch?v=1_XzrxXnwMM&t=221s&ab_channel=ProwalkTours"
                      controls={true}
                    />
                  </div>
                </Carousel>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button type="primary" onClick={showModal}>
                  Full Screen
                </Button>
                <Modal
                  centered
                  visible={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null}
                  width="100vw"
                >
                  <div
                    className="overlay"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "100vh",
                    }}
                  >
                    <ReactPlayer
                      url="https://www.youtube.com/watch?v=1_XzrxXnwMM&t=221s&ab_channel=ProwalkTours"
                      controls={true}
                      width="100%"
                      height="100%"
                    />
                  </div>
                </Modal>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "5%",
                }}
              >
                <Radio.Group
                  options={options}
                  onChange={onChangePlatform}
                  value={value4}
                  optionType="button"
                  buttonStyle="solid"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default App;
