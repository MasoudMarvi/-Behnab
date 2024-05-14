import React, {Component} from "react";
import {
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Linking,
} from "react-native";
import styles from "../../StyleSheet.js";
class Ad extends Component<Props> {
     constructor(props) {
        super(props);
        this.state = {
            image:'http://paradaim.com/Themes/paradaim/Content/bundle/images/intro.jpg',
            link:'http://paradaim.com'
        };
    }
    openLink = () => {
        Linking.canOpenURL(this.state.link).then(supported => {
            if (supported) {
                Linking.openURL(this.state.link);
            }
        });
     };
    render() {
        return (
        <TouchableOpacity
            onPress={this.openLink}
            style={[styles2.adBox]}>
            <Image
                style={[styles2.banner]}
                source={{uri: String(this.state.image)}}
            />
        </TouchableOpacity>
        );
    }
}

const styles2 = StyleSheet.create({
    adBox: {
        height: 150,
        width: Dimensions.get('window').width * 0.9,
        borderRadius:5,
    },
    banner: {
        flex: 1,
        height: 150,
        width: Dimensions.get('window').width * 0.9,
        resizeMode: Image.resizeMode.cover,
        borderRadius:5,
    }
});
export {Ad};
