import React, { Component } from 'react';
import {Image, View, Text, ImageBackground,
 TouchableOpacity, TextInput } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import styles from '../StyleSheet.js'
class Register extends React.Component {
  constructor() {
      super();
      this.state = {
       phoneNumber: ''
     };
   }
    render() {
        const {navigate} = this.props.navigation;
        return(
            <ImageBackground
                source={require('../img/login.jpg')}
                style={[styles.imageSplash]}
            >
                <KeyboardAwareScrollView enableOnAndroid
                                         resetScrollToCoords={{ x: 0, y: 0 }}
                                         contentContainerStyle={{flexGrow: 1}}
                                         scrollEnabled>
                    <View style={[styles.containerTransparent,styles.flex1]}>
                        <View style={[styles.containerTransparent, styles.borderLayout,styles.flex1]}>
                            <View style={{flex: 3 , alignItems: 'center', justifyContent: 'center'}}>
                                <Image
                                    style={styles.logo3}
                                    source={require('../img/main-logo.png')}
                                />
                            </View>
                            <View style={{flex: 4, marginBottom: 20}}>
                                <TextInput underlineColorAndroid='transparent'
                                           value={this.state.phoneNumber}
                                           style={[styles.inputBox,styles.mt20,styles.textCenter]}
                                           placeholder="لطفا شماره همراه خود را وارد کنید"
                                />
                                <TouchableOpacity style={[styles.buttonSuccess,styles.mt20]}
                                  onPress={()=> {navigate('Home');}}>
                                    <Text style={[styles.buttonTextWhite]}>
                                        ورود
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        );
    }
}
export {Register};
