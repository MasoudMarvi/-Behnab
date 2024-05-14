"use strict";

let React = require("react-native");
let { StyleSheet, Image, Dimensions } = React;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  containerTransparent: {
    flex: 1,
    backgroundColor: "transparent"
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  cardStyle: {
    height: Dimensions.get("window").height * 0.15,
    width: Dimensions.get("window").width * 0.3,
    borderWidth: 1,
    borderColor: "#212121",
    marginBottom: Dimensions.get("window").width * 0.01,
    marginTop: 0
  },
  cardImage: {
    width: 32,
    height: 32,
    resizeMode: Image.resizeMode.contain,
    alignItems: "center",
    marginTop: 15
  },
  cardImage2: {
    width: 200,
    height: 200,
    // resizeMode: Image.resizeMode.cover,
    alignSelf: "flex-end"
    // borderRadius: '50%',
  },
  cardText: {
    fontFamily: "IRANSans(FaNum)",
    fontSize: 12,
    fontWeight: "normal",
    alignSelf: "center"
  },
  bold: {
    fontFamily: "IRANSans(FaNum)_Bold",
    fontWeight: "normal"
  },
  listText: {
    fontFamily: "IRANSans(FaNum)",
    fontSize: 12,
    fontWeight: "normal"
  },
  listTextSuccess: {
    fontFamily: "IRANSans(FaNum)",
    fontSize: 12,
    fontWeight: "normal",
    color: "#2d862d"
  },
  activeTabText: {
    fontFamily: "IRANSans(FaNum)_Bold",
    fontSize: 14,
    fontWeight: "normal"
  },
  tabText: {
    fontFamily: "IRANSans(FaNum)",
    fontSize: 12,
    fontWeight: "normal"
  },
  headerTitleText: {
    fontFamily: "IRANSans(FaNum)",
    fontSize: 12,
    fontWeight: "normal",
    paddingBottom: 15
  },
  listIcon: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: Image.resizeMode.contain
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  list: {
    flex: 3,
    height: 300,
    backgroundColor: "#ffffff"
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  logo: {
    marginTop: 20,
    width: 50,
    height: 50,
    resizeMode: Image.resizeMode.contain
  },
  logoFooter: {
    width: 36,
    height: 36,
    resizeMode: Image.resizeMode.contain
  },
  logoItem: {
    width: 72,
    height: 72,
    resizeMode: Image.resizeMode.contain
  },
  logoItem1: {
    width: 64,
    height: 64,
    resizeMode: Image.resizeMode.contain
  },
  logoItem2: {
    width: 56,
    height: 56,
    resizeMode: Image.resizeMode.contain
  },
  logoItem3: {
    width: 48,
    height: 48,
    resizeMode: Image.resizeMode.contain
  },
  logo1: {
    height: 100,
    resizeMode: Image.resizeMode.contain
  },
  logo2: {
    marginTop: 15,
    height: 50,
    resizeMode: Image.resizeMode.contain
  },
  logo3: {
    height: 100,
    resizeMode: Image.resizeMode.contain
  },
  logo3Behnab: {
    height: 70,
    resizeMode: Image.resizeMode.contain
  },
  logo4: {
    position: "absolute",
    top: 10,
    padding: 10,
    width: 50,
    height: 50,
    resizeMode: Image.resizeMode.contain,
    alignSelf: "flex-end"
  },
  welcomeScreen: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 20
  },
  textpageScreen: {
    flex: 1,
    height: Dimensions.get("window").height - 325,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 20,
    padding: 10
  },
  w100: {
    width: "100%"
  },
  h100: {
    height: "100%"
  },
  borderLayout: {
    borderColor: "#ffffff",
    borderWidth: 1,
    margin: 20
  },
  splash: {
    flex: 8,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  imageSplash: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  CircleShape: {
    alignItems: "center",
    alignContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#bed73c"
  },
  toastTextStyle: {
    fontFamily: "IRANSans(FaNum)",
    fontSize: 10,
    color: "#ffffff"
  },
  toastButtonStyle: {
    fontFamily: "IRANSans(FaNum)",
    fontSize: 10,
    backgroundColor: "#ffffff",
    color: "red",
    borderRadius: 5
  },
  iteminputBox: {
    fontFamily: "IRANSans(FaNum)",
    fontSize: 10,
    color: "#424242",
    alignItems: "center",
    height: 35,
    backgroundColor: "#ffffff",
    borderWidth: 0,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10
  },
  inputBoxBehnab: {
    fontFamily: "IRANSans(FaNum)",
    color: "#424242",
    alignItems: "center",
    height: 50,
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent",
    borderBottomWidth: 5,
    underlineColorAndroid: "transparent"
    // elevation: 1,
    // marginLeft: 25,
    // marginRight: 25,
    // marginTop: 10,
  },
  alignRight: {
    alignItems: "right"
  },
  alignLeft: {
    alignItems: "left"
  },
  inputBoxBehnab2: {
    fontFamily: "IRANSans(FaNum)",
    fontSize: 12,
    color: "#424242",
    height: 40,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#01a4c5",
    // borderBottomWidth: 0,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 3,
    //   height: 3
    // },
    // shadowOpacity: 0.8,
    // shadowRadius: 5,
    // elevation: 1,
    paddingHorizontal: 20,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10
  },
  textCenter: {
    textAlign: "center"
  },
  inputBox: {
    fontFamily: "IRANSans(FaNum)",
    fontSize: 12,
    color: "#424242",
    alignItems: "center",
    height: 40,
    backgroundColor: "#ffffff",
    borderWidth: 0,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10
  },
  inputBox1: {
    fontFamily: "IRANSans(FaNum)",
    fontSize: 12,
    color: "#424242",
    alignItems: "flex-start",
    height: 40,
    backgroundColor: "#ffffff",
    borderWidth: 0,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: 25,
    marginRight: 25
    // marginTop: 10,
  },
  inputBoxMultiline: {
    fontFamily: "IRANSans(FaNum)",
    fontSize: 12,
    color: "#424242",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    borderWidth: 0,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10
  },
  buttonSuccess: {
    alignItems: "center",
    height: 35,
    backgroundColor: "#43a047",
    borderWidth: 0,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    color: "#ffffff"
  },
  buttonDanger: {
    alignItems: "center",
    height: 35,
    backgroundColor: "#d54644",
    borderWidth: 0,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    color: "#ffffff"
  },
  buttonPrimary: {
    alignItems: "center",
    height: 35,
    backgroundColor: "#29b6f6",
    borderWidth: 0,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    color: "#ffffff"
  },
  buttonNext: {
    width: 40,
    height: 20,
    resizeMode: "contain"
  },
  buttonSecondary: {
    alignItems: "center",
    height: 35,
    backgroundColor: "#ffffff",
    borderWidth: 0,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10
  },
  buttonTextBlack: {
    color: "#000000",
    fontSize: 14,
    fontFamily: "IRANSans(FaNum)",
    paddingTop: 5
  },
  buttonTextWhite: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "IRANSans(FaNum)",
    paddingTop: 5
  },
  textWhite: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "IRANSans(FaNum)"
  },
  mx25: {
    marginLeft: 25,
    marginRight: 25
  },
  inPageTitle: {
    fontSize: 14,
    fontFamily: "IRANSans(FaNum)_Bold"
  },
  subTitle: {
    alignContent: "center",
    fontSize: 12,
    fontFamily: "IRANSans(FaNum)"
  },
  pr5: {
    paddingRight: 5
  },
  mx5: {
    marginHorizontal: 5
  },
  mx10: {
    marginHorizontal: 10
  },
  mr10: {
    marginRight: 10
  },
  ml10: {
    marginLeft: 10
  },
  my5: {
    marginVertical: 5
  },
  my10: {
    marginVertical: 10
  },
  mt10: {
    marginTop: 10
  },
  mt20: {
    marginTop: 20
  },
  mb10: {
    marginBottom: 10
  },
  mb20: {
    marginBottom: 20
  },
  iranSans: {
    fontFamily: "IRANSans(FaNum)"
  },
  iranSansBold: {
    fontFamily: "IRANSans(FaNum)_Bold"
  },
  flex1: {
    flex: 1
  },
  icon: {
    width: 24,
    height: 24
  },
  textStyle: {
    fontSize: 18,
    color: "#000"
  },
  ImageStyle: {
    resizeMode: "contain",
    width: 30,
    height: 30
  },
  alignCenter: {
    alignSelf: "center"
  },
  hidden: {
    width: 0,
    height: 0
  },
  Spinner: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 99999
  },
  noContent: {
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "IRANSans(FaNum)",
    color: "#212121",
    fontSize: 14
  },
  disabledInput: {
    backgroundColor: "rgba(230,230,230,0.7)"
  },
  mainColor: {
    color: "#bed73c"
  },
  mainColor2: {
    color: "#01a4c5"
  },
  font10: {
    fontSize: 10
  },
  font12: {
    fontSize: 12
  },
  font14: {
    fontSize: 14
  },
  font16: {
    fontSize: 16
  },
  font18: {
    fontSize: 18
  },
  font20: {
    fontSize: 20
  },
  font22: {
    fontSize: 22
  },
  font24: {
    fontSize: 24
  },
  justifyCenter: {
    justifyContent: "center"
  },
  buttonBehnab1: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 150,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#01a4c5",
    marginTop: 10,
    marginHorizontal: 5,
    paddingTop: 5,
    color: "#01a4c5"
  },
  buttonBehnab2: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 150,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#01a4c5",
    marginTop: 10,
    marginHorizontal: 5,
    paddingTop: 5,
    color: "#01a4c5"
  },
  box1: {
    backgroundColor: "#43bf7f",
    borderRadius: 5,
    width: "100%",
    height: "100%",
    paddingHorizontal: 5
  },
  box1Small: {
    backgroundColor: "#43bf7f",
    borderRadius: 5
  },
  box2: {
    backgroundColor: "#8ad7af",
    borderRadius: 5,
    width: "100%",
    height: "100%",
    paddingHorizontal: 5
  },
  box3: {
    backgroundColor: "#01a4c5",
    borderRadius: 5,
    width: "100%",
    height: "100%",
    paddingHorizontal: 5
  },
  box3Small: {
      backgroundColor: "#01a4c5",
      borderRadius: 5
  },
  box4: {
    backgroundColor: "#bdc655",
    borderRadius: 5,
    width: "100%",
    height: "100%",
    paddingHorizontal: 5
  },
  box5: {
    backgroundColor: "#6f9342",
    borderRadius: 5,
    width: "100%",
    height: "100%",
    paddingHorizontal: 5
  },
  box6: {
    backgroundColor: "#066f86",
    borderRadius: 5,
    width: "100%",
    height: "100%",
    paddingHorizontal: 5
  },
  box7: {
    backgroundColor: "#8d0619",
    borderRadius: 5,
    width: "100%",
    height: "100%",
    paddingHorizontal: 5
  },
    box7Settings: {
        paddingVertical:10,
        alignItems: "center"
    },
  textLight: {
    color: "#ffffff"
  },
  textDark: {
    color: "#212121"
  },
  textColor: {
    color: "#bed73c"
  },
  textColor1: {
    color: "#01a4c5"
  },
  footerButton: {
    backgroundColor: "transparent",
    borderColor: "#bed73c",
    borderRadius: 5,
    borderWidth: 2,
    marginHorizontal: Dimensions.get("window").width * 0.004,
    marginVertical: 5,
    height: 90,
    width: Dimensions.get("window").width * 0.24
  },
  footerButton2: {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderColor: "#bed73c",
    borderRadius: 5,
    borderWidth: 2,
    marginHorizontal: Dimensions.get("window").width * 0.004,
    marginVertical: 5,
    height: 90,
    width: Dimensions.get("window").width * 0.24
  },
  footerButton2Active: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderColor: "#bed73c",
    borderRadius: 5,
    borderWidth: 2,
    marginHorizontal: Dimensions.get("window").width * 0.004,
    marginVertical: 5,
    height: 90,
    width: Dimensions.get("window").width * 0.24
  },
    modal:{
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    modalContent:{
        width:Dimensions.get("window").width * 0.8,
        // marginHorizontal:Dimensions.get("window").width * 0.05,
        height:Dimensions.get("window").height * 0.2,
        // marginVertical: Dimensions.get("window").height * 0.4,
        backgroundColor:'#ffffff',
        borderColor:'#01a4c5',
        borderWidth: 2,
        padding:10
  }
});
