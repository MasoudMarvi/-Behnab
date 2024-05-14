import React, {Component} from 'react';
import {
    Image, StyleSheet, Alert, ImageBackground, AsyncStorage, View,
} from 'react-native';
import {
    Container, Header, Left, Button, Picker, Form, Spinner,
    Icon, Body, Title, Right, Content, Input, Item, Label,
    Text, Drawer, Toast, CardItem, Card,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import moment from 'jalali-moment'
import {SideBar} from './index'
import styles from "../StyleSheet";

class BookService extends Component {
    constructor(props) {
        super(props);
        let month = [
            ["فروردین", 1, 31],
            ["اردیبهشت", 2, 31],
            ["خرداد", 3, 31],
            ["تیر", 4, 31],
            ["مرداد", 5, 31],
            ["شهریور", 6, 31],
            ["مهر", 7, 30],
            ["آبان", 8, 30],
            ["آذر", 9, 30],
            ["دی", 10, 30],
            ["بهمن", 11, 30],
            ["اسفند", 12, 29],
        ];
        this.state = {
            ServiceId: 0,
            selectedDay: 0,
            selectedYear: 0,
            selectedMonth: 0,
            months: month,
            service: null,
            loading: false,
            FirstName: '',
            LastName: '',
            BookDate: '',
            FirstNameError: false,
            LastNameError: false,
            BookDateError: false,
        }
    };

    onChangeDay(day) {
        let newDay = '';
        let numbers = '0123456789';
        let allow = true;
        for (let i = 0; i < day.length; i++) {
            if (numbers.indexOf(day[i]) > -1) {
                allow = false;
                newDay += day[i];
            }
        }
        this.setState({selectedDay: newDay});
    }

    onChangeYear(year) {
        let newYear = '';
        let numbers = '0123456789';
        let allow = true;
        for (let i = 0; i < year.length; i++) {
            if (numbers.indexOf(year[i]) > -1) {
                allow = false;
                newYear += year[i];
            }
        }
        this.setState({selectedYear: newYear});
    }

    async getService(id) {
        try {
            this.setState({loading: true});
            let token = await AsyncStorage.getItem('token');
            let url = 'http://upkon.ir/api/ApiService/DetailsService';
            let params = 'Id=' + String(id);
            url = url + '?' + params;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(token),
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({loading: false});
                    if (responseJson.Ok === true) {
                        this.setState({
                            service: responseJson.DetailsService
                        });
                    } else {
                        this.setState({loading: false});
                        Toast.show({
                            text: String(responseJson.Text),
                            duration: 3000,
                            type: "danger",
                            textStyle: {
                                fontFamily: 'IRANSans(FaNum)',
                                fontSize: 10,
                                color: '#ffffff',
                                textAlign: 'center'
                            },
                            position: "top"
                        });
                    }
                })
                .catch((error) => {
                    this.setState({loading: false});
                    Toast.show({
                        text: String(error), //'مشکل در برقراری ارتباط با سرور',
                        duration: 3000,
                        type: "danger",
                        textStyle: {
                            fontFamily: 'IRANSans(FaNum)',
                            fontSize: 10,
                            color: '#ffffff',
                            textAlign: 'center'
                        },
                        position: "top"
                    });
                });
        } catch (error) {
            this.setState({loading: false});
            Toast.show({
                text: 'مشکل در برقراری ارتباط با سرور',
                duration: 3000,
                type: "danger",
                textStyle: {
                    fontFamily: 'IRANSans(FaNum)',
                    fontSize: 10,
                    color: '#ffffff',
                    textAlign: 'center'
                },
                position: "top"
            });
        }
    }

    onMonthChange(index) {
        this.setState({
            selectedMonth: parseInt(index),
        });
    }

    componentDidMount() {
        let ServiceId = this.props.navigation.state.params.ServiceId;
        this.getService(ServiceId);
        let dt = new Date();
        let month = dt.getMonth() < 10 ? '0' + dt.getMonth() + 1 : dt.getMonth() + 1;
        let day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        let dateString = dt.getFullYear() + '/' + month + '/' + day;
        let m = moment(dateString, 'YYYY/MM/DD').locale('fa');
        this.setState({
            ServiceId: ServiceId,
            selectedYear: parseInt(m.format('YYYY')),
            selectedMonth: parseInt(m.format('MM')),
            selectedDay: parseInt(m.format('DD')),
        });
    };

    closeDrawer = () => {
        this.drawer._root.close();
    };
    openDrawer = () => {
        this.drawer._root.open();
    };

    async book() {
        let allow = true;
        let FirstName = this.state.FirstName;
        if (FirstName == null || FirstName.trim() === '') {
            allow = false;
            this.setState({FirstNameError: true});
        }
        let LastName = this.state.LastName;
        if (LastName == null || LastName.trim() === '') {
            allow = false;
            this.setState({LastNameError: true});
        }
        let month = parseInt(this.state.selectedMonth) + 1;
        let selectedYear = this.state.selectedYear;
        if (isNaN(selectedYear)) {
            allow = false;
            this.setState({BirthDateError: true});
        } else {
            let y = parseInt(selectedYear);
            if (y < 1300 || y > 1450) {
                allow = false;
                this.setState({BirthDateError: true});
            }
        }
        let selectedDay = this.state.selectedDay;
        if (isNaN(selectedDay)) {
            allow = false;
            this.setState({BookDateError: true});
        } else {
            let max = this.state.months[parseInt(this.state.selectedMonth)+1][2];
            let year = this.state.selectedYear;
            let month = parseInt(this.state.selectedMonth) +1;
            if (month === 12 && moment.jIsLeapYear(year)){
                max += 1;
            }            let d = parseInt(selectedDay);
            if (d < 1 || d > max) {
                allow = false;
                this.setState({BookDateError: true});
            }
        }
        if (allow) {
            let month = parseInt(this.state.selectedMonth) + 1;
            let bookingDate = this.state.selectedYear + '/' + month + '/' + this.state.selectedDay;
            this.setState({loading: true});
            let bookingInfo = {
                'FirstName': FirstName,
                'LastName': LastName,
                'ServiceId': String(this.state.ServiceId),
                'RezervDate': String(bookingDate)
            };
            let formBody = [];
            for (let property in bookingInfo) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(bookingInfo[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            let token = await AsyncStorage.getItem('token');
            fetch('http://upkon.ir/api/ApiService/Rezerv', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + String(token),
                },
                body: formBody
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({loading: false});
                    Toast.show({
                        text: String(responseJson.Text),
                        duration: 3000,
                        type: responseJson.Ok ? "success" : "danger",
                        textStyle: {
                            fontFamily: 'IRANSans(FaNum)',
                            fontSize: 10,
                            color: '#ffffff',
                            textAlign: 'center'
                        },
                        position: "top"
                    });
                    this.props.navigation.goBack();
                })
                .catch((error) => {
                    this.setState({loading: false});
                    Toast.show({
                        text: String(error), //'مشکل در برقراری ارتباط با سرور',
                        duration: 3000,
                        type: "danger",
                        textStyle: {
                            fontFamily: 'IRANSans(FaNum)',
                            fontSize: 10,
                            color: '#ffffff',
                            textAlign: 'center'
                        },
                        position: "top"
                    });
                });
        }
        else {
            Toast.show({
                text: 'لطفا فیلد های مشخص شده را بدرستی پر نمایید',
                duration: 3000,
                type: "danger",
                textStyle: {
                    fontFamily: 'IRANSans(FaNum)',
                    fontSize: 10,
                    color: '#ffffff',
                    textAlign: 'center'
                },
                position: "top"
            });
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ImageBackground
                source={require('../img/login.jpg')}
                style={[styles2.imageSplash]}
            >
                {this.state.loading ?
                    <View style={styles.Spinner}><Spinner size="large" color="#bed73c"/></View> : null}
                <Drawer ref={(ref) => {
                    this.drawer = ref;
                }}
                        content={<SideBar navigate={navigate}/>}
                        openDrawerOffset={0.4}
                        panCloseMask={0.4}
                        onClose={() => this.closeDrawer()}>
                    <Container>
                        <Header style={{backgroundColor: '#ffffff'}}>
                            <Left>
                                <Button transparent onPress={() => this.openDrawer()}>
                                    <Icon name="menu" style={{color: '#bed73c'}}></Icon>
                                </Button>
                            </Left>
                            <Right>
                                <Title style={styles.headerTitleText}>رزرو خدمات</Title>
                                <Button transparent onPress={() => navigate('Home')}>
                                    <Image source={require('../img/main-logo.png')}
                                           style={{width: 50, height: 50, resizeMode: 'contain',}}/>
                                </Button>
                            </Right>
                        </Header>
                        <Content>
                            <Card>
                                <CardItem header>
                                    <Body style={{flexDirection: 'row-reverse'}}>
                                    <Text style={{
                                        fontFamily: 'IRANSans(FaNum)',
                                        fontSize: 12
                                    }}>{this.state.service == null ? "نامشخص " : this.state.service.CategoryName + " "}</Text>
                                    <Icon type="FontAwesome" name="chevron-left"
                                          style={{color: '#bed73c', fontSize: 16, marginTop: 7}}/>
                                    <Text style={{
                                        fontFamily: 'IRANSans(FaNum)',
                                        fontSize: 12,
                                        paddingBottom: 3
                                    }}>{this.state.service == null ? "نامشخص " : this.state.service.Name + " "}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{height: 200, width: null, flex: 1}}
                                           source={this.state.service !== null && this.state.service.ImageUrl !== null ? {uri: String('http://upkon.ir/' + this.state.service.ImageUrl)} : require('../img/1.png')}/>
                                </CardItem>
                                <CardItem>
                                    <Text style={{
                                        fontFamily: 'IRANSans(FaNum)',
                                        fontSize: 12
                                    }}>{this.state.service == null ? "" : this.state.service.Description + " "}</Text>
                                </CardItem>
                            </Card>
                            <Form style={[styles2.FormStyle]}>
                                <Item inlineLabel
                                      error={this.state.FirstNameError}
                                      style={[styles2.inputBox1, styles.mt20]}>
                                    <Input underlineColorAndroid='transparent'
                                           style={styles2.LabelStyle}
                                           value={this.state.FirstName}
                                           returnKeyType={"next"}
                                           onSubmitEditing={() => {
                                               this.LastNameInput._root.focus()
                                           }}
                                           blurOnSubmit={false}
                                           onChangeText={(text) => this.setState({FirstName: text})}
                                    />
                                    <Label style={[styles2.LabelStyle, styles.bold]}>نام</Label>
                                </Item>
                                <Item inlineLabel
                                      error={this.state.LastNameError}
                                      style={[styles2.inputBox1, styles.mt20]}>
                                    <Input underlineColorAndroid='transparent'
                                           style={styles2.LabelStyle}
                                           value={this.state.LastName}
                                           returnKeyType={"next"}
                                           onSubmitEditing={() => {
                                               this.selectedDayInput._root.focus()
                                           }}
                                           blurOnSubmit={false}
                                           ref={(input) => {
                                               this.LastNameInput = input
                                           }}
                                           onChangeText={(text) => this.setState({LastName: text})}
                                    />
                                    <Label style={[styles2.LabelStyle, styles.bold]}>نام خانوادگی</Label>
                                </Item>
                                <Item inlineLabel
                                      error={this.state.BookDateError}
                                      style={[styles2.inputBox1, styles.mt20]}>
                                    <Input underlineColorAndroid='transparent'
                                           style={[styles2.LabelStyle, styles.textCenter]}
                                           value={String(this.state.selectedYear)}
                                           keyboardType={"numeric"}
                                           ref={(input) => {
                                               this.selectedYearInput = input
                                           }}
                                           onChangeText={(text) => this.onChangeYear(text)}/>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="ios-arrow-down-outline"/>}
                                        textStyle={{color: "#5cb85c", fontFamily: 'IRANSans(FaNum)'}}
                                        itemStyle={{backgroundColor: "#d3d3d3"}}
                                        itemTextStyle={{color: '#788ad2', fontFamily: 'IRANSans(FaNum)'}}
                                        style={[styles2.w100, styles2.LabelStyle]}
                                        selectedValue={this.state.selectedMonth}
                                        onValueChange={this.onMonthChange.bind(this)}>
                                        {this.state.months.map((mth, i) => (
                                            <Picker.Item
                                                kay={i} label={mth[0]} value={i}/>
                                        ))}
                                    </Picker>
                                    <Input underlineColorAndroid='transparent'
                                           style={[styles2.LabelStyle, styles.textCenter]}
                                           value={String(this.state.selectedDay)}
                                           returnKeyType={"next"}
                                           keyboardType={"numeric"}
                                           onSubmitEditing={() => {
                                               this.selectedYearInput._root.focus()
                                           }}
                                           blurOnSubmit={false}
                                           ref={(input) => {
                                               this.selectedDayInput = input
                                           }}
                                           onChangeText={(text) => this.onChangeDay(text)}/>
                                    <Label style={[styles2.LabelStyle, styles.bold]}>تاریخ رزرو</Label>
                                </Item>
                            </Form>
                            <Button block success
                                    style={[styles2.buttonSuccess, styles.mt20]}
                                    onPress={() => {
                                        this.book()
                                    }}>
                                <Text style={[styles2.buttonTextWhite]}>
                                    رزرو مشاوره
                                </Text>
                            </Button>
                        </Content>
                    </Container>
                </Drawer>
            </ImageBackground>
        );
    }
}

