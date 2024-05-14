import React, { Component } from 'react';
import {
    Image, View, Text, ImageBackground,
    TouchableOpacity, TextInput, AsyncStorage, StyleSheet
} from 'react-native';
import {Spinner,Toast,Drawer,Container,Content,Header,
    Form,Item,Input,Label,Picker,Textarea,
    Left,Right,Button,Icon,Body,Title} from 'native-base';
import styles from '../StyleSheet.js'
import {SideBar} from './index'
class Profile extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          loading: false,
          profile:null,
          FirstName: '',
          LastName: '',
          PhoneNumber:'',
          HomePhone:'',
          InviteCode:'',
          Address:'',
      };
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
                    HomePhone: responseJson.ShowProfile.HomePhone,
                    InviteCode: responseJson.ShowProfile.InviteCode,
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
async updateProfile() {
    this.setState({loading: true});
    let token = await AsyncStorage.getItem('token');
    let FirstName = this.state.FirstName;
    let LastName = this.state.LastName;
    let HomePhone = this.state.HomePhone;
    let Address = this.state.Address;
    let formInfo = {
        'FirstName': FirstName,
        'LastName': LastName,
        'HomePhone': HomePhone,
        'Address': Address,
    };
    let formBody = [];
    for (let property in formInfo) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(formInfo[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch('http://upkon.ir/api/ApiProfile/EditProfile',{
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
            if (responseJson.Ok === true) {
                Toast.show({
                    text: responseJson.Text,
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
                this.getProfile();
            }else {
                Toast.show({
                    text: responseJson.Text,
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
closeDrawer = () => {
    this.drawer._root.close();
};
openDrawer = () => {
    this.drawer._root.open();
};
componentDidMount() {
    this.getProfile();
}
render() {
        const {navigate} = this.props.navigation;
        return(
            <ImageBackground
                source={require('../img/login.jpg')}
                style={[styles.imageSplash]}>
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
                                <Title style={styles2.headerTitleText}>پروفایل</Title>
                                <Button transparent onPress={() => navigate('Home')}>
                                    <Image source={require('../img/main-logo.png')}
                                           style={{width: 50, height: 50, resizeMode: 'contain'}}/>
                                </Button>
                            </Right>
                        </Header>
                        <Content>
                            <View style={{flex: 3 , alignItems: 'center', justifyContent: 'center'}}>
                                <Image style={styles.logo3} source={require('../img/main-logo.png')}/>
                            </View>
                            <Form style={[styles2.FormStyle]}>
                                <Item inlineLabel
                                      style={[styles2.inputBox, styles.mt20,styles.disabledInput]}>
                                    <Input underlineColorAndroid='transparent'
                                           style={[styles2.LabelStyle]}
                                           value={this.state.InviteCode}
                                           editable={false}/>
                                    <Label style={[styles2.LabelStyle2, styles.bold]}>کد معرفی شما</Label>
                                </Item>
                                <Item inlineLabel
                                      style={[styles2.inputBox1, styles.mt20]}>
                                    <Input underlineColorAndroid='transparent'
                                           style={styles2.LabelStyle}
                                           value={this.state.FirstName}
                                           onChangeText={(text) => this.setState({FirstName: text})}
                                    />
                                    <Label style={[styles2.LabelStyle, styles.bold]}>نام</Label>
                                </Item>
                                <Item inlineLabel
                                      style={[styles2.inputBox1, styles.mt20]}>
                                    <Input underlineColorAndroid='transparent'
                                           style={styles2.LabelStyle}
                                           value={this.state.LastName}
                                           onChangeText={(text) => this.setState({LastName: text})}
                                    />
                                    <Label style={[styles2.LabelStyle, styles.bold]}>نام خانوادگی</Label>
                                </Item>
                                <Item inlineLabel
                                      style={[styles2.inputBox1, styles.mt20]}>
                                    <Input underlineColorAndroid='transparent'
                                           editable={false}
                                           style={styles2.LabelStyle}
                                           value={this.state.PhoneNumber}
                                           onChangeText={(text) => this.setState({PhoneNumber: text})}
                                    />
                                    <Label style={[styles2.LabelStyle, styles.bold]}>شماره همراه</Label>
                                </Item>
                                <Item inlineLabel
                                      style={[styles2.inputBox1, styles.mt20]}>
                                    <Input underlineColorAndroid='transparent'
                                           style={styles2.LabelStyle}
                                           value={this.state.HomePhone}
                                           onChangeText={(text) => this.setState({HomePhone: text})}/>
                                    <Label style={[styles2.LabelStyle, styles.bold]}>تلفن ثابت</Label>
                                </Item>
                                <Item fixedLabel
                                      underline={false}
                                      style={[styles2.inputBox1, styles.mt20,styles2.mt40]}>
                                    <Label style={[styles2.LabelStyle, styles.bold,styles2.adjust]}>آدرس</Label>
                                </Item>
                                <Textarea rowSpan={5}
                                          value={this.state.Address}
                                          style={styles2.TextAreaStyle}
                                          onChangeText={(text) => this.setState({Address: text})}/>
                                <TouchableOpacity style={[styles.buttonSuccess, styles.mt20]}
                                                  onPress={() => {this.updateProfile()}}>
                                    <Text style={[styles.buttonTextWhite]}>
                                        بروزرسانی
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.buttonDanger, styles.mt20]}
                                                  onPress={() => {this.props.navigation.navigate('Home')}}>
                                    <Text style={[styles.buttonTextWhite]}>
                                        بازگشت
                                    </Text>
                                </TouchableOpacity>
                            </Form>
                        </Content>
                    </Container>
                </Drawer>
            </ImageBackground>
        );
    }
}

const styles2 = StyleSheet.create({
    FormStyle:{
        margin: 10,
        marginBottom:20,
        paddingBottom:20,
        paddingRight:10,
        paddingLeft:0,
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
    },LabelStyle2:{
        fontFamily: 'IRANSans(FaNum)',
        fontSize: 12,
        color: '#424242',
        alignItems: 'flex-start',
        marginLeft:30,
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

export {Profile};
