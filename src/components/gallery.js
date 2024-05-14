import React,{Component} from 'react';
import {
    Image,StyleSheet,ImageBackground,Alert,AsyncStorage,View,
    Dimensions,Modal,TouchableOpacity,FlatList,
} from 'react-native';
import {
    Container, Header, Left, Button, Icon, Body, Title, Right, Content,
    Tab, Tabs, ScrollableTab, Text, Drawer, Toast,Spinner
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {SideBar} from './index'
import styles from '../StyleSheet.js'
class Gallery extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            // anyContent: false,
            modalImage: '',
            categories: [],
            currentTabItems: null,
            loading: false,
            page: 1,
            gallery: null,
        };
    }
    closeDrawer = () => {
        this.drawer._root.close();
    };
    openDrawer = () => {
        this.drawer._root.open();
    };
    componentDidMount() {
        this.getGalleryCategories();
    }
    async getGalleryCategories() {
        try {
            this.setState({loading: true});
            let token = await AsyncStorage.getItem('token');
            let url = 'http://upkon.ir/api/ApiCategory/categorylist';
            let params = 'code=5';
            url = url + '?' + params;
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
                            this.getGallery(id,1);
                        }
                    }else {
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
    async getGallery(catId=0,page=1) {
        try {
            this.setState({loading: true});
            let token = await AsyncStorage.getItem('token');
            let url = 'http://upkon.ir/api/ApiCommon/GetGallery';
            let params = 'CatId='+String(catId);
            params += '&page='+String(page);
            url = url + '?' + params;
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
                    if (responseJson.Ok === true) {
                        let result =responseJson.Result;
                        let k = responseJson.Result.length;
                        let list = [];
                        for (let i=0; i < k; i++){
                            let el = {
                                Title: '',
                                ImageUrl: '',
                            };
                            el.Title = result[i].Title;
                            el.ImageUrl = result[i].ImageUrl;
                            list.push(el);
                        }
                        this.setState({
                            currentTabItems: list,
                        });
                    }else {
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
    tabChange = (cat) => {
        let currentPage = this.state.page;
        this.setState({page: 1});
        let catId = cat.props.categoryId;
        this.getGallery(catId,currentPage);
        // this.renderGallery();
    };
    setModalVisible(visible,image) {
        this.setState({modalImage: image});
        this.setState({modalVisible: visible});
    }
    renderGallery() {
        let elements = [];
        let count = this.state.currentTabItems.length;
        if (count !== 0) {
            // this.setState({anyContent:true});
            let rows = Math.ceil(count / 2.0);
            for (let k=0; k < rows; k++){
                    elements.push(
                        <Grid style={styles2.gridGallery}>
                            <Col size={41} key={2*k} style={styles2.colGallery}>
                                <TouchableOpacity onPress={() => this.setModalVisible()}>
                                    <Image onPress={{}}
                                           source={{uri: this.state.currentTabItems[2*k][1]}}
                                           style={styles2.imageGallery} />
                                </TouchableOpacity>
                            </Col>
                            <Col size={41} key={2*k+1} style={styles2.colGallery}>
                                <TouchableOpacity onPress={() => this.setModalVisible()}>
                                    <Image source={{uri: this.state.currentTabItems[2*k+1][1]}}
                                           style={styles2.imageGallery} />
                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    );
                }
            }else{
            // this.setState({anyContent:false});
        }
        return elements;
    }
    render() {
        const {navigate} = this.props.navigation;
        return(
            <ImageBackground
                source={require('../img/login.jpg')}
                style={[styles2.imageSplash]}
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
                                    <Icon name="menu" style={{color:'#bed73c'}}>
                                    </Icon>
                                </Button>
                            </Left>
                            <Right>
                            <Title style={styles2.headerTitleText}>گالری</Title>
                                <Button transparent onPress={() => navigate('Home')}>
                                    <Image source={require('../img/main-logo.png')}
                                           style={{width: 50,height: 50,resizeMode:'contain', }} />
                                </Button>
                            </Right>
                        </Header>
                        <Content>
                            <Modal
                                style={{justifyContent:'center', alignItems:'center'}}
                                animationType="slide"
                                transparent={true}
                                presentationStyle="fullScreen"
                                visible={this.state.modalVisible}>
                                <View style={{justifyContent:'center', alignItems:'center',backgroundColor: 'rgba(0,0,0,0.85)', height: Dimensions.get('window').height}}>
                                    <View style={{justifyContent:'center', alignItems:'center'}}>
                                        <Image source={{uri: this.state.modalImage}}
                                               style={styles2.imageModal} />
                                    </View>
                                </View>
                                <TouchableOpacity style={{alignSelf: 'center',position:'absolute', bottom:20}}
                                    onPress={() => {
                                        this.setModalVisible(false);
                                    }}>
                                    <Icon name='times-circle' type="FontAwesome" style={[styles2.iconClose]}/>
                                </TouchableOpacity>
                            </Modal>
                            <Tabs renderTabBar={()=> <ScrollableTab />}
                                  activeTextStyle={{color:'#fdd835'}}
                                  onChangeTab={(obj)=> this.tabChange(obj.ref)}
                                  tabStyle={{backgroungColor:'#5b5b5b'}}>
                                {this.state.categories.map((item,key)=>(
                                    <Tab heading={item.Name} key={key}
                                         style={{backgroundColor:'transparent'}}
                                         ref={String(item.Id)}
                                         textStyle={styles.tabText}
                                         activeTextStyle={styles.activeTabText}
                                         tabStyle={styles.tabText}
                                         activeTabStyle={styles.activeTabText}
                                         categoryId={String(item.Id)}>
                                        {this.state.currentTabItems !== null ? this.state.currentTabItems.length !== 0 ?
                                        <FlatList
                                            style={styles2.gridGallery}
                                            data={this.state.currentTabItems}
                                            numColumns={2}
                                            renderItem={({ item }) =>
                                                <TouchableOpacity style={styles2.colGallery}
                                                                  onPress={() => this.setModalVisible(true, String('http://upkon.ir' + item.ImageUrl))}>
                                                    <Image source={{uri: String('http://upkon.ir' + item.ImageUrl)}}
                                                    style={styles2.imageGallery} />
                                                </TouchableOpacity>
                                            }
                                        /> : <Text style={styles.noContent}>محتوایی جهت نمایش موجود نمی باشد.</Text> : null}
                                    </Tab>
                                ))}
                            </Tabs>
                        </Content>
                    </Container>
                </Drawer>
            </ImageBackground>
        );
    }
}
const styles2 = StyleSheet.create({
    iconClose: {
        color: 'white',
        fontSize: 42,
    },
    textWhite: {
      color: 'white',
    },
    TextStyle:{
        color:'#424242',
        fontFamily: 'IRANSans(FaNum)',
    },
    imageGallery: {
        width: Dimensions.get('window').width * 0.45 ,
        height: Dimensions.get('window').width * 0.45,
        borderWidth: 0,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
        alignItems: 'center',
    },
    imageModal: {
        width: Dimensions.get('window').width ,
        height: Dimensions.get('window').height*0.5 ,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    colGallery:{
        marginBottom:Dimensions.get('window').width * 0.02,
        width: Dimensions.get('window').width*0.5 ,
        backgroundColor:'transparent',
    },
    gridGallery:{
        paddingHorizontal: Dimensions.get('window').width * 0.02,
        paddingTop: Dimensions.get('window').width * 0.05,
        backgroundColor:'transparent'
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
    },serviceImage: {
        height: 200,
        width: 200,
        borderRadius: 100,
        alignItems:'center',
    }
});
export {Gallery};
