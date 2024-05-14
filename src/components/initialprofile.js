import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from "react-native";
import { Spinner, Toast } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import styles from "../StyleSheet.js";
class InitialProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      FirstName: "",
      LastName: "",
      InviteCode: ""
    };
  }
  async initialProfile() {
    this.props.navigation.navigate("WelcomeUser");
    // this.setState({ loading: true });
    // let token = await AsyncStorage.getItem("token");
    // let FirstName = this.state.FirstName;
    // let LastName = this.state.LastName;
    // let InviteCode = this.state.InviteCode;
    // let formInfo = {
    //   FirstName: FirstName,
    //   LastName: LastName,
    //   InviteCode: InviteCode
    // };
    // let formBody = [];
    // for (let property in formInfo) {
    //   let encodedKey = encodeURIComponent(property);
    //   let encodedValue = encodeURIComponent(formInfo[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");
    // fetch("http://upkon.ir/api/ApiProfile/InitialProfile", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Authorization: "Bearer " + String(token)
    //   },
    //   body: formBody
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.setState({ loading: false });
    //     if (responseJson.Ok !== true) {
    //       Toast.show({
    //         text: responseJson.Text,
    //         duration: 3000,
    //         type: "danger",
    //         textStyle: {
    //           fontFamily: "IRANSans(FaNum)",
    //           fontSize: 10,
    //           color: "#ffffff",
    //           textAlign: "center"
    //         },
    //         position: "top"
    //       });
    //     } else {
    //       Toast.show({
    //         text: responseJson.Text,
    //         duration: 3000,
    //         type: "success",
    //         textStyle: {
    //           fontFamily: "IRANSans(FaNum)",
    //           fontSize: 10,
    //           color: "#ffffff",
    //           textAlign: "center"
    //         },
    //         position: "top"
    //       });
    //       this.props.navigation.navigate("Home");
    //     }
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //     Toast.show({
    //       text: String(error), //'مشکل در برقراری ارتباط با سرور',
    //       duration: 3000,
    //       type: "danger",
    //       textStyle: {
    //         fontFamily: "IRANSans(FaNum)",
    //         fontSize: 10,
    //         color: "#ffffff",
    //         textAlign: "center"
    //       },
    //       position: "top"
    //     });
    //   });
  }
  componentDidMount() {}
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground
        source={require("../img/footer.png")}
        style={[styles.imageSplash]}
      >
        {this.state.loading ? (
          <View style={styles.Spinner}>
            <Spinner size="large" color="#bed73c" />
          </View>
        ) : null}
        <KeyboardAwareScrollView
          enableOnAndroid
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled
        >
          <View style={[styles.containerTransparent]}>
            <View style={[styles.containerTransparent]}>
              <View
                style={{
                  flex: 2,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={[styles.logo3Behnab, styles.mb10]}
                  source={require("../img/logo.png")}
                />
                <Text style={[styles.inPageTitle]}>
                  اطلاعات خود را وارد نمایید :
                </Text>
              </View>
              <View style={{ flex: 4 }}>
                <TextInput
                  underlineColorAndroid="transparent"
                  style={[styles.inputBoxBehnab2]}
                  placeholder="نام"
                  onChangeText={text => this.setState({ FirstName: text })}
                />
                <TextInput
                  underlineColorAndroid="transparent"
                  style={[styles.inputBoxBehnab2]}
                  placeholder="نام خانوادگی"
                  onChangeText={text => this.setState({ LastName: text })}
                />
                <TextInput
                  underlineColorAndroid="transparent"
                  style={[styles.inputBoxBehnab2]}
                  placeholder="نوع فعالیت"
                  onChangeText={text => this.setState({ InviteCode: text })}
                />
                <TextInput
                  underlineColorAndroid="transparent"
                  style={[styles.inputBoxBehnab2]}
                  placeholder="استان"
                  onChangeText={text => this.setState({ InviteCode: text })}
                />
                <TouchableOpacity
                  style={{ flex: 1, marginTop: 25, alignSelf: "center" }}
                  onPress={() => {
                    this.initialProfile();
                  }}
                >
                  <Image
                    style={styles.buttonNext}
                    source={require("../img/next-btn.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}
export { InitialProfile };