const styles2 = StyleSheet.create({
    FormStyle: {
        margin: 10,
        marginBottom: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(256,256,256,0.5)',
        borderWidth: 0,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
    },
    w100: {
        width: 100,
    },
    TextStyle: {
        color: '#424242',
        fontFamily: 'IRANSans(FaNum)',
    },
    headerTitleText: {
        color: '#424242',
        fontFamily: 'IRANSans(FaNum)_Bold',
        fontSize: 14,
        paddingBottom: 15,
    }, imageSplash: {
        flex: 1,
        height: undefined,
        width: undefined,
    }, LabelStyle: {
        fontFamily: 'IRANSans(FaNum)',
        fontSize: 12,
        color: '#424242',
        alignItems: 'flex-start',
    }, TextAreaStyle: {
        fontFamily: 'IRANSans(FaNum)',
        fontSize: 12,
        color: '#424242',
        alignItems: 'flex-start',
        marginRight: 10,
    },
    inputBox: {
        fontFamily: 'IRANSans(FaNum)',
        fontSize: 12,
        color: '#424242',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
        marginTop: 10,
    }, buttonSuccess: {
        alignItems: 'center',
        height: 35,
        backgroundColor: '#43a047',
        borderWidth: 0,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        color: '#ffffff',
        flex: 1,
    }, buttonTextWhite: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: 'IRANSans(FaNum)',
        paddingVertical: 5
    },
});
export {BookService};
