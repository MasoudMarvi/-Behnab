import React, {Component} from "react";
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { Container,Header,Left,Button,Icon,Title,
    Right,Content,Text,Drawer,Footer,FooterTab,
} from "native-base";
import Modal from "react-native-modal";
import {Col, Row, Grid} from "react-native-easy-grid";
import styles from "../../StyleSheet.js";
import {Sidebar} from "../../route";

class Basin extends Component<Props> {
    closeDrawer = () => {
        this.drawer._root.close();
    };
    openDrawer = () => {
        this.drawer._root.open();
    };
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: "مدیریت تشتک",
            isModalVisibleBasin: false,
            isModalVisibleFillBasin: false,
            isModalVisibleWaterLevel: false
        };
    }
    _toggleModalBasin = () => this.setState({isModalVisibleBasin: !this.state.isModalVisibleBasin});
    _toggleModalFillBasin = () => this.setState({isModalVisibleFillBasin: !this.state.isModalVisibleFillBasin});
    _toggleModalWaterLevel = () => this.setState({isModalVisibleWaterLevel: !this.state.isModalVisibleWaterLevel});

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
                    source={require("../../img/basin.png")}
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
                                    <TouchableOpacity
                                        style={[styles.buttonBehnab2, styles.mt20]}
                                        onPress={() => {
                                            this._toggleModalBasin();
                                        }}
                                    >
                                        <Text style={[styles.iranSansBold, styles.mainColor2]}>
                                            تخلیه تشتک
                                        </Text>
                                    </TouchableOpacity>
                                    <Modal style={[styles.modal]}
                                           transparent={true}
                                           animationType={'fade'}
                                           isVisible={this.state.isModalVisibleBasin}>
                                        <View style={[styles.modalContent]}>
                                            <Grid style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                                <Row style={{alignItems:'center',justifyContent:'center'}}>
                                                    <Text style={[styles.iranSansBold,styles.textCenter,styles.mainColor2,styles.font16]}>آیا با این موضوع موافق هستید ؟</Text>
                                                </Row>
                                                <Row style={{alignItems:'flex-end',justifyContent:'center'}}>
                                                    <Button small style={[styles.box3Small,styles.mx10]}  onPress={this._toggleModalBasin}>
                                                        <Text style={[styles.iranSans,styles.textCenter,styles.textLight,styles.font12]}>انصراف</Text>
                                                    </Button>
                                                    <Button small style={[styles.box1Small,styles.mx10]} onPress={this._toggleModalBasin}>
                                                        <Text style={[styles.iranSans,styles.textCenter,styles.textLight,styles.font12]}>تایید</Text>
                                                    </Button>
                                                </Row>
                                            </Grid>
                                        </View>
                                    </Modal>
                                </Row>
                                <Row style={{alignItems: "center", justifyContent: "center"}}>
                                    <TouchableOpacity
                                        style={[styles.buttonBehnab2, styles.mt20]}
                                        onPress={() => {
                                            this._toggleModalFillBasin();
                                        }}
                                    >
                                        <Text style={[styles.iranSansBold, styles.mainColor2]}>
                                            پر کردن تشتک
                                        </Text>
                                    </TouchableOpacity>
                                    <Modal style={[styles.modal]}
                                           transparent={true}
                                           animationType={'fade'}
                                           isVisible={this.state.isModalVisibleFillBasin}>
                                        <View style={[styles.modalContent]}>
                                            <Grid style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                                <Row style={{alignItems:'center',justifyContent:'center'}}>
                                                    <Text style={[styles.iranSansBold,styles.textCenter,styles.mainColor2,styles.font16]}>آیا با این موضوع موافق هستید ؟</Text>
                                                </Row>
                                                <Row style={{alignItems:'flex-end',justifyContent:'center'}}>
                                                    <Button small style={[styles.box3Small,styles.mx10]}  onPress={this._toggleModalFillBasin}>
                                                        <Text style={[styles.iranSans,styles.textCenter,styles.textLight,styles.font12]}>انصراف</Text>
                                                    </Button>
                                                    <Button small style={[styles.box1Small,styles.mx10]} onPress={this._toggleModalFillBasin}>
                                                        <Text style={[styles.iranSans,styles.textCenter,styles.textLight,styles.font12]}>تایید</Text>
                                                    </Button>
                                                </Row>
                                            </Grid>
                                        </View>
                                    </Modal>
                                </Row>
                                <Row style={{alignItems: "center", justifyContent: "center"}}>
                                    <TouchableOpacity
                                        style={[styles.buttonBehnab2, styles.mt20]}
                                        onPress={() => {
                                            this._toggleModalWaterLevel();
                                        }}
                                    >
                                        <Text style={[styles.iranSansBold, styles.mainColor2]}>
                                            تنظیم ارتفاع آب
                                        </Text>
                                    </TouchableOpacity>
                                    <Modal style={[styles.modal]}
                                           transparent={true}
                                           animationType={'fade'}
                                           isVisible={this.state.isModalVisibleWaterLevel}>
                                        <View style={[styles.modalContent]}>
                                            <Grid style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                                <Row style={{alignItems:'center',justifyContent:'center'}}>
                                                    <Text style={[styles.iranSansBold,styles.textCenter,styles.mainColor2,styles.font16]}>آیا با این موضوع موافق هستید ؟</Text>
                                                </Row>
                                                <Row style={{alignItems:'flex-end',justifyContent:'center'}}>
                                                    <Button small style={[styles.box3Small,styles.mx10]}  onPress={this._toggleModalWaterLevel}>
                                                        <Text style={[styles.iranSans,styles.textCenter,styles.textLight,styles.font12]}>انصراف</Text>
                                                    </Button>
                                                    <Button small style={[styles.box1Small,styles.mx10]} onPress={this._toggleModalWaterLevel}>
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
export {Basin};
