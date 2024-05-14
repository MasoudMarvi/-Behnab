import React,{Component} from 'react';
import {
    Image, StyleSheet, ImageBackground, Alert, AsyncStorage, View, Dimensions,WebView
} from 'react-native';
import {
    Container, Header, Left, Button, Card, CardItem,ListItem,List,Spinner,
    Icon, Body, Title, Right, Content, Tab, Tabs, ScrollableTab, Form, Picker,
    Text, Footer, FooterTab, Drawer, Toast,Thumbnail
} from 'native-base';
import styles from '../StyleSheet.js'
import HTML from 'react-native-render-html';
import {SideBar} from './index'
class AboutUs extends Component{
  constructor() {
    super();
    this.state = {
     aboutus: null,
     loading: false,
     content: null,
   };
 }
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  componentDidMount() {
      this.getAboutUs();
  }
  async getAboutUs() {
  try {
      this.setState({loading: true});
      let token = await AsyncStorage.getItem('token');
      let url = 'http://upkon.ir/api/ApiPages/AboutUs';
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
                  this.setState({
                      aboutus: responseJson.Result,
                      content: String("<html><head><meta charset='UTF-8'></head><body><p style='text-align:justify;direction:rtl;'>" + responseJson.Result.Text + "</p><body></html>"),
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
              <Icon name="menu" style={{color: '#bed73c'}}/>
            </Button>
          </Left>
          <Right>
            <Title style={styles2.headerTitleText}>
                {this.state.aboutus !== null ? this.state.aboutus.Title:"درباره ما"}
            </Title>
            <Button transparent onPress={() => navigate('Home')}>
              <Image source={require('../img/main-logo.png')}
                     style={{width: 50,height: 50,resizeMode:'contain', }} />
            </Button>
          </Right>
        </Header>
        <Content>
            <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        style={styles.logo2}
                        source={require('../img/splashrotate.png')}
                    />
                    <View style={[styles2.borderLayout]}>
                        {this.state.content !== null ?
                            <WebView style={[styles2.WebViewStyle]}
                                     scalesPageToFit={true}
                                     source={{baseUrl: '', html: this.state.content }} />:
                            null
                        }
                    </View>
                    <Image
                        style={styles.logo2}
                        source={require('../img/splash.png')}
                    />
            </View>
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
        fontSize:14,
        paddingHorizontal:20,
        textAlign: 'justify',
        writingDirection: 'rtl',
    }, ContentStyle:{
        color:'#424242',
        fontFamily: 'IRANSans(FaNum)',
        fontSize:14,
        paddingHorizontal:20,
        flex:1,
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
    },WebViewStyle:{
        color:'#424242',
        fontFamily: 'IRANSans(FaNum)',
        fontSize: 14,
        flex:1,
        height: Dimensions.get('window').height*0.5,
        width: Dimensions.get('window').width*0.8,
        margin:Dimensions.get('window').width*0.05,
        // alignSelf: 'stretch',
        backgroundColor: 'transparent',
    },  borderLayout: {
        borderColor: '#bed73c',
        borderWidth: 1,
        flex:1,
        marginHorizontal:Dimensions.get('window').width*0.05,
        marginTop:15,
    },
});
export {AboutUs};
