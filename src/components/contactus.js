import React, { Component } from 'react';
import {
    Image, View, ImageBackground,TextInput,
    TouchableOpacity, AsyncStorage, StyleSheet
} from 'react-native';
import {
    Container, Header, Left, Button, Form,Spinner, Toast,Item,Label,
    Icon, Title, Right, Content, Input, Text, Drawer,Textarea,
} from "native-base";
import {SideBar} from './index'
import styles from '../StyleSheet.js'
class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: '',
            Description:'',
            Type:1,
            TitleError: false,
            DescriptionError: false,
        };
    }
    async sendMessage() {
        let token = await AsyncStorage.getItem('token');
        let allow = true;
        let Title = this.state.Title;
        if (Title == null || Title.trim() === ''){
            allow = false;
            this.setState({TitleError: true});
        }
        let Description = this.state.Description;
        if (Description == null || Description.trim() === ''){
            allow = false;
            this.setState({DescriptionError: true});
        }
        let Type = this.state.Type;
        if (allow) {
            this.setState({loading: true});
            let formInfo = {
                'Title': Title,
                'Description': Description,
                'Type': Type,
            };
            let formBody = [];
            for (let property in formInfo) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(formInfo[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch('http://upkon.ir/api/ApiMessages/SendMessage', {
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
                        this.props.navigation.navigate('Home');
                    } else {
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
                    this.setState({waitForCode: false});
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
        else
        {
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
    closeDrawer = () => {
        this.drawer._root.close();
    };
    openDrawer = () => {
        this.drawer._root.open();
    };
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
                        <Header style={{backgroundColor: '#ffffff'}}>
                            <Left>
                                <Button transparent onPress={() => this.openDrawer()}>
                                    <Icon name="menu" style={{color:'#bed73c'}}>
                                    </Icon>
                                </Button>
                            </Left>
                            <Right>
                                <Title style={styles2.headerTitleText}>ارتباط با ما</Title>
                                <Button transparent onPress={() => navigate('Home')}>
                                    <Image source={require('../img/main-logo.png')}
                                           style={{width: 50,height: 50,resizeMode:'contain', }} />
                                </Button>
                            </Right>
                        </Header>
                        <Content padder>
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Image
                                    style={styles.logo3}
                                    source={require('../img/main-logo.png')}
                                />
                            </View>
                            <Form style={{marginTop: 10}}>
                                <Item inlineLabel
                                      error={this.state.TitleError}
                                      style={[styles2.inputBox1, styles.mt20]}>
                                    <Input underlineColorAndroid='transparent'
                                           style={styles2.LabelStyle}
                                           value={this.state.Title}
                                           returnKeyType = { "next" }
                                           onSubmitEditing={() => { this.DescriptionInput._root.focus() }}
                                           blurOnSubmit={false}
                                           onChangeText={(text) => this.setState({Title: text})}/>
                                    <Label style={[styles2.LabelStyle, styles.bold]}>عنوان پیام</Label>
                                </Item>
                                <Item fixedLabel
                                      error={this.state.DescriptionError}
                                      underline={false}
                                      style={[styles2.inputBox1, styles.mt20,styles2.mt40]}>
                                    <Label style={[styles2.LabelStyle, styles.bold,styles2.adjust]}>متن پیام</Label>
                                </Item>
                                <Textarea rowSpan={5}
                                          value={this.state.Description}
                                          style={styles2.TextAreaStyle}
                                          ref={(input) => {this.DescriptionInput = input}}
                                          onChangeText={(text) => this.setState({Description: text})}/>
                                <TouchableOpacity style={[styles.buttonSuccess, styles.mt20]}
                                                  onPress={()=> {this.sendMessage()}}>
                                    <Text style={[styles.buttonTextWhite]}>
                                        ارسال پیام
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.buttonDanger, styles.mt20]}
                                                  onPress={()=> {this.props.navigation.navigate('Home')}}>
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
export {ContactUs};
