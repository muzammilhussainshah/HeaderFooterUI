// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home/index';
import mapDirection from '../components/mapDirection';
import BarberHome from '../screens/BarberHome/index';
import Favorites from '../screens/Favorites/index';
import Profile from '../screens/Profile/index';
import Appointments from '../screens/Appointments/index';
import FullShop from '../screens/FullShop/index';
import Checkout from '../screens/Checkout/index';
import SignIn from '../screens/Authentiation/SignIn';
import VerifyCode from '../screens/Authentiation/verifyCode';
import ForgotPassword from '../screens/Authentiation/forgotPassword';
import NewPassword from '../screens/Authentiation/newPassword';
import SignUp from '../screens/Authentiation/SignUp';
import Subscription from '../screens/Payment/subscription';
import Webview from '../screens/Payment/webview';
import LandingPage from '../screens/LandingPage/index';
import Rating from '../screens/Rating/index';
import SocialSignupForm from '../screens/Authentiation/SocialSignupForm';
import CustomCalendar from '../screens/CustomCalendar/index';
// const StackNavigator = createStackNavigator({
//     SignIn: { screen: SignIn },
//     SignUp: { screen: SignUp },
//     SocialSignupForm: { screen: SocialSignupForm },
//     Home: { screen: Home },
//     BarberHome: { screen: BarberHome },
//     VerifyCode: { screen: VerifyCode },
//     ForgotPassword: { screen: ForgotPassword },
//     NewPassword: { screen: NewPassword },
//     Appointments: { screen: Appointments },
//     Profile: { screen: Profile },
//     Favorites: { screen: Favorites },
//     FullShop: { screen: FullShop },
//     Checkout: { screen: Checkout },
// }, {
//     headerMode: 'none',
//     navigationOptions: {
//         headerVisible: false,
//         drawerLockMode: 'locked-closed'
//     },
// });
// const Navigation = createAppContainer(StackNavigator)
// export default Navigation;



import React, { Component } from 'react';
import { Router, Scene, Actions,  } from 'react-native-router-flux'

class Route extends Component {
  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: "#f27500" }}
        titleStyle={{ color: "white" }}
        tintColor="white">
        <Scene>
          {/* <Scene key='GooglePlacesInput' component={GooglePlacesInput} hideNavBar={true} /> */}
          <Scene key='SignIn' component={SignIn} hideNavBar={true} initial />
          <Scene key='Rating' component={Rating} hideNavBar={true}  />
          <Scene key='SignUp' component={SignUp} hideNavBar={true}  />
          <Scene key='Subscription' component={Subscription} hideNavBar={true}  />
          <Scene key='Webview' component={Webview} hideNavBar={true}  />
          <Scene key='mapDirection' component={mapDirection} hideNavBar={true}  />
          <Scene key='SocialSignupForm' component={SocialSignupForm} hideNavBar={true}  />
          <Scene key='Home' component={Home} hideNavBar={true}  />
          <Scene key='BarberHome' component={BarberHome} hideNavBar={true}  />
          <Scene key='VerifyCode' component={VerifyCode} hideNavBar={true}  />
          <Scene key='ForgotPassword' component={ForgotPassword} hideNavBar={true}  />
          <Scene key='NewPassword' component={NewPassword} hideNavBar={true}  />
          <Scene key='Appointments' component={Appointments} hideNavBar={true}  />
          <Scene key='Profile' component={Profile} hideNavBar={true}  />
          <Scene key='Favorites' component={Favorites} hideNavBar={true}  />
          <Scene key='FullShop' component={FullShop} hideNavBar={true}  />
          <Scene key='Checkout' component={Checkout} hideNavBar={true}  />
          <Scene key='LandingPage' component={LandingPage} hideNavBar={true}  />
          <Scene key='CustomCalendar' component={CustomCalendar} hideNavBar={true}  />
          {/* <Scene key='Walkthrough' component={Walkthrough} hideNavBar={true} />
          <Scene key='Signin' component={Signin} hideNavBar={true} />
          <Scene key='Forgotyourpassword' component={Forgotyourpassword} hideNavBar={true} />
          <Scene key='VerifyCode' component={VerifyCode} hideNavBar={true} />
          <Scene key='VerifyCodeEmail' component={VerifyCodeEmail} hideNavBar={true} />
          <Scene key='Signup' component={Signup} hideNavBar={true} />
          <Scene key='ActivateAccount' component={ActivateAccount} hideNavBar={true} />
          <Scene key='Veryfiyournumber' component={Veryfiyournumber} hideNavBar={true} />
          <Scene key='Phoneverification' component={Phoneverification} hideNavBar={true} />
          <Scene key='CountryLists' component={CountryLists} hideNavBar={true} />
          <Scene key='Allowaccesslocation' component={Allowaccesslocation} hideNavBar={true} />
          <Scene key='AppContainer' component={AppContainer} hideNavBar={true} />
          <Scene key='Shop' component={Shop} hideNavBar={true} />
          <Scene key='Filters' component={Filters} hideNavBar={true} />
          <Scene key='FilteMap' component={FilteMap} hideNavBar={true} />
          <Scene key='SearchResults' component={SearchResults} hideNavBar={true} />
          <Scene key='FavouritesShops' component={FavouritesShops} hideNavBar={true} />
          <Scene key='ServiceDetaild' component={ServiceDetaild} hideNavBar={true} />
          <Scene key='OfferDetails' component={OfferDetails} hideNavBar={true} />
          <Scene key='BarberDetails' component={BarberDetails} hideNavBar={true} />
          <Scene key='ChooseService' component={ChooseService} hideNavBar={true} />
          <Scene key='Bookappointment' component={Bookappointment} hideNavBar={true} />
          <Scene key='Checkout' component={Checkout} hideNavBar={true} />
          <Scene key='Submited' component={Submited} hideNavBar={true} />
          <Scene key='Appointments' component={Appointments} hideNavBar={true} />
          <Scene key='AppointmentDetails' component={AppointmentDetails} hideNavBar={true} />
          <Scene key='Profile' component={Profile} hideNavBar={true} />
          <Scene key='Googlemapfullview' component={Googlemapfullview} hideNavBar={true} />
          <Scene key='ServiceListing' component={ServiceListing} hideNavBar={true} />
          <Scene key='MypaymentCard' component={MypaymentCard} hideNavBar={true} />
          <Scene key='AddPaymenCard' component={AddPaymenCard} hideNavBar={true} />
          <Scene key='CardVerification' component={CardVerification} hideNavBar={true} />
          <Scene key='TermsAndCondition' component={TermsAndCondition} hideNavBar={true} /> */}
        </Scene>
      </Router>
    )
  }
}

export default Route;