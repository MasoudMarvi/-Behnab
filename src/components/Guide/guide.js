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
import styles from "../../StyleSheet.js";
import { Sidebar } from "../../route";
import {Ad} from "../Ad/ad";
class Guide extends Component<Props> {
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "راهنمایی"
    };
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
          <Content style={{ backgroundColor: "#ffffff" }}>
            <Grid style={{ marginTop: 50, marginHorizontal: 15 }}>
              <Row
                style={{
                  width: "100%",
                  height: 100,
                  marginVertical: 3,
                  justifyContent: "center"
                }}
              >
                <Button
                  onPress={() => navigate("GuideDetails", { GuideType: 1 })}
                  style={[styles.box1, styles.justifyCenter]}
                >
                  <Text
                    style={[
                      styles.iranSansBold,
                      styles.textLight,
                      styles.font18
                    ]}
                  >
                    معرفی خدمات بهناب
                  </Text>
                </Button>
              </Row>
              <Row
                style={{
                  width: "100%",
                  height: 100,
                  marginVertical: 3,
                  justifyContent: "center"
                }}
              >
                <Button
                  onPress={() => navigate("GuideDetails", { GuideType: 2 })}
                  style={[styles.box3, styles.justifyCenter]}
                >
                  <Text
                    style={[
                      styles.iranSansBold,
                      styles.textLight,
                      styles.font18
                    ]}
                  >
                    نحوه خرید خدمت
                  </Text>
                </Button>
              </Row>
              <Row
                style={{
                  width: "100%",
                  height: 100,
                  marginVertical: 3,
                  justifyContent: "center"
                }}
              >
                <Button
                  onPress={() => navigate("GuideDetails", { GuideType: 3 })}
                  style={[styles.box7, styles.justifyCenter]}
                >
                  <Text
                    style={[
                      styles.iranSansBold,
                      styles.textLight,
                      styles.font18
                    ]}
                  >
                    نحوه استفاده از خدمت
                  </Text>
                </Button>
              </Row>
              <Row
                style={{
                  width: "100%",
                  height: 100,
                  marginVertical: 3,
                  justifyContent: "center"
                }}
              >
                <Button
                  onPress={() => navigate("GuideDetails", { GuideType: 4 })}
                  style={[styles.box6, styles.justifyCenter]}
                >
                  <Text
                    style={[
                      styles.iranSansBold,
                      styles.textLight,
                      styles.font18
                    ]}
                  >
                    اطلاعات عمومی و بدون هزینه
                  </Text>
                </Button>
              </Row>
                <Row style={{paddingVertical:20,width: "100%"}} size={2}>
                    <Ad loadingFrom={"HOME"}/>
                </Row>
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
                  source={require("../../img/footer4.png")}
                />
                <Text style={[styles.iranSansBold, styles.textDark]}>
                  کاربری
                </Text>
              </Button>
              <Button vertical style={[styles.footerButton]}>
                <Image
                  style={[styles.logoFooter, styles.mb10]}
                  source={require("../../img/footer3.png")}
                />
                <Text style={[styles.iranSansBold, styles.textDark]}>
                  پیام ها
                </Text>
              </Button>
              <Button vertical style={[styles.footerButton]}>
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
                style={[styles.footerButton]}
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
export { Guide };
