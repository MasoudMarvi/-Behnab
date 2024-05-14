import React, {Component} from "react";
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
import {Col, Row, Grid} from "react-native-easy-grid";
import styles from "../../StyleSheet.js";
import {Sidebar} from "../../route";
import {Ad} from "../Ad/ad";
const { Navigation } = require('react-native-navigation');

class Home extends Component<Props> {
    closeDrawer = () => {
        this.drawer._root.close();
    };
    openDrawer = () => {
        this.drawer._root.open();
    };

    checkNet() {
        NetInfo.isConnected.fetch().done(isConnected => {
            this.setState({status: isConnected});
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
                        {text: "تلاش مجدد", onPress: () => this.checkNet()},
                        {text: "خروج از برنامه", onPress: () => BackHandler.exitApp()}
                    ],
                    {cancelable: false}
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
            this.setState({status: isConnected});
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
                        {text: "تلاش مجدد", onPress: () => this.checkNet()},
                        {text: "خروج از برنامه", onPress: () => BackHandler.exitApp()}
                    ],
                    {cancelable: false}
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
        this.setState({status: isConnected});
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
                    {text: "تلاش مجدد", onPress: () => this.checkNet()},
                    {text: "خروج از برنامه", onPress: () => BackHandler.exitApp()}
                ],
                {cancelable: false}
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
                {text: "نه", onPress: () => Navigation.push(this.props.componentId, {component: {name: 'navigation.behnab.Home'}})},
                {text: "بله", onPress: () => BackHandler.exitApp()}
            ],
            {cancelable: false}
        );
        return true;
    }

    constructor(props) {
        super(props);
        this.state = {
            pageTitle: "سامانه بهناب - خانه",
            disabled: false
        };
    }

    render() {
        return (
            <Drawer
                ref={ref => {
                    this.drawer = ref;
                }}
                content={<Sidebar navigate={this.navigator}/>}
                openDrawerOffset={0.4}
                panCloseMask={0.4}
                onClose={() => this.closeDrawer()}
            >
                <Container>
                    <Header style={{backgroundColor: "#ffffff"}}>
                        <Left>
                            <Button transparent onPress={() => this.openDrawer()}>
                                <Icon name="menu" style={{color: "#bed73c"}}/>
                            </Button>
                        </Left>
                        <Right>
                            <Title
                                style={[styles.iranSansBold, styles.font14, styles.textDark]}
                            >
                                {this.state.pageTitle}
                            </Title>
                            <Button transparent  onPress={() => Navigation.push(this.props.componentId, {component: {name: 'navigation.behnab.Home'}})}>
                                <Image
                                    source={require("../../img/logo.png")}
                                    style={{width: 36, height: 36, resizeMode: "contain"}}
                                />
                            </Button>
                        </Right>
                    </Header>
                    <Content style={{backgroundColor: "#ffffff"}}>
                        <Grid style={{marginTop: 25, marginHorizontal: 15}}>
                            <Row style={{width: "100%", height: 100, marginVertical: 3}}>
                                <Col size={3} style={{marginHorizontal: 3}}>
                                    <Button
                                        onPress={() => Navigation.push(this.props.componentId, {component: {name: 'navigation.behnab.Watering'}})}
                                        style={styles.box1}
                                    >
                                        <Image
                                            style={[styles.logoItem1, styles.ml10]}
                                            source={require("../../img/item1.png")}
                                        />
                                        <Text style={[styles.iranSansBold, styles.textLight]}>
                                            زمان و مقدار آبیاری
                                        </Text>
                                    </Button>
                                </Col>
                                <Col size={1} style={{marginHorizontal: 3}}>
                                    <Button vertical style={styles.box2}>
                                        <Image
                                            style={[styles.logoItem3, styles.ml10]}
                                            source={require("../../img/item2.png")}
                                        />
                                        <Text
                                            style={[
                                                styles.iranSansBold,
                                                styles.textLight,
                                                styles.font10
                                            ]}
                                        >
                                            اطلاعات محیطی
                                        </Text>
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{width: "100%", height: 100, marginVertical: 3}}>
                                <Col size={3} style={{marginHorizontal: 3}}>
                                    <Button
                                        onPress={() => Navigation.push(this.props.componentId, {component: {name: 'navigation.behnab.Basin'}})}
                                        style={styles.box3}
                                    >
                                        <Image
                                            style={[styles.logoItem1, styles.ml10]}
                                            source={require("../../img/item4.png")}
                                        />
                                        <Text style={[styles.iranSansBold, styles.textLight]}>
                                            مدیریت تشتک
                                        </Text>
                                    </Button>
                                </Col>
                                <Col size={2} style={{marginHorizontal: 3}}>
                                    <Button
                                        vertical
                                        style={styles.box4}
                                        onPress={() => Navigation.push(this.props.componentId, {component: {name: 'navigation.behnab.Weather'}})}
                                    >
                                        <Image
                                            style={[styles.logoItem3, styles.ml10]}
                                            source={require("../../img/item3.png")}
                                        />
                                        <Text
                                            style={[
                                                styles.iranSansBold,
                                                styles.textLight,
                                                styles.font12
                                            ]}
                                        >
                                            هواشناسی
                                        </Text>
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{width: "100%", height: 200, marginVertical: 3}}>
                                <Col size={7} style={{marginHorizontal: 3}}>
                                    <Button onPress={() => Navigation.push(this.props.componentId, {component: {name: 'navigation.behnab.Statistic'}})} vertical style={styles.box5}>
                                        <Image
                                            style={[styles.logoItem, styles.ml10]}
                                            source={require("../../img/item5.png")}
                                        />
                                        <Text
                                            style={[
                                                styles.iranSansBold,
                                                styles.textLight,
                                                styles.pr5
                                            ]}
                                        >
                                            اطلاعات آماری مزرعه
                                        </Text>
                                    </Button>
                                </Col>
                                <Col size={3} style={{marginHorizontal: 3}}>
                                    <Row
                                        style={{width: "100%", height: 100, marginBottom: 1.5}}
                                    >
                                        <Col size={5} style={{marginHorizontal: 3}}>
                                            <Button vertical style={styles.box6}>
                                                <Image
                                                    style={[styles.logoItem3, styles.ml10]}
                                                    source={require("../../img/item6.png")}
                                                />
                                                <Text
                                                    style={[
                                                        styles.iranSansBold,
                                                        styles.textLight,
                                                        styles.font12
                                                    ]}
                                                >
                                                    پرداخت
                                                </Text>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row style={{width: "100%", height: 100, marginTop: 1.5, marginBottom: 3}}>
                                        <Col size={5} style={{marginHorizontal: 3}}>
                                            <Button vertical style={[styles.box7, styles.box7Settings]}>
                                                <Image
                                                    style={[styles.logoItem3, styles.ml10, styles.mt10]}
                                                    source={require("../../img/item7.png")}
                                                />
                                                <Text
                                                    style={[
                                                        styles.iranSansBold,
                                                        styles.textLight,
                                                        styles.font14,
                                                        styles.mb10
                                                    ]}
                                                >
                                                    مقالات
                                                </Text>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
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
                                onPress={() => Navigation.push(this.props.componentId, {component: {name: 'navigation.behnab.Guide'}})}
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
export {Home};
