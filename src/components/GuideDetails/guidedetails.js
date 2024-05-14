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
  Platform,
  ImageBackground,
  WebView
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
import styles from "../../StyleSheet.js";
import { Sidebar } from "../../route";
class GuideDetails extends Component<Props> {
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "",
      type: 1,
      lorem:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
      content: ""
    };
  }
  componentDidMount() {
    let GuideType = this.props.navigation.state.params.GuideType;
    this.getGuideDetails(GuideType);
  }
  async getGuideDetails(GuideType = 0) {
    switch (GuideType) {
      case 1:
        this.setState({ pageTitle: "معرفی خدمات بهناب" });
        break;
      case 2:
        this.setState({ pageTitle: "نحوه خرید خدمت" });
        break;
      case 3:
        this.setState({ pageTitle: "نحوه استفاده از خدمت" });
        break;
      case 4:
        this.setState({ pageTitle: "اطلاعات عمومی و بدون هزینه" });
        break;
      default:
        this.setState({ pageTitle: "راهنمایی" });
        break;
    }
    this.setState({
      content: String(
        "<html><head><meta charset='UTF-8'></head><body><p style='text-align:justify;direction:rtl;padding:10px;'>" +
          this.state.lorem +
          "</p><body></html>"
      )
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<Sidebar navigate={navigate} />}
        openDrawerOffset={0.4}
        panCloseMask={0.4}
        onClose={() => this.closeDrawer()}
      >
        <ImageBackground
          source={require("../../img/background-01.png")}
          style={[styles.imageSplash]}
        >
          <Container>
            <Header style={{ backgroundColor: "#ffffff" }}>
              <Left>
                <Button transparent onPress={() => this.openDrawer()}>
                  <Icon name="menu" style={{ color: "#bed73c" }} />
                </Button>
              </Left>
              <Right>
                <Title
                  style={[styles.iranSansBold, styles.font14, styles.textDark]}
                >
                  {this.state.pageTitle}
                </Title>
                <Button transparent onPress={() => navigate("Home")}>
                  <Image
                    source={require("../../img/logo.png")}
                    style={{ width: 36, height: 36, resizeMode: "contain" }}
                  />
                </Button>
              </Right>
            </Header>
            <Content>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50
                }}
              >
                <Text style={[styles2.TitleTextStyle]}>
                  {this.state.pageTitle}
                </Text>
              </View>
              <View style={[styles.textpageScreen, styles.borderLayout]}>
                {this.state.content !== null ? (
                  <WebView
                    style={[styles2.WebViewStyle]}
                    scalesPageToFit={true}
                    source={{ baseUrl: "", html: this.state.content }}
                  />
                ) : null}
              </View>
              <View style={{ marginHorizontal: 20 }}>
                <Button
                  block
                  onPress={() => this.props.navigation.goBack()}
                  style={[styles.box1Small]}
                >
                  <Text
                    style={[
                      styles.iranSansBold,
                      styles2.textLight,
                      styles.font14
                    ]}
                  >
                    بازگشت
                  </Text>
                </Button>
              </View>
            </Content>
            <Footer
              style={{
                height: 100,
                backgroundColor: "transparent"
              }}
            >
              <FooterTab
                style={{
                  backgroundColor: "transparent",
                  justifyContent: "space-between",
                  paddingHorizontal: Dimensions.get("window").width * 0.004
                }}
              >
                <Button vertical style={[styles.footerButton2]}>
                  <Image
                    style={[styles.logoFooter, styles.mb10]}
                    source={require("../../img/footer4.png")}
                  />
                  <Text style={[styles.iranSansBold, styles.textDark]}>
                    کاربری
                  </Text>
                </Button>
                <Button vertical style={[styles.footerButton2]}>
                  <Image
                    style={[styles.logoFooter, styles.mb10]}
                    source={require("../../img/footer3.png")}
                  />
                  <Text style={[styles.iranSansBold, styles.textDark]}>
                    پیام ها
                  </Text>
                </Button>
                <Button vertical style={[styles.footerButton2]}>
                  <Image
                    style={[styles.logoFooter, styles.mb10]}
                    source={require("../../img/footer2.png")}
                  />
                  <Text style={[styles.iranSansBold, styles.textDark]}>
                    پشتیبانی
                  </Text>
                </Button>
                <Button
                  vertical
                  onPress={() => this.props.navigation.navigate("Guide")}
                  style={[styles.footerButton2Active]}
                >
                  <Image
                    style={[styles.logoFooter, styles.mb10]}
                    source={require("../../img/footer1.png")}
                  />
                  <Text style={[styles.iranSansBold, styles.textDark]}>
                    راهنمایی
                  </Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        </ImageBackground>
      </Drawer>
    );
  }
}
const styles2 = StyleSheet.create({
  textLight: {
    color: "#ffffff"
  },
  leftBorder: {
    borderLeftWidth: 1,
    borderLeftColor: "#212121"
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
  },
  TitleTextStyle: {
    color: "#424242",
    fontFamily: "IRANSans(FaNum)_Bold",
    fontSize: 20
    // height: 50
    // textAlign: "justify",
    // writingDirection: "rtl"
  },
  TextStyle: {
    color: "#424242",
    fontFamily: "IRANSans(FaNum)",
    fontSize: 14,
    paddingHorizontal: 20,
    textAlign: "justify",
    writingDirection: "rtl"
  },
  ContentStyle: {
    color: "#424242",
    fontFamily: "IRANSans(FaNum)",
    fontSize: 14,
    paddingHorizontal: 20,
    flex: 1
  },
  headerTitleText: {
    color: "#424242",
    fontFamily: "IRANSans(FaNum)_Bold",
    fontSize: 14,
    paddingBottom: 15
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
  },
  WebViewStyle: {
    color: "#424242",
    fontFamily: "IRANSans(FaNum)",
    fontSize: 14,
    flex: 1,
    height: Dimensions.get("window").height * 0.5,
    width: Dimensions.get("window").width * 0.8,
    margin: Dimensions.get("window").width * 0.05,
    // alignSelf: 'stretch',
    backgroundColor: "transparent"
  },
  borderLayout: {
    borderColor: "#bed73c",
    borderWidth: 1,
    flex: 1,
    marginHorizontal: Dimensions.get("window").width * 0.05,
    marginTop: 15
  }
});
export { GuideDetails };
