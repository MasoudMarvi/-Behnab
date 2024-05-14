import React, {Component} from "react";
import {
    Image,
    View,
    ImageBackground,
    BackHandler,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    Text,
    TextInput
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
    Drawer,
    Card,
    CardItem,
    Spinner,
    Label,
    Form
} from "native-base";
import {Col, Row, Grid} from "react-native-easy-grid";
import TimerCountdown from "react-native-timer-countdown";
import styles from "../../StyleSheet.js";
import {Navigation} from "react-native-navigation";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsRemaining: 0,
            username: null,
            password: null,
            showToast: false,
            retry: false,
            showTimer: false,
            phoneNumber: "",
            inviteCode: "",
            activeCode: "",
            waitForCode: false,
            editable: true,
            token: "",
            loading: false,
            firstLogin: false,
            deviceId: "",
            deviceIdCopyFeedback: ""
        };
    }

    onChangePhone(phone) {
        let newPhone = "";
        let numbers = "0123456789";
        let allow = true;
        for (let i = 0; i < phone.length; i++) {
            if (numbers.indexOf(phone[i]) > -1) {
                allow = false;
                newPhone += phone[i];
            }
        }
        this.setState({
            phoneNumber: newPhone
        });
    }

    onTimePassed() {
        this.setState({
            retry: true
        });
        this.setState({
            showTimer: false
        });
    }

    async sendCode() {
        this.setState({
            retry: false
        });
        this.setState({
            showTimer: false
        });
        this.setState({
            loading: true
        });
        let phoneNumber = this.state.phoneNumber;
        let activeCode = this.state.activeCode;
        let loginInfo = {
            username: phoneNumber,
            password: activeCode,
            grant_type: "password"
        };
        let formBody = [];
        for (let property in loginInfo) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(loginInfo[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch("http://upkon.ir/token", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formBody
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    retry: false
                });
                this.setState({
                    showTimer: false
                });
                this.setState({
                    loading: false
                });
                this.setState({
                    token: responseJson.access_token
                });
                if (!responseJson.hasOwnProperty("error")) {
                    AsyncStorage.setItem("token", String(responseJson.access_token));
                    Toast.show({
                        text: "خوش آمدید",
                        duration: 3000,
                        type: "success",
                        textStyle: {
                            fontFamily: "IRANSans(FaNum)",
                            fontSize: 10,
                            color: "#ffffff",
                            textAlign: "center"
                        },
                        position: "top"
                    });
                    BackHandler.removeEventListener(
                        "hardwareBackPress",
                        this.handleBackPress
                    );
                    let firstLogin = this.state.firstLogin;
                    if (firstLogin === true) {
                        Navigation.push(this.props.componentId, {
                            component: {
                                name: 'InitialProfile',
                            }
                        });
                    } else {
                        Navigation.push(this.props.componentId, {
                            component: {
                                name: 'Home',
                            }
                        });
                    }
                }
                else
                {
                        this.setState({
                            activeCode: ""
                        });
                        this.setState({
                            retry: true
                        });
                        this.setState({
                            waitForCode: true
                        });
                        Toast.show({
                            text: String(responseJson.error),
                            duration: 3000,
                            type: "danger",
                            textStyle: {
                                fontFamily: "IRANSans(FaNum)",
                                fontSize: 10,
                                color: "#ffffff",
                                textAlign: "center"
                            },
                            position: "top"
                        });
                    }
            })
            .catch(error=> {
            this.setState({
                activeCode: "",
                retry: true,
                loading: false,
                waitForCode: false
             });
            Toast.show({
                 text: String(error),
                duration: 3000,
                type: "danger",
                textStyle: {
                    fontFamily: "IRANSans(FaNum)",
                    fontSize: 10,
                    color: "#ffffff",
                    textAlign: "center"
                },
                position: "top"
            });
        });
    }
