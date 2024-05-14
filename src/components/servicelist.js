import React, {Component} from 'react';
import {
    Image, StyleSheet, ImageBackground, Alert, AsyncStorage, View,
} from 'react-native';
import {
    Container, Header, Left, Button, Icon, Body, Title, Right,
    Content, Thumbnail,Text, Drawer, Toast, ListItem, List, Spinner,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {SideBar} from './index'
import styles from '../StyleSheet.js'

class ServiceList extends Component {
    constructor() {
        super();
        this.state = {
            category: 0,
            services: [],
            loading: false,
        };
    }
    closeDrawer = () => {
        this.drawer._root.close();
    };
    openDrawer = () => {
        this.drawer._root.open();
    };
    componentDidMount() {
        let CatId = this.props.navigation.state.params.CatId;
        this.setState({category: CatId});
        this.getServices(CatId);
    }
    async getServices(id) {
        try {
            this.setState({loading: true});
            let token = await AsyncStorage.getItem('token');
            let url = 'http://upkon.ir/api/ApiService/Service';
            let params = 'categoryid=' + String(id);
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
                            services: responseJson.Result
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
                                <Title style={styles.headerTitleText}>لیست خدمات</Title>
                                <Button transparent onPress={() => navigate('Home')}>
                                    <Image source={require('../img/main-logo.png')}
                                           style={{width: 50, height: 50, resizeMode: 'contain',}}/>
                                </Button>
                            </Right>
                        </Header>
                        <Content>
                            <List style={{marginVertical: 20}}>
                                {this.state.services.map((item, key) => (
                                    <ListItem key={key}
                                              onPress={() => navigate('BookService', {ServiceId: item.Id})}
                                              style={item.Discount ? parseInt(item.Discount) > 0 ? styles2.listItemStyleDiscount : styles2.listItemStyle : styles2.listItemStyle}>
                                        <Body style={{marginRight: 10}}>
                                        <Grid style={{marginVertical: 5}}>
                                            <Row>
                                                <Col>
                                                    {item.Discount ? parseInt(item.Discount) > 0 ?
                                                        <Text style={[styles.listTextSuccess, styles.bold]}>
                                                            (
                                                            تخفیف
                                                            {" " + item.Discount + " "} %
                                                            )
                                                        </Text>
                                                        : null : null}
                                                </Col>
                                                <Col>
                                                    <Text style={[styles.listText, styles.bold]}>{item.Name}</Text>
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid>
                                            <Row>
                                                {item.TextSpecialService ? item.TextSpecialService !== '' ?
                                                    <Text style={styles.listText}>
                                                        {item.TextSpecialService}
                                                    </Text>
                                                    : null : null}
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Text style={[styles.listText, styles.bold]}>
                                                        هزینه
                                                        {item.Discount ? parseInt(item.Discount) > 0 ? " " + item.FinalPrice + " " : " " + item.Price + " " : " " + item.Price + " "}
                                                        تومان
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Grid>
                                        </Body>
                                        <Thumbnail circle large
                                                   source={item.ImageUrl !== null ? {uri: String('http://upkon.ir/' + item.ImageUrl)} : require('../img/1.png')}/>
                                    </ListItem>
                                ))}
                            </List>
                        </Content>
                    </Container>
                </Drawer>
            </ImageBackground>
        );
    }
}

const styles2 = StyleSheet.create({
    listItemStyle: {
        backgroundColor: 'rgba(230,230,230,0.4)',
        borderWidth: 0,
        borderRadius: 5,
        borderColor: '#ddd',
        // borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
        marginTop: 10,
        marginHorizontal: 18,
        paddingHorizontal: 8,
    },
    listItemStyleDiscount: {
        backgroundColor: 'rgba(77, 77, 255,0.1)',
        borderWidth: 0,
        borderRadius: 5,
        borderColor: '#ddd',
        // borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
        marginTop: 10,
        marginHorizontal: 18,
        paddingHorizontal: 8,
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
    },
    imageSplash: {
        flex: 1,
        height: undefined,
        width: undefined,
    },
});
export {ServiceList};
