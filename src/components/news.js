import React,{Component} from 'react';
import {
  Image,StyleSheet,ImageBackground,AsyncStorage,View,
} from 'react-native';
import {
    Container, Header, Left, Button,ListItem,List,Spinner,
    Icon, Body, Title, Right, Content, Tab, Tabs, ScrollableTab,
    Text, Drawer, Toast,Thumbnail
} from 'native-base';
import styles from '../StyleSheet.js'
import {SideBar} from './index'
class News extends Component{
  constructor() {
    super();
    this.state = {
        loading:false,
        categories: [],
     currentTabItems: [],
   };
 }
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  componentDidMount() {
      this.getMainCategories();
  }
  async getMainCategories() {
        try {
            this.setState({loading: true});
            let token = await AsyncStorage.getItem('token');
            let url = 'http://upkon.ir/api/ApiCategory/categorylist';
            let params = 'code=1';
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
                            this.getNews(id);
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
  async getNews(catId=0) {
  try {
      this.setState({loading: true});
      let token = await AsyncStorage.getItem('token');
      let url = 'http://upkon.ir/api/ApiNews/News';
      let params = 'categoryid='+String(catId);
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
                  this.setState({
                      currentTabItems: responseJson.newsList
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
  tabChange = (cat) => {
      let catId = cat.props.categoryId;
      this.getNews(catId);
  };
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
            <Title style={styles2.headerTitleText}>اخبار</Title>
            <Button transparent onPress={() => navigate('Home')}>
              <Image source={require('../img/main-logo.png')}
                     style={{width: 50,height: 50,resizeMode:'contain', }} />
            </Button>
          </Right>
        </Header>
        <Content>
            <Tabs renderTabBar={()=> <ScrollableTab />}
                  activeTextStyle={{color:'#fdd835'}}
                  onChangeTab={(obj)=> this.tabChange(obj.ref)}
                  tabStyle={{backgroungColor:'#5b5b5b'}}>
                  {this.state.categories.map((item,key)=>(
                    <Tab heading={item.Name} key={key}
                         textStyle={styles.tabText}
                         activeTextStyle={styles.activeTabText}
                         tabStyle={styles.tabText}
                         activeTabStyle={styles.activeTabText}
                         ref={String(item.Id)}
                         categoryId={String(item.Id)}>
                        <List>
                            {this.state.currentTabItems.map((news,i)=>(
                                <ListItem key={i}>
                                    <Body>
                                    <Text style={[styles.listText,styles.bold]}>{news.Title}</Text>
                                    <Text style={styles.listText}>{news.Summery}</Text>
                                    <Button small onPress={() => navigate('NewsDetails', {NewsId: news.Id})}>
                                        <Text style={styles.listText}>مشاهده مطلب</Text>
                                    </Button>
                                    </Body>
                                    <Thumbnail circle size={120} source={  news.ImageUrl !== null ? {uri: String('http://upkon.ir/' + news.ImageUrl)} :require('../img/1.png')}/>
                                </ListItem>
                            ))}
                        </List>
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
export {News};
