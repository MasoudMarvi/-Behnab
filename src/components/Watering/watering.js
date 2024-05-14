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
    Platform,
    TouchableOpacity,
    ImageBackground,
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
import Modal from "react-native-modal";
import {Col, Row, Grid} from "react-native-easy-grid";
import styles from "../../StyleSheet.js";
import {Sidebar} from "../../route";

class Watering extends Component<Props> {
    closeDrawer = () => {
        this.drawer._root.close();
    };
    openDrawer = () => {
        this.drawer._root.open();
    };

    constructor(props) {
        super(props);
        this.state = {
            pageTitle: "زمان و مقدار آبیاری",
            isModalVisible: false
        };
    }

    _toggleModal = () => this.setState({isModalVisible: !this.state.isModalVisible});

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Drawer
                ref={ref => {
                    this.drawer = ref;
                }}
                content={<Sidebar navigate={navigate}/>}
                openDrawerOffset={0.4}
                panCloseMask={0.4}
                onClose={() => this.closeDrawer()}
            >
                <ImageBackground
                    source={require("../../img/watering.png")}
                    style={[styles.imageSplash]}
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
                                <Button transparent onPress={() => navigate("Home")}>
                                    <Image
                                        source={require("../../img/logo.png")}
                                        style={{width: 36, height: 36, resizeMode: "contain"}}
                                    />
                                </Button>
                            </Right>
                        </Header>
                        <Content style={{backgroundColor: "transparent"}}>
                            <Grid style={{marginTop: 50, marginHorizontal: 15}}>
                                <Row style={{alignItems: "center", justifyContent: "center"}}>
                                    <Text
                                        style={[
                                            styles.iranSansBold,
                                            styles.font18,
                                            styles.mainColor2
                                        ]}
                                    >
                                        زمان و تاریخ آبیاری
                                    </Text>
                                </Row>
                                <Row style={{alignItems: "center", justifyContent: "center"}}>
                                    <Text
                                        style={[styles.iranSans, styles.font14, styles.textDark]}
                                    >
                                        18/06/1397
                                    </Text>
                                </Row>
                                <Row style={{alignItems: "center", justifyContent: "center"}}>
                                    <Text
                                        style={[
                                            styles.iranSansBold,
                                            styles.font18,
                                            styles.mainColor2
                                        ]}
                                    >
                                        مقدار آب
                                    </Text>
                                </Row>
                                <Row style={{alignItems: "center", justifyContent: "center"}}>
                                    <Text
                                        style={[styles.iranSans, styles.font14, styles.textDark]}
                                    >
                                        12 تن
                                    </Text>
                                </Row>
                                <Row style={{alignItems: "center", justifyContent: "center"}}>
                                    <Text
                                        style={[
                                            styles.iranSans,
                                            styles.font14,
                                            styles.textDark,
                                            styles.mt20
                                        ]}
                                    >
                                        آخرین آبیاری شما در تاریخ 01/01/1397 و در ساعت 16:45 بوده
                                        است
                                    </Text>
                                </Row>
                                <Row style={{alignItems: "center", justifyContent: "center"}}>
                                    <Text
                                        style={[
                                            styles.iranSans,
                                            styles.font14,
                                            styles.textDark,
                                            styles.mt20
                                        ]}
                                    >
                                        در صوت تایید برای انجام آبیاری دکمه زیر را فشار دهید:
                                    </Text>
                                </Row>
                                <Row style={{alignItems: "center", justifyContent: "center"}}>
                                    <TouchableOpacity
                                        style={[styles.buttonBehnab2, styles.mt20]}
                                        onPress={() => {
                                            this._toggleModal();
                                        }}
                                    >
                                        <Text style={[styles.iranSansBold, styles.mainColor2]}>
                                            آبیاری
                                        </Text>
                                    </TouchableOpacity>
                                    <Modal style={[styles.modal]}
                                           transparent={true}
                                           animationType={'fade'}
                                           isVisible={this.state.isModalVisible}>
                                        <View style={[styles.modalContent]}>
                                            <Grid style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                                <Row style={{alignItems:'center',justifyContent:'center'}}>
                                                    <Text style={[styles.iranSansBold,styles.textCenter,styles.mainColor2,styles.font16]}>آیا با این موضوع موافق هستید ؟</Text>
                                                </Row>
                                                <Row style={{alignItems:'flex-end',justifyContent:'center'}}>
                                                    <Button small style={[styles.box3Small,styles.mx10]}  onPress={this._toggleModal}>
                                                        <Text style={[styles.iranSans,styles.textCenter,styles.textLight,styles.font12]}>انصراف</Text>
                                                    </Button>
                                                    <Button small style={[styles.box1Small,styles.mx10]} onPress={this._toggleModal}>
                                                        <Text style={[styles.iranSans,styles.textCenter,styles.textLight,styles.font12]}>تایید</Text>
                                                    </Button>
                                                </Row>
                                            </Grid>
                                        </View>
                                    </Modal>
                                </Row>
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
export {Watering};
