import React, { Component } from "react";
import {
  Image,
  BackHandler,
  Alert,
  NetInfo,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  Platform,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import {
  View,
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
  Badge,
  Accordion
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "../../StyleSheet.js";
import { Sidebar } from "../../route";
class Weather extends Component<Props> {
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "هواشناسی"
    };
  }
  _getData() {
    return [
      {
        title: "امروز 15 مهر 1397",
        content: {
          Wind: "8",
          Humidity: "60",
          TemperatureLow: "26",
          TemperatureHigh: "22"
        }
      },
      {
        title: "جمعه 16 مهر 1397",
        content: {
          Wind: "8",
          Humidity: "60",
          TemperatureLow: "26",
          TemperatureHigh: "22"
        }
      },
      {
        title: "شنبه 17 مهر 1397",
        content: {
          Wind: "8",
          Humidity: "60",
          TemperatureLow: "26",
          TemperatureHigh: "22"
        }
      },
      {
        title: "یکشنبه 18 مهر 1397",
        content: {
          Wind: "8",
          Humidity: "60",
          TemperatureLow: "26",
          TemperatureHigh: "22"
        }
      },
      {
        title: "دوشنبه 19 مهر 1397",
        content: {
          Wind: "8",
          Humidity: "60",
          TemperatureLow: "26",
          TemperatureHigh: "22"
        }
      },
      {
        title: "سه شنبه 20 مهر 1397",
        content: {
          Wind: "8",
          Humidity: "60",
          TemperatureLow: "26",
          TemperatureHigh: "22"
        }
      },
      {
        title: "چهارشنبه 21 مهر 1397",
        content: {
          Wind: "8",
          Humidity: "60",
          TemperatureLow: "26",
          TemperatureHigh: "22"
        }
      },
      {
        title: "پنجشنبه 22 مهر 1397",
        content: {
          Wind: "8",
          Humidity: "60",
          TemperatureLow: "26",
          TemperatureHigh: "22"
        }
      }
    ];
  }
  _renderHeader(title, expanded) {
    return (
      <View
        style={{
          flexDirection: "row-reverse",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 10,
          backgroundColor: "rgba(63,81,181,0.3)",
          marginTop: 5
        }}
      >
        <Text style={[styles.iranSansBold, styles.textLight, styles.font14]}>
          {title}
        </Text>
        {expanded ? (
          <Icon style={{ fontSize: 18, color: "#ffffff" }} name="remove" />
        ) : (
          <Icon style={{ fontSize: 18, color: "#ffffff" }} name="add" />
        )}
      </View>
    );
  }
  _renderContent(content) {
    return (
      <View>
        <Grid
          style={{
            backgroundColor: "rgba(79,195,247,0.5)",
            padding: 10,
            marginVertical: 5,
            borderRadius: 10
          }}
        >
          <Row>
            <Col style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("../../img/wind.png")}
                style={{ width: 36, height: 36, resizeMode: "contain" }}
              />
              <Text style={{ fontFamily: "IRANSans(FaNum)", fontSize: 10 }}>
                سرعت باد
              </Text>
              <Text style={{ fontFamily: "IRANSans(FaNum)", fontSize: 14 }}>
                {content.Wind}
              </Text>
            </Col>
            <Col style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("../../img/humidity.png")}
                style={{ width: 36, height: 36, resizeMode: "contain" }}
              />
              <Text style={{ fontFamily: "IRANSans(FaNum)", fontSize: 10 }}>
                رطوبت هوا
              </Text>
              <Text style={{ fontFamily: "IRANSans(FaNum)", fontSize: 14 }}>
                {content.Humidity}
              </Text>
            </Col>
            <Col style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("../../img/templow.png")}
                style={{ width: 36, height: 36, resizeMode: "contain" }}
              />
              <Text style={{ fontFamily: "IRANSans(FaNum)", fontSize: 10 }}>
                کمینه دما
              </Text>
              <Text style={{ fontFamily: "IRANSans(FaNum)", fontSize: 14 }}>
                {content.TemperatureLow}
              </Text>
            </Col>
            <Col style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("../../img/temphigh.png")}
                style={{ width: 36, height: 36, resizeMode: "contain" }}
              />
              <Text style={{ fontFamily: "IRANSans(FaNum)", fontSize: 10 }}>
                بیشینه دما
              </Text>
              <Text style={{ fontFamily: "IRANSans(FaNum)", fontSize: 14 }}>
                {content.TemperatureHigh}
              </Text>
            </Col>
          </Row>
        </Grid>
      </View>
    );
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
          source={require("../../img/weather.png")}
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
            <Content style={{ backgroundColor: "transparent" }}>
              <Grid style={{ marginTop: 50, marginHorizontal: 15 }}>
                <Accordion
                  expanded={0}
                  style={{ borderColor: "transparent", borderWidth: 0 }}
                  dataArray={this._getData()}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                />
              </Grid>
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
                  style={[styles.footerButton2]}
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
export { Weather };
