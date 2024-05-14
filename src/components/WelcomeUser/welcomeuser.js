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
import styles from "../../StyleSheet.js";
import {Navigation} from "react-native-navigation";
class WelcomeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      FirstName: "",
      LastName: "",
      fullname: "سید مسعود مروی نوغانی",
      InviteCode: ""
    };
  }
  render() {
    return (
      <ImageBackground
        source={require("../../img/footer.png")}
        style={[styles.imageSplash]}
      >
        {this.state.loading ? (
          <View style={styles.Spinner}>
            <Spinner size="large" color="#bed73c" />
          </View>
        ) : null}
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
                source={require("../../img/logo.png")}
              />
              <Text style={[styles.iranSans, styles.font20]}>
                آقای {this.state.fullname}
              </Text>
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-around"
                }}
              >
                <Text style={[styles.iranSans, styles.font20]}>به سامانه</Text>
                <Text
                  style={[
                    styles.iranSansBold,
                    styles.mainColor2,
                    styles.font20,
                    styles.mx5
                  ]}
                >
                  بهناب
                </Text>
                <Text style={[styles.iranSans, styles.font20]}>خوش آمدید</Text>
              </View>
            </View>
            <View
              style={{
                flex: 2,
                flexDirection: "row-reverse",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                style={styles.buttonBehnab1}
                onPress={() => {
                    Navigation.push(this.props.componentId, {
                        component: {
                            name: 'navigation.behnab.Guide',
                        }
                    });
                }}
              >
                <Text style={[styles.iranSansBold, styles.mainColor]}>
                  راهنمایی
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonBehnab1}
                onPress={() => {
                    Navigation.push(this.props.componentId, {
                        component: {
                            name: 'navigation.behnab.Home',
                        }
                    });                }}
              >
                <Text style={[styles.iranSansBold, styles.mainColor]}>
                  ورود
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export { WelcomeUser };
