import {Navigation}  from 'react-native-navigation';
import {Welcome} from './components/Welcome/welcome';
import {Login}  from './components/Login/login';
import {InitialProfile}  from './components/InitialProfile/initialprofile';
import {Home}  from './components/Home/home';
import {Sidebar}  from './components/SideBar/sidebar';
import {WelcomeUser}  from './components/WelcomeUser/welcomeuser';
import {Guide}  from './components/Guide/guide';
import {GuideDetails}  from './components/GuideDetails/guidedetails';
import {Watering}  from './components/Watering/watering';
import {Weather}  from './components/Weather/weather';
import {Basin}  from './components/Basin/basin';

function registerScreens() {
    Navigation.registerComponent(`navigation.behnab.Welcome`, () => Welcome);
    Navigation.registerComponent(`navigation.behnab.Login`, () => Login);
    Navigation.registerComponent(`navigation.behnab.InitialProfile`, () => InitialProfile);
    Navigation.registerComponent(`navigation.behnab.Home`, () => Home);
    Navigation.registerComponent(`navigation.behnab.SideBar`, () => Sidebar);
    Navigation.registerComponent(`navigation.behnab.WelcomeUser`, () => WelcomeUser);
    Navigation.registerComponent(`navigation.behnab.Guide`, () => Guide);
    Navigation.registerComponent(`navigation.behnab.GuideDetails`, () => GuideDetails);
    Navigation.registerComponent(`navigation.behnab.Watering`, () => Watering);
    Navigation.registerComponent(`navigation.behnab.Weather`, () => Weather);
    Navigation.registerComponent(`navigation.behnab.Basin`, () => Basin);
}

module.exports = {registerScreens};