async requestCode()
{
    Navigation.push(this.props.componentId, {
        component: {
            name: 'navigation.behnab.InitialProfile',
        }
    });
    // this.setState({
    //   retry: false
    // });
    // this.setState({
    //   showTimer: false
    // });
    // let phoneNumber = this.state.phoneNumber;
    // this.setState({
    //   loading: true
    // });
    // Toast.show({
    //   text: "بزودی پیامکی حاوی کد فعال سازی برای شما ارسال خواهد شد",
    //   duration: 3000,
    //   type: "info",
    //   textStyle: {
    //     fontFamily: "IRANSans(FaNum)",
    //     fontSize: 10,
    //     color: "#ffffff",
    //     textAlign: "center"
    //   },
    //   position: "top"
    // });
    // fetch("http://upkon.ir/api/ApiClient/register", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     PhoneNumber: phoneNumber
    //   })
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.setState({
    //       showTimer: true
    //     });
    //     this.setState({
    //       waitForCode: true
    //     });
    //     this.setState({
    //       loading: false
    //     });
    //     this.setState({
    //       firstLogin: responseJson.FirstLogin
    //     });
    //     if (responseJson.Ok !== true) {
    //       Toast.show({
    //         text: responseJson.Text,
    //         duration: 3000,
    //         type: "danger",
    //         textStyle: {
    //           fontFamily: "IRANSans(FaNum)",
    //           fontSize: 10,
    //           color: "#ffffff",
    //           textAlign: "center"
    //         },
    //         position: "top"
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     this.setState({
    //       showTimer: true
    //     });
    //     this.setState({
    //       waitForCode: false
    //     });
    //     this.setState({
    //       loading: false
    //     });
    //     Toast.show({
    //       text: String(error), //'مشکل در برقراری ارتباط با سرور',
    //       duration: 3000,
    //       type: "danger",
    //       textStyle: {
    //         fontFamily: "IRANSans(FaNum)",
    //         fontSize: 10,
    //         color: "#ffffff",
    //         textAlign: "center"
    //       },
    //       position: "top"
    //     });
    //   });
}
async componentWillUnmount()
{
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
}
handleBackPress = () => {
    return true;
};
render() {
    return (
        <ImageBackground
            source={require("../../img/background-01.png")}
            style={[styles.imageSplash]}
        >
            <View style={[styles.welcomeScreen, styles.borderLayout]}>
                <Grid>
                    <Row size={2}/>
                    <Row size={3}>
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Image
                                style={styles.logo3}
                                source={require("../../img/logo.png")}
                            />
                        </View>
                    </Row>
                    <Row size={2}>
                        <View style={{flex: 1, alignItems: "center"}}>
                            <Text style={[styles.inPageTitle]}>
                                حساب کاربری خود را ایجاد نمایید:
                            </Text>
                        </View>
                    </Row>
                    <Row size={2} style={{marginTop: 10}}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-around",
                                marginHorizontal: 20
                            }}
                        >
                            <Text style={[styles.iranSansBold, styles.font14]}>+99</Text>
                            <TextInput
                                style={[
                                    styles.inputBoxBehnab,
                                    styles.textCenter,
                                    styles.font14
                                ]}
                                placeholder="شماره همراه خود را وارد نمایید"
                                editable={!this.state.waitForCode}
                                keyboardType={"numeric"}
                                value={this.state.phoneNumber}
                                onChangeText={text => this.onChangePhone(text)}
                            />
                            {this.state.waitForCode ? null : (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.requestCode();
                                    }}
                                >
                                    <Image
                                        style={styles.buttonNext}
                                        source={require("../../img/next-btn.png")}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </Row>
                    <Row size={3}>
                        {this.state.waitForCode ? (
                            <TextInput
                                secureTextEntry={true}
                                keyboardType={"numeric"}
                                style={[styles.inputBox, styles.mt20, styles.textCenter]}
                                placeholder="لطفا کد رمز یک بار مصرف را وارد کنید"
                                editable={this.state.waitForCode}
                                value={this.state.activeCode}
                                onChangeText={text => this.setState({activeCode: text})}
                            />
                        ) : null}
                        {this.state.showTimer ? (
                            <TimerCountdown
                                initialSecondsRemaining={1000 * 60}
                                onTimeElapsed={() => this.onTimePassed()}
                                allowFontScaling={true}
                                style={{
                                    fontSize: 16,
                                    color: "#424242",
                                    fontFamily: "IRANSans(FaNum)",
                                    alignSelf: "center",
                                    marginVertical: 20
                                }}
                            />
                        ) : null}
                        {this.state.retry ? (
                            <TouchableOpacity
                                style={[styles.buttonPrimary, styles.mt20]}
                                onPress={() => {
                                    this.requestCode();
                                }}
                            >
                                <Text style={[styles.buttonTextWhite]}>تلاش مجدد</Text>
                            </TouchableOpacity>
                        ) : null}
                        {this.state.waitForCode ? (
                            <TouchableOpacity
                                style={[styles.buttonSuccess, styles.mt20]}
                                onPress={() => {
                                    this.sendCode();
                                }}
                            >
                                <Text style={[styles.buttonTextWhite]}>ورود</Text>
                            </TouchableOpacity>
                        ) : null}
                    </Row>
                </Grid>
            </View>
        </ImageBackground>
    );
}
}
export {Login};
