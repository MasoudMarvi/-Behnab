import React,{Component} from 'react';
import {
  Image,StyleSheet,ImageBackground,Alert,AsyncStorage,View,
} from 'react-native';
import {
    Container, Header, Left, Button, Card, CardItem,
    Icon, Body, Title, Right, Content, Form, Picker,Thumbnail,
    Text, Footer, FooterTab, Drawer, Toast,ListItem,List,Spinner,
} from 'native-base';
import {SideBar} from './index'
import styles from '../StyleSheet.js'
class OrderHistory extends Component{
  constructor() {
    super();
    this.state = {
     orders: [],
     loading: false,
    contentLoad:false,
   };
 }
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  componentDidMount() {
      this.getOrders();
  }
  async getOrders() {
        try {
            this.setState({loading: true});
            let token = await AsyncStorage.getItem('token');
            let url = 'http://upkon.ir/api/ApiClient/GetOrderList';
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
                    this.setState({contentLoad: true});
                    this.setState({loading: false});
                    if (responseJson.Ok === true) {
                        this.setState({
                            orders: responseJson.Result
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
                    this.setState({contentLoad: true});
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
            this.setState({contentLoad: true});
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
  getStatus(key){
        let status = this.state.orders[key].Status;
        let result="";
        switch (status.toLowerCase()){
            case "new":
                result = "جدید";
                break;
            case "cancel":
                result = "کنسل شده";
                break;
            case "cancelisadmin":
                result = "کنسل شده از طرف آرایشگاه";
                break;
            case "wait":
                result = "در انتظار تایید";
                break;
            case "ok":
                result = "تایید شده";
                break;
        }
        return result;
  }
  render() {
    const {navigate} = this.props.navigation;
   return(
      <ImageBackground
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
              <Icon name="menu" style={{color: '#bed73c'}}/>
            </Button>
          </Left>
          <Body style={{justifyContent: 'center',width: '100%',}}>
            <Title style={styles.headerTitleText}>آرشیو سفارشات</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => navigate('Home')}>
              <Image source={require('../img/main-logo.png')}
                     style={{width: 50,height: 50,resizeMode:'contain', }} />
            </Button>
          </Right>
        </Header>
        <Content>
            {this.state.contentLoad ? this.state.orders.length > 0 ?
              <List>
                  {this.state.orders.map((item,key)=>(
                      <ListItem key={key} OrderId ={item.Id}>
                          <Body>
                              <Text style={[styles.listText,styles.bold]}>{item.Name}</Text>
                              <Text style={styles.listText}>
                                  رزرو وقت برای
                                  {item.ServiceID !== 0 ? " " + item.ServiceName + " " :  null}
                                  {item.PackageID !== 0 ? " " + item.PackageName + " ": null}
                              </Text>
                              <Text style={styles.listText}>
                                  رزرو شده در تاریخ
                                  {" " + item.BookedOn + " "}
                              </Text>
                              <Text style={styles.listText}>
                                  برای تاریخ
                                  {" " + item.BookedFor + " "}
                              </Text>
                              <Button small transparent style={{marginTop: 5}}
                                      primary={item.Status.toLowerCase() === "new"}
                                      warning={item.Status.toLowerCase() === "wait"}
                                      danger={item.Status.toLowerCase() === "cancel" || item.Status.toLowerCase() === "cancelisadmin"}
                                      success={item.Status.toLowerCase() === "ok"}>
                                  <Text style={[styles.listText,styles2.statusStyle]}>
                                      {this.getStatus(key)}
                                  </Text>
                              </Button>
                          </Body>
                          <Thumbnail circle size={120} source={  item.ImageUrl !== null ? {uri: String('http://upkon.ir/' + item.ImageUrl)} :require('../img/1.png')}/>
                      </ListItem>
                  ))}
              </List> : <Text style={styles.noContent}>محتوایی جهت نمایش موجود نمی باشد.</Text> : null }
        </Content>
      </Container>
      </Drawer>
    </ImageBackground>
  );
  }
}
const styles2 = StyleSheet.create({
statusStyle: {
    fontSize: 14,
    fontFamily: 'IRANSans(FaNum)_Bold',
},
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
  },
});
export {OrderHistory};
