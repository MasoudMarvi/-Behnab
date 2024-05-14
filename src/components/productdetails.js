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
class ProductDetails extends Component{
  constructor() {
    super();
    this.state = {
        product: {
            Name: '',
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
      let productId = this.props.navigation.state.params.productId;
      this.getproductDetails(productId);
  }
  async getproductDetails(productId=0) {
  try {
      let token = await AsyncStorage.getItem('token');
      let url = 'http://upkon.ir/api/ApiProduct/DetailsProduct';
      let params = 'id='+String(productId);
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
                      product: responseJson.DetailsService,
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
              <Icon name="menu" style={{color:'#bed73c'}}></Icon>
            </Button>
          </Left>
          <Body style={{justifyContent: 'center',width: '100%',}}>
            <Title style={styles2.headerTitleText}>محصولات</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => navigate('Home')}>
              <Image source={require('../img/main-logo.png')}
                     style={{width: 50,height: 50,resizeMode:'contain', }} />
            </Button>
          </Right>
        </Header>
        <Content>
            <Card>
                <CardItem>
                    <Right>
                        <Body>
                            <Text style={[styles2.TextStyle,styles.bold]}>{this.state.product.Name}</Text>
                        </Body>
                    </Right>
                </CardItem>
                <CardItem cardBody>
                    <Image style={{height: 200, width: null, flex: 1}} source={ this.state.product.ImageUrl !== null ? {uri: String('http://upkon.ir/' + this.state.product.ImageUrl)} :require('../img/1.png')}/>
                </CardItem>
                <CardItem cardBody>
                    <Body style={{paddingHorizontal:20}}>
                        <HTML html={this.state.product.Description} imagesMaxWidth={Dimensions.get('window').width} />
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
export {ProductDetails};
