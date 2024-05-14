import React,{Component} from 'react';
import {
    Image, StyleSheet, ImageBackground, Alert, AsyncStorage, View, Dimensions,
} from 'react-native';
import {
    Container, Header, Left, Button, Card, CardItem,List,ListItem,Spinner,
    Icon, Body, Title, Right, Content, Tab, Tabs, ScrollableTab, Form, Picker,
    Text, Footer, FooterTab, Drawer, Toast, Thumbnail,
} from 'native-base';
import {SideBar} from './index'
import styles from '../StyleSheet.js'
class FansClub extends Component{
    constructor() {
        super();
        this.state = {
            fanclubs: [],
            fansclubinfo: null,
            loading:false,
        };
    }
    closeDrawer = () => {
        this.drawer._root.close();
    };
    openDrawer = () => {
        this.drawer._root.open();
    };
    componentDidMount() {
        // this.getWhatIsFanClub();
        // this.getFansClubList();
    }
    async getWhatIsFanClub() {
        try {
            this.setState({loading: true});
            let token = await AsyncStorage.getItem('token');
            let url = 'http://upkon.ir/api/ApiFansClub/GetInfo';
            fetch(url,{
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
                    if (responseJson.OK === true) {
                        this.setState({
                            categories: responseJson.Result
                        });
                        if (responseJson.Result[0] !== null){
                            let id = parseInt(responseJson.Result[0].Id);
                            this.getCategories(id);
                        }
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
        } catch (error) {
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
        }
    }

    async getFansClubList() {
        try {
            this.setState({loading: true});
            let token = await AsyncStorage.getItem('token');
            let url = 'http://upkon.ir/api/ApiFansClub/GetFansClubList';
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
                    if (responseJson.OK === true) {
                        this.setState({
                            categories: responseJson.Result
                        });
                        if (responseJson.Result[0] !== null) {
                            let id = parseInt(responseJson.Result[0].Id);
                            this.getCategories(id);
                        }
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
        }
    }
    render() {
        const {navigate} = this.props.navigation;
        return(
            <ImageBackground
                source={require('../img/login.jpg')}
                style={[styles.imageSplash]}
            >
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
                                    <Icon name="menu" style={{color:'#bed73c'}}></Icon>
                                </Button>
                            </Left>
                            <Body style={{justifyContent: 'center',width: '100%',}}>
                            <Title style={styles2.headerTitleText}>پکیج ها</Title>
                            </Body>
                            <Right>
                                <Button transparent onPress={() => navigate('Home')}>
                                    <Image source={require('../img/main-logo.png')}
                                           style={{width: 50,height: 50,resizeMode:'contain', }} />
                                </Button>
                            </Right>
                        </Header>
                        <Content>
                            <Tabs renderTabBar={()=> <ScrollableTab />}
                                  activeTextStyle={{color:'#fdd835'}}
                                  tabStyle={{backgroungColor:'#5b5b5b'}}>
                                <Tab heading="سطح ها و نحوه دسترسی"
                                     textStyle={styles.tabText}
                                     activeTextStyle={styles.activeTabText}
                                     tabStyle={styles.tabText}
                                     activeTabStyle={styles.activeTabText}>
                                </Tab>
                                <Tab heading="باشگاه مشتریان چیست؟"
                                     textStyle={styles.tabText}
                                     activeTextStyle={styles.activeTabText}
                                     tabStyle={styles.tabText}
                                     activeTabStyle={styles.activeTabText}>
                                    <Content>
                                        <Card>
                                            <CardItem>
                                                <Right>
                                                    <Body>
                                                        {this.state.fansclubinfo !== null ? <Text style={[styles2.TextStyle,styles.bold]}>{this.state.fansclubinfo.Title}</Text> : null}
                                                    </Body>
                                                </Right>
                                            </CardItem>
                                            <CardItem cardBody>
                                                <Body style={{paddingHorizontal:20}}>
                                                    {this.state.fansclubinfo !== null ? <HTML html={this.state.fansclubinfo.Text} imagesMaxWidth={Dimensions.get('window').width} /> : null}
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </Content>
                                </Tab>
                            </Tabs>
                        </Content>
                    </Container>
                </Drawer>
            </ImageBackground>
        );
    }
}
const styles2 = StyleSheet.create({
    TextStyle:{
        color:'#424242',
        fontFamily: 'IRANSans(FaNum)',
    },
    headerTitleText: {
        color:'#424242',
        fontFamily: 'IRANSans(FaNum)_Bold',
        fontSize: 14,
        alignSelf: 'center',
    },imageSplash: {
        flex:1,
        height: undefined,
        width: undefined,
    },serviceImage: {
        height: 200,
        width: 200,
        borderRadius: 100,
        alignItems:'center',
    }
});
export {FansClub};
