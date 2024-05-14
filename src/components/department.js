import React, { Component } from 'react';
import {
    Image, View, Text, ImageBackground,Alert,Platform,
    TouchableOpacity, TextInput, AsyncStorage, FlatList, StyleSheet
} from 'react-native';
import { Content, Textarea, Form,Toast,Input,Left,Right,Body
    ,Header,Title,Button,Spinner,Label,Item,ListItem,Thumbnail,
    ScrollableTab,Tabs,Tab,Picker,Icon,Drawer,Container
} from "native-base";
import styles from '../StyleSheet.js'
import {SideBar} from './index'
import moment from "jalali-moment/jalali-moment";
class Department extends React.Component {
    constructor(props) {
        super(props);
        let month = [
            ["فروردین",1,31],
            ["اردیبهشت",2,31],
            ["خرداد",3,31],
            ["تیر",4,31],
            ["مرداد",5,31],
            ["شهریور",6,31],
            ["مهر",7,30],
            ["آبان",8,30],
            ["آذر",9,30],
            ["دی",10,30],
            ["بهمن",11,30],
            ["اسفند",12,29],
        ];
        this.state = {
            departments: null,
            selectedDay: 0,
            selectedYear: 0,
            selectedMonth: 0,
            months: month,
            loading: false,
            profile:null,
            FirstName: '',
            LastName: '',
            PhoneNumber:'',
            HomePhone:'',
            Address: '',
            Email: '',
            currentPage: 1,
            FirstNameError: false,
            LastNameError: false,
            PhoneNumberError:false,
            HomePhoneError:false,
            AddressError: false,
            EmailError: false,
            BirthDateError: false,
        };
    }
    onMonthChange(index) {
        this.setState({
            selectedMonth: parseInt(index),
        });
    }
    async getProfile() {
        this.setState({loading: true});
        let token = await AsyncStorage.getItem('token');
        let url = 'http://upkon.ir/api/ApiProfile/ShowProfile';
        fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + String(token),
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({loading: false});
                if (responseJson.Ok === true) {
                    this.setState({
                        profile: responseJson.ShowProfile,
                        FirstName: responseJson.ShowProfile.FirstName,
                        LastName: responseJson.ShowProfile.LastName,
                        PhoneNumber: responseJson.ShowProfile.PhoneNumber,
                        Address: responseJson.ShowProfile.Address,
                    });
                }else {
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
            .catch((error) =>{
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
    async sendRequest() {
        let allow = true;
        let token = await AsyncStorage.getItem('token');
        let FirstName = this.state.FirstName;
        if (FirstName == null || FirstName.trim() === ''){
            allow = false;
            this.setState({FirstNameError: true});
        }
        let LastName = this.state.LastName;
        if (LastName == null || LastName.trim() === ''){
            allow = false;
            this.setState({LastNameError: true});
        }
        let PhoneNumber = this.state.PhoneNumber;
        if (PhoneNumber == null || PhoneNumber.trim() === ''){
            allow = false;
            this.setState({PhoneNumberError: true});
        }
        let HomePhone = this.state.HomePhone;
        if (HomePhone == null || HomePhone.trim() === ''){
            allow = false;
            this.setState({HomePhoneError: true});
        }
        let Address = this.state.Address;
        if (Address == null || Address.trim() === ''){
            allow = false;
            this.setState({AddressError: true});
        }
        let Email = this.state.Email;
        if (Email == null || Email.trim() === ''){
            allow = false;
            this.setState({EmailError: true});
        }
        let month = parseInt(this.state.selectedMonth) +1;
        let selectedYear = this.state.selectedYear;
        if (isNaN(selectedYear)){
            allow = false;
            this.setState({BirthDateError: true});
        } else {
            let y = parseInt(selectedYear);
            if ( y < 1300 || y > 1450){
                allow = false;
                this.setState({BirthDateError: true});
            }
        }
        let selectedDay = this.state.selectedDay;
        if (isNaN(selectedDay)){
            allow = false;
            this.setState({BirthDateError: true});
        }else {
            let max = this.state.months[parseInt(this.state.selectedMonth)+1][2];
            let year = this.state.selectedYear;
            let month = parseInt(this.state.selectedMonth) +1;
            if (month === 12 && moment.jIsLeapYear(year)){
                max += 1;
            }            let d = parseInt(selectedDay);
            if ( d < 1 || d > max){
                allow = false;
                this.setState({BirthDateError: true});
            }
        }
        let BirthDate = selectedYear + '/' + month + '/' + selectedDay;
        if (allow) {
            this.setState({loading: true});
            let formInfo = {
                'FirstName': FirstName,
                'LastName': LastName,
                'PhoneNumber': PhoneNumber,
                'Address': Address,
                'Email': Email,
                'HomePhone': HomePhone,
                'BirthDate': String(BirthDate),
            };
            let formBody = [];
            for (let property in formInfo) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(formInfo[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch('http://upkon.ir/api/ApiMessages/SendDepatmentRequest',{
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
                    if (responseJson.Ok === true){
                        Toast.show({
                            text:responseJson.Text,
                            duration: 3000,
                            type: "success",
                            textStyle: {
                                fontFamily: 'IRANSans(FaNum)',
                                fontSize: 10,
                                color: '#ffffff',
                                textAlign: 'center'
                            },
                            position: "top"
                        });
                        this.props.navigation.navigate('Home');
                    }else {
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
                .catch((error) =>{
                    this.setState({loading: false});
                    this.setState({waitForCode: false});
                    Toast.show({
                        text: String(error),
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
    async getDepartments() {
        try {
            this.setState({loading: true});
            let token = await AsyncStorage.getItem('token');
            let url = 'http://upkon.ir/api/ApiCommon/Departments';
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
                            departments: responseJson.Result
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
    };
    closeDrawer = () => {
        this.drawer._root.close();
    };
    openDrawer = () => {
        this.drawer._root.open();
    };
    componentDidMount() {
        let dt = new Date();
        let month = dt.getMonth() < 10 ? '0' + dt.getMonth() + 1 : dt.getMonth() + 1;
        let day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        let dateString = dt.getFullYear() + '/' + month + '/' + day;
        let m = moment(dateString, 'YYYY/MM/DD').locale('fa');
        this.setState({
            selectedYear: parseInt(m.format('YYYY')),
            selectedMonth: parseInt(m.format('MM')),
            selectedDay: parseInt(m.format('DD')),
        });
        this.getProfile();
    }
    tabChange = (tab) => {
        let id = tab.props.tabId;
        switch (id){
            case '2':
                this.getProfile();
            break;
            case '1':
                this.getDepartments();
            break;
        }
    };
    render() {
        const {navigate} = this.props.navigation;
        return <ImageBackground
            source={require('../img/login.jpg')}
            style={[styles2.imageSplash]}>
            {this.state.loading ? <View style={styles.Spinner}><Spinner size="large" color="#bed73c"/></View> : null}
            <Drawer ref={(ref) => {this.drawer = ref;}}
                    content={<SideBar navigate = {navigate} />}
                    openDrawerOffset={0.4}
                    panCloseMask={0.4}
                    onClose={() => this.closeDrawer()}>
                <Container>
                    <Header hasTabs style={{backgroundColor: '#ffffff'}}>
                        <Left>
                            <Button transparent onPress={() => this.openDrawer()}>
                                <Icon name="menu" style={{color: '#bed73c'}}>
                                </Icon>
                            </Button>
                        </Left>
                        <Right>
                        <Title style={styles2.headerTitleText}>نمایندگی</Title>
                            <Button transparent onPress={() => navigate('Home')}>
                                <Image source={require('../img/main-logo.png')}
                                       style={{width: 50, height: 50, resizeMode: 'contain',}}/>
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Tabs renderTabBar={() => <ScrollableTab/>}
                              activeTextStyle={{color: '#fdd835'}}
                              onChangeTab={(obj)=> this.tabChange(obj.ref)}
                              tabStyle={{backgroungColor: '#5b5b5b'}}>
                            <Tab heading={'درخواست نمایندگی'} key={2}
                                 ref={'Tab2'}
                                 tabId={'2'}
                                 style={{backgroundColor: 'transparent'}}
                                 textStyle={styles.tabText}
                                 activeTextStyle={styles.activeTabText}
                                 tabStyle={styles.tabText}
                                 activeTabStyle={styles.activeTabText}>
                                <Form style={[styles2.FormStyle]}>
                                    <Item inlineLabel
                                          key={1}
                                          error={this.state.FirstNameError}
                                          style={[styles2.inputBox1, styles.mt20]}>
                                        <Input underlineColorAndroid='transparent'
                                               style={styles2.LabelStyle}
                                               value={this.state.FirstName}
                                               returnKeyType = { "next" }
                                               onSubmitEditing={() => { this.LastNameInput._root.focus() }}
                                               blurOnSubmit={false}
                                               onChangeText={(text) => this.setState({FirstName: text})}
                                        />
                                        <Label style={[styles2.LabelStyle, styles.bold]}>نام</Label>
                                    </Item>
                                    <Item inlineLabel
                                          key={2}
                                          error={this.state.LastNameError}
                                         style={[styles2.inputBox1, styles.mt20]}>
                                    <Input underlineColorAndroid='transparent'
                                           style={styles2.LabelStyle}
                                           value={this.state.LastName}
                                           returnKeyType = { "next" }
                                           onSubmitEditing={() => { this.PhoneNumberInput._root.focus() }}
                                           blurOnSubmit={false}
                                           ref={(input) => {this.LastNameInput = input}}
                                           onChangeText={(text) => this.setState({LastName: text})}
                                    />
                                    <Label style={[styles2.LabelStyle, styles.bold]}>نام خانوادگی</Label>
                                </Item>
                                    <Item inlineLabel
                                          key={3}
                                          error={this.state.PhoneNumberError}
                                          style={[styles2.inputBox1, styles.mt20]}>
                                        <Input underlineColorAndroid='transparent'
                                               style={styles2.LabelStyle}
                                               value={this.state.PhoneNumber}
                                               returnKeyType = { "next" }
                                               keyboardType={"numeric"}
                                               onSubmitEditing={() => { this.HomePhoneInput._root.focus() }}
                                               blurOnSubmit={false}
                                               ref={(input) => {this.PhoneNumberInput = input}}
                                               onChangeText={(text) => this.setState({PhoneNumber: text})}
                                        />
                                        <Label style={[styles2.LabelStyle, styles.bold]}>شماره همراه</Label>
                                    </Item>
                                    <Item inlineLabel
                                          key={4}
                                          error={this.state.HomePhoneError}
                                          style={[styles2.inputBox1, styles.mt20]}>
                                        <Input underlineColorAndroid='transparent'
                                               style={styles2.LabelStyle}
                                               value={this.state.HomePhone}
                                               returnKeyType = { "next" }
                                               keyboardType={"numeric"}
                                               onSubmitEditing={() => { this.EmailInput._root.focus() }}
                                               blurOnSubmit={false}
                                               ref={(input) => {this.HomePhoneInput = input}}
                                               onChangeText={(text) => this.setState({HomePhone: text})}
                                        />
                                        <Label style={[styles2.LabelStyle, styles.bold]}>شماره ثابت</Label>
                                    </Item>
                                    <Item inlineLabel
                                          key={5}
                                          error={this.state.EmailError}
                                          style={[styles2.inputBox1, styles.mt20]}>
                                        <Input underlineColorAndroid='transparent'
                                               style={styles2.LabelStyle}
                                               value={this.state.Email}
                                               returnKeyType = { "next" }
                                               onSubmitEditing={() => { this.selectedDayInput._root.focus() }}
                                               blurOnSubmit={false}
                                               ref={(input) => {this.EmailInput = input}}
                                               onChangeText={(text) => this.setState({Email: text})}
                                        />
                                        <Label style={[styles2.LabelStyle, styles.bold]}>ایمیل</Label>
                                    </Item>
                                    <Item inlineLabel
                                          key={6}
                                          error={this.state.BirthDateError}
                                          style={[styles2.inputBox1, styles.mt20]}>
                                        <Input underlineColorAndroid='transparent'
                                               style={[styles2.LabelStyle, styles.textCenter]}
                                               value={String(this.state.selectedYear)}
                                               returnKeyType = { "next" }
                                               keyboardType={"numeric"}
                                               onSubmitEditing={() => { this.AddressInput._root.focus() }}
                                               blurOnSubmit={false}
                                               ref={(input) => {this.selectedYearInput = input}}
                                               onChangeText={(text) => this.setState({selectedYear: text})}/>
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="ios-arrow-down-outline"/>}
                                            textStyle={{color: "#5cb85c", fontFamily: 'IRANSans(FaNum)'}}
                                            itemStyle={{backgroundColor: "#d3d3d3"}}
                                            itemTextStyle={{color: '#788ad2', fontFamily: 'IRANSans(FaNum)'}}
                                            style={[styles.textCenter, styles2.w100, styles2.LabelStyle]}
                                            selectedValue={this.state.selectedMonth}
                                            onValueChange={this.onMonthChange.bind(this)}>
                                            {this.state.months.map((mth, i) => (
                                                <Picker.Item
                                                    kay={"Month"+ String(i)} label={mth[0]} value={i}/>
                                            ))}
                                        </Picker>
                                        <Input underlineColorAndroid='transparent'
                                               style={[styles2.LabelStyle, styles.textCenter]}
                                               value={String(this.state.selectedDay)}
                                               returnKeyType = { "next" }
                                               keyboardType={"numeric"}
                                               onSubmitEditing={() => { this.selectedYearInput._root.focus() }}
                                               blurOnSubmit={false}
                                               ref={(input) => {this.selectedDayInput = input}}
                                               onChangeText={(text) => this.setState({selectedDay: text})}/>
                                        <Label style={[styles2.LabelStyle, styles.bold]}>تاریخ تولد</Label>
                                    </Item>
                                    <Item fixedLabel
                                          key={7}
                                          error={this.state.AddressError}
                                          underline={false}
                                          style={[styles2.inputBox1, styles.mt20,styles2.mt40]}>
                                        <Label style={[styles2.LabelStyle, styles.bold,styles2.adjust]}>آدرس دقیق محل سکونت</Label>
                                    </Item>
                                    <Textarea rowSpan={5}
                                              ref={(input) => {this.AddressInput = input}}
                                              value={this.state.Address}
                                              style={styles2.TextAreaStyle}
                                              onChangeText={(text) => this.setState({Address: text})}/>
                                    <TouchableOpacity style={[styles.buttonSuccess, styles.mt20]}
                                                      onPress={() => {
                                                          this.sendRequest()
                                                      }}>
                                        <Text style={[styles.buttonTextWhite]}>
                                            ارسال فرم
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.buttonDanger, styles.mt20]}
                                                      onPress={() => {
                                                          this.props.navigation.navigate('Home')
                                                      }}>
                                        <Text style={[styles.buttonTextWhite]}>
                                            بازگشت
                                        </Text>
                                    </TouchableOpacity>
                                </Form>
                            </Tab>
                            <Tab heading={'لیست نمایندگی ها'} key={1}
                                 ref={'Tab1'}
                                 tabId={'1'}
                                 style={{backgroundColor: 'transparent'}}
                                 textStyle={styles.tabText}
                                 activeTextStyle={styles.activeTabText}
                                 tabStyle={styles.tabText}
                                 activeTabStyle={styles.activeTabText}>
                                <FlatList
                                    data={this.state.departments}
                                    numColumns={1}
                                    renderItem={({ item,index }) =>
                                        <ListItem key={index}>
                                            <Body style={{paddingHorizontal:10}}>
                                            <Text style={[styles.listText]}>
                                                نمایندگی
                                                {"   "}
                                                <Label style={[styles.listText,styles.bold]}>
                                                    {item.Name}
                                                </Label>
                                            </Text>
                                            <Text style={[styles.listText]}>
                                                مدیریت
                                                {"   "}
                                                <Label style={[styles.listText,styles.bold]}>
                                                    {item.Manager}
                                                </Label>
                                            </Text>
                                            <Text style={[styles.listText]}>
                                                ایمیل
                                                {"   "}
                                                <Label style={[styles.listText,styles.bold]}>
                                                    {item.Email}
                                                </Label>
                                            </Text>
                                            <Text style={[styles.listText]}>
                                                تلفن تماس
                                                {"   "}
                                                <Label style={[styles.listText,styles.bold]}>
                                                    {item.Phone}
                                                </Label>
                                            </Text>
                                            <Text style={[styles.listText,styles.bold]}>
                                                آدرس
                                                {"   "}
                                                <Label style={[styles.listText]}>
                                                    {item.Address}
                                                </Label>
                                            </Text>
                                            <Text style={[styles.listText,styles.bold]}>
                                                توضیحات
                                                {"   "}
                                                <Label style={[styles.listText]}>
                                                    {item.Description}
                                                </Label>
                                            </Text>
                                            </Body>
                                            <Thumbnail circle source={  item.ImageUrl !== null ? {uri: String('http://upkon.ir/' + item.ImageUrl)} :require('../img/1.png')}/>
                                        </ListItem>
                                    }
                                    // keyExtractor={(item, index) => String(index)}
                                />
                            </Tab>
                        </Tabs>
                    </Content>
                </Container>
            </Drawer>
        </ImageBackground>;
    }
}
const styles2 = StyleSheet.create({
    FormStyle:{
        margin: 10,
        marginBottom:20,
        paddingBottom:20,
        paddingHorizontal:20,
        backgroundColor: 'rgba(256,256,256,0.5)',
        borderWidth: 0,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
    },
    w100: {
        width: 100,
    }, mr10: {
        marginRight:10,
    },ml10: {
        marginLeft:10,
    },mx20: {
        marginRight:20,
        marginLeft:20,
    },adjust: {
        paddingRight:20,
        paddingBottom:20,
    }, mt40:{
      marginTop:40,
    },TextStyle:{
        color:'#424242',
        fontFamily: 'IRANSans(FaNum)',
    }, LabelStyle:{
        fontFamily: 'IRANSans(FaNum)',
        fontSize: 12,
        color: '#424242',
        alignItems: 'flex-start',
    }, TextAreaStyle:{
        fontFamily: 'IRANSans(FaNum)',
        fontSize: 12,
        color: '#424242',
        backgroundColor: 'rgba(230,230,230,0.6)',
        alignItems: 'flex-start',
        // marginRight:10,
    },
    headerTitleText: {
        color:'#424242',
        fontFamily: 'IRANSans(FaNum)_Bold',
        fontSize: 14,
        paddingBottom:15,
    },imageSplash: {
        flex:1,
        height: undefined,
        width: undefined,
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
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
        marginTop: 10,
    },
    buttonSuccess: {
        alignItems: 'center',
        height: 35,
        backgroundColor: '#43a047',
        borderWidth: 0,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        color: '#ffffff',
        flex:1,
    },
    buttonTextWhite: {
        color:'#ffffff',
        fontSize: 14,
        fontFamily: 'IRANSans(FaNum)',
        paddingVertical: 5
    },textWhite:{
        color: '#ffffff',
    }
});
export {Department};
