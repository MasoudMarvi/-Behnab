import React,{Component} from 'react';
import {
  Image,StyleSheet,ImageBackground,Alert,AsyncStorage,Dimensions
} from 'react-native';
import {
    Container, Header, Left, Button, Card, CardItem,ListItem,List,
    Icon, Body, Title, Right, Content, Tab, Tabs, ScrollableTab, Form, Picker,
    Text, Footer, FooterTab, Drawer, Toast,Thumbnail
} from 'native-base';
import styles from '../StyleSheet.js'
import HTML from 'react-native-render-html';
import {SideBar} from './index'
class NewsDetails extends Component{
  constructor() {
    super();
    this.state = {
        news: {
            Title: '',
            Description: '',
            ImageUrl: '',
        },
   };
 }
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  componentDidMount() {
      let NewsId = this.props.navigation.state.params.NewsId;
      this.getNewsDetails(NewsId);
  }
  async getNewsDetails(NewsId=0) {
  try {
      let token = await AsyncStorage.getItem('token');
      let url = 'http://upkon.ir/api/ApiNews/NewsDetail';
      let params = 'id='+String(NewsId);
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
              if (responseJson.Ok === true) {
                  this.setState({
                      news: responseJson.descriptinNews,
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
            <Title style={styles2.headerTitleText}>اخبار</Title>
            <Button transparent onPress={() => navigate('Home')}>
              <Image source={require('../img/main-logo.png')}
                     style={{width: 50,height: 50,resizeMode:'contain', }} />
            </Button>
          </Right>
        </Header>
        <Content>
            <Card>
                <CardItem style={{flexDirection:'row-reverse',paddingRight:10}}>
                        <Text style={[styles2.TextStyle,styles.bold]}>{this.state.news.Title}</Text>
                    <Right>
                    </Right>
                </CardItem>
                <CardItem cardBody>
                    <Image style={{height: 200, width: null, flex: 1}} source={ this.state.news.ImageUrl !== null ? {uri: String('http://upkon.ir/' + this.state.news.ImageUrl)} :require('../img/1.png')}/>
                </CardItem>
                <CardItem cardBody>
                    <Body style={{flexDirection:'row-reverse',paddingHorizontal:20}}>
                        <HTML html={this.state.news.Description} imagesMaxWidth={Dimensions.get('window').width} />
                    </Body>
                </CardItem>
            </Card>
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
export {NewsDetails};
