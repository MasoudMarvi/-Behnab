import React, { Component } from "react";
import {
  View,
  Image,
  BackHandler,
  Alert,
  NetInfo,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  Platform
} from "react-native";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Toast,
  Title,
  Right,
  Content,
  Text,
  Drawer,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Badge
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "../StyleSheet.js";
import { SideBar } from "./index";
class Home extends Component<Props> {
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  checkNet() {
    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({ status: isConnected });
      if (!this.state.status) {
        Toast.show({
          text: "عدم ارتباط با اینترنت",
          duration: 5000,
          type: "danger",
          textStyle: {
            fontFamily: "iranSansBold(FaNum)",
            fontSize: 10,
            color: "#ffffff",
            textAlign: "center"
          },
          position: "top"
        });
        Alert.alert(
          "هشدار",
          "عدم ارتباط با اینترنت",
          [
            { text: "تلاش مجدد", onPress: () => this.checkNet() },
            { text: "خروج از برنامه", onPress: () => BackHandler.exitApp() }
          ],
          { cancelable: false }
        );
      } else {
        Toast.show({
          text: "شما آنلاین هستید",
          duration: 3000,
          type: "success",
          textStyle: {
            fontFamily: "iranSansBold(FaNum)",
            fontSize: 10,
            color: "#ffffff",
            textAlign: "center"
          },
          position: "top"
        });
      }
    });
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({ status: isConnected });
      if (!this.state.status) {
        Toast.show({
          text: "عدم ارتباط با اینترنت",
          duration: 5000,
          type: "danger",
          textStyle: {
            fontFamily: "iranSansBold(FaNum)",
            fontSize: 10,
            color: "#ffffff",
            textAlign: "center"
          },
          position: "top"
        });
        Alert.alert(
          "هشدار",
          "عدم ارتباط با اینترنت",
          [
            { text: "تلاش مجدد", onPress: () => this.checkNet() },
            { text: "خروج از برنامه", onPress: () => BackHandler.exitApp() }
          ],
          { cancelable: false }
        );
      } else {
        Toast.show({
          text: "شما آنلاین هستید",
          duration: 3000,
          type: "success",
          textStyle: {
            fontFamily: "iranSansBold(FaNum)",
            fontSize: 10,
            color: "#ffffff",
            textAlign: "center"
          },
          position: "top"
        });
      }
    });
  }
  handleConnectionChange = isConnected => {
    this.setState({ status: isConnected });
    if (!this.state.status) {
      Toast.show({
        text: "عدم ارتباط با اینترنت",
        duration: 5000,
        type: "danger",
        textStyle: {
          fontFamily: "iranSansBold(FaNum)",
          fontSize: 10,
          color: "#ffffff",
          textAlign: "center"
        },
        position: "top"
      });
      Alert.alert(
        "هشدار",
        "عدم ارتباط با اینترنت",
        [
          { text: "تلاش مجدد", onPress: () => this.checkNet() },
          { text: "خروج از برنامه", onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: false }
      );
    } else {
      Toast.show({
        text: "شما آنلاین هستید",
        duration: 3000,
        type: "success",
        textStyle: {
          fontFamily: "iranSansBold(FaNum)",
          fontSize: 10,
          color: "#ffffff",
          textAlign: "center"
        },
        position: "top"
      });
    }
  };
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
    Alert.alert(
      "خروج از برنامه",
      "آیا واقعا می خواهید از برنامه خارج شوید؟",
      [
        { text: "نه", onPress: () => this.props.navigation.navigate("Home") },
        { text: "بله", onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );
    return true;
  }
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "سامانه بهناب - خانه"
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar navigate={navigate} />}
        openDrawerOffset={0.4}
        panCloseMask={0.4}
        onClose={() => this.closeDrawer()}
      >
        <Container>
          <Header style={{ backgroundColor: "#ffffff" }}>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name="menu" style={{ color: "#bed73c" }} />
              </Button>
            </Left>
            <Right>
              <Title style={(styles.iranSans, styles.font12, styles.textDark)}>
                {this.state.pageTitle}
              </Title>
              <Button transparent onPress={() => navigate("Home")}>
                <Image
                  source={require("../img/logo.png")}
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                />
              </Button>
            </Right>
          </Header>
          <Content style={{ backgroundColor: "#ffffff" }}>
            <Grid style={{ marginTop: 25, marginHorizontal: 15 }}>
              <Row style={{ width: "100%", height: 100, marginVertical: 3 }}>
                <Col size={3} style={{ marginHorizontal: 3 }}>
                  <Button style={styles.box1}>
                    <Image
                      style={[styles.logoItem, styles.ml10]}
                      source={require("../img/item1.png")}
                    />
                    <Text style={[styles.iranSansBold, styles.textLight]}>
                      اعلام زمان و مقدار آبیاری
                    </Text>
                  </Button>
                </Col>
                <Col size={1}>
                  <Button style={styles.box2}>
                    <Image
                      style={[styles.logoItem, styles.ml10]}
                      source={require("../img/item2.png")}
                    />
                    <Text style={[styles.iranSansBold, styles.textLight]}>
                      اطلاعات محیطی
                    </Text>
                  </Button>
                </Col>
              </Row>
              <Row style={{ width: "100%", height: 100, marginVertical: 3 }}>
                <Col size={3} style={styles.box3}>
                  <Button style={styles.box2}>
                    <Image
                      style={[styles.logoItem, styles.ml10]}
                      source={require("../img/item3.png")}
                    />
                    <Text style={[styles.iranSansBold, styles.textLight]}>
                      مدیریت تشتک
                    </Text>
                  </Button>
                </Col>
                <Col size={2} style={styles.box4}>
                  <Button style={styles.box2}>
                    <Image
                      style={[styles.logoItem, styles.ml10]}
                      source={require("../img/item4.png")}
                    />
                    <Text style={[styles.iranSansBold, styles.textLight]}>
                      اطلاعات هواشناسی
                    </Text>
                  </Button>
                </Col>
              </Row>
              <Row style={{ width: "100%", height: 200, marginVertical: 3 }}>
                <Col size={5} style={styles.box5}>
                  <Image
                    style={[styles.logoItem, styles.ml10]}
                    source={require("../img/item5.png")}
                  />
                  <Text
                    style={[styles.iranSansBold, styles.textLight, styles.pr5]}
                  >
                    اطلاعات آماری مزرعه
                  </Text>
                </Col>
                <Col size={3}>
                  <Row
                    style={{ width: "100%", height: 100, marginBottom: 1.5 }}
                  >
                    <Col size={5} style={styles.box6}>
                      <Image
                        style={[styles.logoItem, styles.ml10]}
                        source={require("../img/item6.png")}
                      />
                      <Text style={[styles.iranSansBold, styles.textLight]}>
                        پرداخت
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{ width: "100%", height: 100, marginTop: 1.5 }}>
                    <Col size={5} style={styles.box7}>
                      <Image
                        style={[styles.logoItem, styles.ml10]}
                        source={require("../img/item7.png")}
                      />
                      <Text style={[styles.iranSansBold, styles.textLight]}>
                        مقالات
                      </Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row size={2} style={{ width: "100%" }} />
            </Grid>
          </Content>
          <Footer
            style={{
              height: 100,
              backgroundColor: "#ffffff"
            }}
          >
            <FooterTab
              style={{
                backgroundColor: "transparent",
                justifyContent: "space-between",
                paddingHorizontal: Dimensions.get("window").width * 0.004
              }}
            >
              <Button vertical style={[styles.footerButton]}>
                <Image
                  style={[styles.logoFooter, styles.mb10]}
                  source={require("../img/footer4.png")}
                />
                <Text style={[styles.iranSansBold, styles.textDark]}>
                  کاربری
                </Text>
              </Button>
              <Button vertical style={[styles.footerButton]}>
                <Image
                  style={[styles.logoFooter, styles.mb10]}
                  source={require("../img/footer3.png")}
                />
                <Text style={[styles.iranSansBold, styles.textDark]}>
                  پیام ها
                </Text>
              </Button>
              <Button vertical style={[styles.footerButton]}>
                <Image
                  style={[styles.logoFooter, styles.mb10]}
                  source={require("../img/footer2.png")}
                />
                <Text style={[styles.iranSansBold, styles.textDark]}>
                  پشتیبانی
                </Text>
              </Button>
              <Button vertical style={[styles.footerButton]}>
                <Image
                  style={[styles.logoFooter, styles.mb10]}
                  source={require("../img/footer1.png")}
                />
                <Text style={[styles.iranSansBold, styles.textDark]}>
                  راهنمایی
                </Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Drawer>
    );
  }
}
const styles2 = StyleSheet.create({
  leftBorder: {
    borderLeftWidth: 1,
    borderLeftColor: "#212121"
  },
  TextStyle: {
    color: "#424242",
    fontFamily: "iranSansBold(FaNum)"
  },
  headerTitleText: {
    color: "#424242",
    fontFamily: "iranSansBold(FaNum)_Bold",
    fontSize: 14,
    paddingBottom: 10
  },
  imageSplash: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  serviceImage: {
    height: 200,
    width: 200,
    borderRadius: 100,
    alignItems: "center"
  }
});
export { Home };
