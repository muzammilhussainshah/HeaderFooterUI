import ActionTypes from '../constant/constant';
import axios from 'axios';
import { Linking, Alert } from 'react-native';
import BaseUrl from '../../common/BaseUrl';
import Secretkey from '../../common/Secretkey';
import moment from 'moment';
import AvailbleSlotsData from "../../components/Checkout/AvailbleSlotsData"
import AsyncStorage from '@react-native-community/async-storage';
// import { LoginManager, LoginButton, AccessToken } from "react-native-fbsdk";
// import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
import { Actions } from 'react-native-router-flux';

export function _getShops(obj) {
    return dispatch => {
        var options = {
            method: 'POST',
            url: `${BaseUrl}shops/${0}/${20}`,
            headers: {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: {
                lat: obj.lat,
                long: obj.long,
                rangInKm: obj.rangInKm,
                currentUserUid: obj.currentUserUid
            }
        }
        axios(options)
            .then(result => {
                console.log(result, "shop+++++++++")
                let nearByShops = result.data.data
                dispatch({ type: ActionTypes.SHOPS, payload: nearByShops })
                dispatch(_loading(false))
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
                this.setState({
                    err: error,
                    isloader: false,
                })
            })
    }
}
export function _getFavShops(currentUserUid,) {
    return dispatch => {
        var options = {
            method: 'POST',
            url: `${BaseUrl}shops/_getFavShops`,
            headers: {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: { currentUserUid }
        }
        axios(options)
            .then(result => {
                console.log(result, "_getFavShops")
                let favoriteShops = result.data.data
                dispatch({ type: ActionTypes.FAVORITESHOPS, payload: favoriteShops })
                dispatch(_loading(false))
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
            })
    }
}
export function _getBookings(shop, date) {
    return dispatch => {
        console.log(shop, date, "--------")
        dispatch(_loading(true))
        var options = {
            method: 'POST',
            url: `${BaseUrl}bookings/${0}/${40}`,
            headers: {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: {
                shopId: shop.shopId,
                appointmentDate: date,
            }
        }
        axios(options)
            .then(result => {
                let bookings = result.data.data
                console.log(bookings, "5151531")
                dispatch({ type: ActionTypes.BOOKINGS, payload: bookings })
                let flag = false
                let slotsFrmStateClone = []
                AvailbleSlotsData.map((v, i) => {
                    if (v === shop.workingHours[0]) {
                        flag = true
                    }
                    if (flag) {
                        slotsFrmStateClone.push(v)
                    }
                    if (v === shop.workingHours[1]) {
                        flag = false
                    }
                })
                console.log("bookings--", bookings, slotsFrmStateClone)
                let filterslotsFrmStateClone = slotsFrmStateClone.slice(0)
                dispatch({ type: ActionTypes.AVAILBLESLOTS, payload: filterslotsFrmStateClone })
                dispatch(_loading(false))
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
                this.setState({
                    err: error,
                    isloader: false,
                })
            })
    }
}
export function getCurrentUserBooking(currentUser) {
    return dispatch => {
        console.log(currentUser, "--------")
        // This will return you the number of milliseconds
        // elapsed from January 1, 1970 
        // if your date is less than that date, the value will be negative

        console.log("millisecondsmillisecondsmilliseconds");

        dispatch(_loading(true))
        var options = {
            method: 'POST',
            url: `${BaseUrl}bookings/currentUserBooking/${0}/${30}`,
            headers: {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: {
                userDetail: {
                    "Full Name": currentUser.fullName,
                    "Phone": currentUser.phoneNumber,
                    "Email": currentUser.Email,
                    "clientId": currentUser.currentUserUid,
                }
            }
        }
        axios(options)
            .then(result => {
                let currentUserBooking = result.data.data.sort((a, b) => {
                    var dateMiliSecondA = moment(`${a.appointmentDate.split("-")[1]}/${a.appointmentDate.split("-")[0]}/${a.appointmentDate.split("-")[2]} ${a.appointmentTime}`).format("x");
                    var dateMiliSecondB = moment(`${b.appointmentDate.split("-")[1]}/${b.appointmentDate.split("-")[0]}/${b.appointmentDate.split("-")[2]} ${b.appointmentTime}`).format("x");
                    return dateMiliSecondA - dateMiliSecondB
                });
                console.log(currentUserBooking,"currentUserBookingcurrentUserBooking")
                dispatch({ type: ActionTypes.CURRENTUSERBOOKING, payload: currentUserBooking})
                dispatch(_loading(false))
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
                this.setState({
                    err: error,
                    isloader: false,
                })
            })
    }
}


export function getCurrentBarberBooking(currentUser, date) {
    return dispatch => {
        console.log(currentUser, "--------")
        dispatch(_loading(true))
        var options = {
            method: 'POST',
            url: `${BaseUrl}bookings/currentBarberBooking/${0}/${11}`,
            headers: {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: {
                currentUserUid: currentUser.currentUserUid, appointmentDate: date
            }
        }
        axios(options)
            .then(result => {
                console.log(result, "200")





                let booking = result.data.data.sort((a, b) => { return getTimeMilliseconds(a.appointmentTime) - getTimeMilliseconds(b.appointmentTime) });
                console.log(booking, "bookingbooking200")

                dispatch({ type: ActionTypes.CURRENTBARBERBOOKING, payload: result.data.data })
                dispatch(_loading(false))
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
                this.setState({
                    err: error,
                    isloader: false,
                })
            })
    }
}
export function getTimeMilliseconds(timeString) {
    var t = timeString.match(/(\d{1,2}):(\d{2}) ([AP]M)/),
        h = parseInt(t[1], 10),
        isAm = t[3] === 'AM',
        isMidnight = h === 12 && isAm,
        isNoon = h === 12 && !isAm;
    return new Date(0).setUTCHours(isMidnight ? 0 : h + (isAm || isNoon ? 0 : 12), parseInt(t[2], 10));
}
export function getCurrentShop(currentUserUid) {
    return dispatch => {
        console.log(currentUserUid, "--------")
        dispatch(_loading(true))
        var options = {
            method: 'POST',
            url: `${BaseUrl}shops/getCurrentShop`,
            headers: {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: {
                currentUserUid
            }
        }
        axios(options)
            .then(result => {
                console.log(result, "currentUserUid20000")
                dispatch({ type: ActionTypes.CURRENTSHOP, payload: result.data.data })
                dispatch(_loading(false))
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
                this.setState({
                    err: error,
                    isloader: false,
                })
            })
    }
}
export function shopClose(bol, currentUserUid) {
    return dispatch => {
        console.log(currentUserUid, "shopClose", bol)
        dispatch(_loading(true))
        var options = {
            method: 'POST',
            url: `${BaseUrl}shops/shopClose`,
            headers: {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
                "Content-Type": "application/json"
            },
            data: {
                currentUserUid, shopStatus: bol
            }
        }
        axios(options)
            .then(result => {
                console.log(result, "shopCloseshopCloseshopCloseshopClose")
                // dispatch({ type: ActionTypes.CURRENTSHOP, payload: result.data.data })
                dispatch(_loading(false))
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
                this.setState({
                    err: error,
                    isloader: false,
                })
            })
    }
}

export function _CancelAppointment(data, currentBooking, index, userRole) {
    return dispatch => {
        dispatch(_loading(true))
        console.log("work", data, currentBooking, index, userRole)
        var options = {
            method: 'POST',
            url: `${BaseUrl}bookings/_CancelAppointment`,
            headers: {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: {
                bookingId: data._id
            }
        }
        axios(options)
            .then(result => {
                currentBooking.splice(index, 1)
                console.log(result, "_CancelAppointment", currentBooking)
                if (userRole) {
                    dispatch({ type: ActionTypes.CURRENTUSERBOOKING, payload: currentBooking.length > 0 ? currentBooking : [] })
                }
                else {
                    dispatch({ type: ActionTypes.CURRENTBARBERBOOKING, payload: currentBooking.length > 0 ? currentBooking : [] })
                }
                dispatch(_loading(false))
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
                dispatch(_loading(false))
            })
    }
}

export function _CreateBooking(selectedSlot, date, userDetail, shop_id, shop) {
    return async dispatch => {
        console.log("--------++----", shop)
        // console.log("AAA",selectedSlot ,"AAA", date , shop_id , userDetail["Full Name"] , userDetail["Phone"] , userDetail["Email"])
        if (selectedSlot && date && shop_id && userDetail["Full Name"] && userDetail["Phone"] && userDetail["Email"] && userDetail["Address"]) {


            let bookingObj = {
                shopName: shop.shopName, phone: shop.phone, account: shop.account, price: shop.price, ownerId: shop.ownerId, address: shop.address,
                coverImg: shop.coverImg, location: shop.location,
                shop_id, selectedSlot, date, userDetail,
            }

            dispatch(saveBookingInDb(bookingObj))
            // try {
            //     const resp = await axios({
            //         method: 'POST',
            //         url: `${BaseUrl}createPay/payment-intent-connected`,
            //         data: { accountId: shop.account, price: shop.price }
            //     });
            //     console.log(resp.data, "booking", resp.data.paymentIntent.client_secret);
            //     let client_secret = resp.data.paymentIntent.client_secret
            //     Actions.Webview({
            //         uri: `https://stripe-monthly-subcription.web.app/${client_secret}/${shop.account}`,
            //         connected: true,
            //         bookingObj: bookingObj
            //     })

            //     dispatch(_loading(false))
            // } catch (err) {
            //     dispatch(_loading(false))
            //     console.error(err);
            // }
            // try {
            //     const resp = await axios({
            //         method: 'POST',
            //         url: `${BaseUrl}createPay/checkout-sessions`,
            //         data: { accountId: "acct_1HYrsCGLWkoz1zQ1" }
            //     });
            //     console.log(resp.data, "booking");

            //     Actions.Webview({sessionId:resp.data.session.id
            //         // uri: "http://192.168.10.14:3000/",
            //         // currentUserEmail
            //     })


            //     dispatch(_loading(false))

            // } catch (err) {
            //     dispatch(_loading(false))
            //     console.error(err);
            // }


            // var options = {
            //     method: 'POST',
            //     url: `${BaseUrl}bookings/createBookings`,
            //     headers: {
            //         'cache-control': 'no-cache',
            //         "Allow-Cross-Origin": '*',
            //     },
            //     data: {
            //         shopName: shop.shopName, phone: shop.phone, ownerId: shop.ownerId, address: shop.address,
            //         coverImg: shop.coverImg, location: shop.location,
            //         shop_id, selectedSlot, date, userDetail
            //     }
            // }
            // axios(options)
            //     .then(result => {
            //         var today = new Date;
            //         var dd = String(today.getDate()).padStart(2, '0');
            //         var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            //         var yyyy = today.getFullYear();
            //         today = yyyy + '-' + mm + '-' + dd;
            //         dispatch(thankYou(true))
            //         dispatch({ type: ActionTypes.DATECHANGE, payload: today })
            //         dispatch(_getBookings(shop, date))
            //     })
            //     .catch(err => {
            //         let error = JSON.parse(JSON.stringify(err))
            //         console.log(error, 'ERRROR', err)
            //         this.setState({
            //             err: error,
            //             isloader: false,
            //         })
            //     })
        }
        else {
            dispatch(_error("All fields are required"))
        }

    }
}

export function paymentTaking(data, currentBooking, index, userRole) {
    console.log(data, currentBooking, index, userRole, "paymentTaking", data)
    return async (dispatch) => {
        try {
            const resp = await axios({
                method: 'POST',
                url: `${BaseUrl}createPay/payment-intent-connected`,
                data: { accountId: data.account, price: data.price }
            });
            console.log(resp.data, "booking", resp.data.paymentIntent.client_secret);
            let client_secret = resp.data.paymentIntent.client_secret
            Actions.Webview({
                uri: `https://stripe-monthly-subcription.web.app/${client_secret}/${data.account}/${data.price}/Pay: ${data.shopName}`,
                // uri: `http://192.168.10.20:3000/${client_secret}/${data.account}/${data.price}`,
                // uri: `http://192.168.10.20:3000/${client_secret}/${data.account}/${data.price}`,
                connected: true,
                bookingId: data._id,
                shopId: data.shopId,
                shopName: data.shopName
            })

            dispatch(_loading(false))
        } catch (err) {
            dispatch(_loading(false))
            console.error(err);
        }
    }
}

export function saveBookingInDb(bookingObj) {
    return (dispatch) => {

        var options = {
            method: 'POST',
            url: `${BaseUrl}bookings/createBookings`,
            headers: {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: bookingObj
        }
        axios(options)
            .then(result => {
                var today = new Date;
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;
                dispatch(thankYou(true))
                dispatch({ type: ActionTypes.DATECHANGE, payload: today })
                // dispatch(_getBookings(shop, date))
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
            })

    }
}

export function payBookingInDb(bookingId, shopId, shopName) {
    return (dispatch) => {
        console.log(bookingId, "bookingIdbookingId")
        var options = {
            method: 'POST',
            url: `${BaseUrl}bookings/payBooking`,
            headers: {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: { bookingId }
        }
        axios(options)
            .then(result => {
                Actions.Rating({ shopId, shopName })
            })
            .catch(err => {
                // Actions.Rating({shopId,shopName})
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
            })

    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function _signUp(user, navigation) {
    return dispatch => {
        console.log(user, "uuuuuuuuuuuu")
        dispatch(_loading(true))
        if (
            (user && user["userRole"] === "User" && user["Full Name"] && user["Phone"]
                && user["Email"] && user["Password"] && user["Confirm Password"]) ||
            (user && user["userRole"] === "Barber" && user["Full Name"] && user["Phone"]
                && user["Email"] && user["Password"] && user["Confirm Password"]
                && user["Business Name"] && user["Hourly price"] && user["Description"]
                && user["Number & Street Name"] && user["City"] && user["Postcode"]
                && user["openingHours"] && user["closingHours"] && user["closingDay"] && (user["images"][0] !== "" || user["images"][1] !== ""))
        ) {
            if (validateEmail(user["Email"])) {
                if (user["Password"] === user["Confirm Password"]) {
                    var options = {
                        method: 'POST',
                        url: `${BaseUrl}signup`,
                        headers: {
                            // 'Content-Type': 'multipart/form-data',
                            'cache-control': 'no-cache',
                            "Allow-Cross-Origin": '*',
                            'Accept': 'application/json',

                        },
                        data: {
                            fullName: user["Full Name"],
                            email: user["Email"],
                            phoneNumber: user["Phone"],
                            password: user["Password"],
                            userRole: user["userRole"],
                            createdAt: Date.now(),
                        }
                        // bodyFormData

                    }
                    axios(options)
                        .then(result => {
                            console.log(result, "sssssssesultttt")
                            dispatch(verificationCodeSend(user["Email"], navigation, "SignIn"))
                            if (user["userRole"] === "Barber") {
                                var bodyFormData = new FormData();
                                bodyFormData.append('name', user["Business Name"]);
                                bodyFormData.append('email', user["Email"]);
                                bodyFormData.append('price', user["Hourly price"]);
                                bodyFormData.append('address', user["Number & Street Name"]);
                                bodyFormData.append('address', user["City"],);
                                bodyFormData.append('address', user["Postcode"]);
                                bodyFormData.append('phoneNumber', user["Phone"]);
                                bodyFormData.append('description', user["Description"]);
                                bodyFormData.append('openingHours', user["openingHours"]);
                                bodyFormData.append('closingHours', user["closingHours"]);
                                bodyFormData.append('closingDay', user["closingDay"]);
                                bodyFormData.append('ownerId', result.data.data._id);
                                // for (var i = 0; i < user["images"].length; i++) {

                                bodyFormData.append('coverImg', {
                                    uri: user["images"][0].path,
                                    type: user["images"][0].mime,
                                    name: 'photo.jpg',
                                });
                                // }
                                console.log(bodyFormData, "bodyFormData---")
                                var options = {
                                    method: 'POST',
                                    url: `${BaseUrl}createShop/createShoops`,
                                    headers: {

                                        'Accept': 'application/json',
                                        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                                        // 'cache-control': 'no-cache',
                                        // "Allow-Cross-Origin": '*',
                                    },
                                    data: bodyFormData
                                }

                                axios(options)
                                    .then(result => console.log(result, "resulttbodyFormDatatt"))
                                    .catch(err => console.log(err, 'ERRROR', JSON.parse(JSON.stringify(err))))
                            }
                        })
                        .catch(err => {
                            let error = JSON.parse(JSON.stringify(err))
                            console.log(error.message.split("code "), 'ERRROR',)
                            if (error.message.split("code ")[1] === "401") {
                                dispatch(_error("email address already exists", 12000))
                                dispatch(_loading(false))
                            }
                        })
                }
                else {
                    dispatch(_loading(false))
                    dispatch(_error("Password does not match"))
                }
            }
            else {
                dispatch(_loading(false))
                dispatch(_error("Invalid email"))
            }
        }
        else {
            dispatch(_loading(false))
            dispatch(_error("All fields are required"))
        }

    }
}


export function savePaymentInDb(currentUser, duration) {
    return async (dispatch) => {
        console.log(currentUser, "currentUsercurrentUser", duration)
        dispatch(_loading(true))
        try {
            const resp = await axios({
                method: 'POST',
                url: `${BaseUrl}createPay/monthly-payment-Save`,
                data: { currentUser, duration }
            });
            await AsyncStorage.setItem('subscriptionExpiry', currentUser.subscriptionExpiry + 2.628e+9)
            console.log(resp.data, "data");
            Actions.BarberHome()
            dispatch(_loading(false))

        } catch (err) {
            dispatch(_loading(false))
            console.log(err, "aaaaaaaaaaaaa");
        }

    }
}

export function freeTrial(currentUser) {
    return async (dispatch) => {
        dispatch(_loading(true))
        try {
            const resp = await axios({
                method: 'POST',
                url: `${BaseUrl}createPay/freetrial-payment-Save`,
                data: currentUser
            });
            await AsyncStorage.setItem('subscriptionExpiry', (Date.now() + 8.64e+7).toString())
            await AsyncStorage.setItem('freeTrialUsed', true.toString())
            Actions.BarberHome()
            console.log(resp.data);
            dispatch(_loading(false))

        } catch (err) {
            dispatch(_loading(false))
            console.error(err);
        }
    }
}


// export const savePaymentInDb = async (currentUser) => {
//     console.log(currentUser, "currentUsercurrentUser")
//     dispatch(_loading(true))
//     try {
//         const resp = await axios({
//             method: 'POST',
//             url: `${BaseUrl}createPay/monthly-payment-Save`,
//             data: currentUser 
//         });
//         Actions.BarberHome()
//         console.log(resp.data);
//     dispatch(_loading(false))

//     } catch (err) {
//     dispatch(_loading(false))
//         console.error(err);
//     }
// }

export const storeData = async (obj) => {
    console.log("storeData work", obj)
    try {
        await AsyncStorage.setItem('Email', obj.Email)
        await AsyncStorage.setItem('userRole', obj.userRole)
        await AsyncStorage.setItem('subscriptionExpiry', obj.subscriptionExpiry)
        await AsyncStorage.setItem('freeTrialUsed', obj.freeTrialUsed.toString())
        await AsyncStorage.setItem('fullName', obj.fullName)
        await AsyncStorage.setItem('phoneNumber', obj.phoneNumber)
        await AsyncStorage.setItem('currentUserUid', obj.currentUserUid)
        console.log("try")
    } catch (e) {
        console.log(e, "async error")
        // saving error
    }
}



export function _signIn(user, navigation) {
    return dispatch => {
        console.log(user, "++++++++++++++++++")
        if (user["Email"] && user["Password"]) {
            dispatch(_loading(true))
            if (validateEmail(user["Email"])) {
                var options = {
                    method: 'POST',
                    url: `${BaseUrl}signin/`,
                    headers: {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: {
                        email: user["Email"], password: user["Password"],
                    }
                }
                axios(options)
                    .then(result => {
                        console.log(result, "resu_signInltttt", result.data._id)
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: result.data })
                        let storeDataObj = {
                            Email: user["Email"],
                            userRole: result.data.userRole,
                            subscriptionExpiry: result.data.subscriptionExpiry,
                            fullName: result.data.fullName,
                            phoneNumber: result.data.phoneNumber,
                            currentUserUid: result.data._id,
                            freeTrialUsed: result.data.freeTrialUsed,
                        }
                        dispatch(saveCurrentUserInStore({
                            Email: user["Email"],
                            subscriptionExpiry: result.data.subscriptionExpiry,
                            userRole: result.data.userRole,
                            fullName: result.data.fullName,
                            phoneNumber: result.data.phoneNumber,
                            currentUserUid: result.data._id,
                            freeTrialUsed: result.data.freeTrialUsed,
                        }))
                        if (result.data.userRole === "User") {
                            storeData(storeDataObj)
                            dispatch(_loading(false))
                            Actions.Home()
                        }
                        else if (result.data.userRole === "Barber") {
                            if (!result.data.submitAccountDetails) {
                                Actions.LandingPage({ account: result.data.account, email: user["Email"] })
                                // dispatch(createStripeAcc(result.data.account, user["Email"]))
                            }
                            else {
                                dispatch(accountsRetrieve(result.data.account, storeDataObj))
                            }


                        }
                        // else if (result.data.userRole === "Barber" && (result.data.submitAccountDetails)) {
                        //   alert("")

                        // }
                        // else{
                        // }
                        dispatch(_loading(false))
                        // result.data.userRole === "User" ? Actions.Home() :
                        //     result.data.userRole === "Barber" &&
                        //         Date.now() < result.data.subscriptionExpiry ?
                        //         Actions.BarberHome() : Actions.Subscription()
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error.message.split("code "), 'ERRROR',)
                        if (error.message.split("code ")[1] === "409") {
                            dispatch(_error("Wrong Password"))
                        }
                        dispatch(_loading(false))
                    })
            }
            else {
                dispatch(_loading(false))
                dispatch(_error("Invalid email"))
            }
        }
        else {
            dispatch(_loading(false))
            dispatch(_error("All fields are required"))
        }
    }
}


export function accountsRetrieve(accountId, storeDataObj) {
    return async dispatch => {
        try {
            const resp = await axios({
                method: 'POST',
                url: `${BaseUrl}createPay/stripe-accounts-retrieve`,
                data: { accountId: accountId }
            });
            console.log(resp.data.account, "createStripeAcc");
            if (resp.data.account.requirements.pending_verification.length > 0) {
                // confirm(
                //     dispatch(linkOpen("Go to stripe setting & upload document"))
                // )
                Alert.alert(
                    "Notification",
                    "Go to stripe setting & upload document",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        {
                            text: "OK", onPress: () => {
                                let settingUrl = "https://dashboard.stripe.com/settings/"
                                Linking.canOpenURL(settingUrl).then(supported => {
                                    if (supported) {
                                        Linking.openURL(settingUrl);
                                    } else {
                                        console.log("Don't know how to open URI: " + settingUrl);
                                    }
                                });
                            }
                        }
                    ],
                    { cancelable: false }
                );

            }
            else {
                storeData(storeDataObj)
                console.log(storeDataObj.subscriptionExpiry, Date.now(), "Date.now()")
                if (storeDataObj.subscriptionExpiry > Date.now()) {
                    Actions.BarberHome()
                }
                else {
                    Actions.Subscription()
                }
            }
            // dispatch(_loading(false))

        } catch (err) {
            dispatch(_loading(false))
            console.error(err);
        }
    }
}
function linkOpen(msg) {
    let settingUrl = "https://dashboard.stripe.com/settings/"
    Linking.canOpenURL(settingUrl).then(supported => {
        if (supported) {
            Linking.openURL(settingUrl);
        } else {
            console.log("Don't know how to open URI: " + settingUrl);
        }
    });
    return msg
}
export function submitAccountDetails(bol, currentUserEmail) {
    return async dispatch => {
        try {
            const resp = await axios({
                method: 'POST',
                url: `${BaseUrl}createPay/submit-account-details`,
                data: { submitAccountDetails: bol, currentUserEmail }
            });
            console.log(resp.data.accountLinks, "createStripeAcc");
            Actions.Subscription()
            // dispatch(_loading(false))

        } catch (err) {
            dispatch(_loading(false))
            console.error(err);
        }
    }
}

export function createStripeAcc(accountId, currentUserEmail) {
    return async dispatch => {
        // alert(accountId+ currentUserEmail)
        try {
            const resp = await axios({
                method: 'POST',
                url: `${BaseUrl}createPay/create-account`,
                data: { accountId: accountId }
            });
            Actions.Webview({ uri: resp.data.accountLinks, currentUserEmail })
            dispatch(_loading(false))
            console.log(resp.data.accountLinks, "createStripeAcc");
            // dispatch(_loading(false))

        } catch (err) {
            dispatch(_loading(false))
            console.error(err);
        }
    }
}


export function _CreateRating(shopId, star, review, fullName) {
    console.log(moment().format('D-M-YYYY'))
    return async dispatch => {
        dispatch(_loading(true))
        console.log("shopId,star", shopId, star)
        try {
            const resp = await axios({
                method: 'POST',
                url: `${BaseUrl}rating/create-rating`,
                data: { shopId, star, review, fullName, date: moment().format('D-M-YYYY') }
            });
            Actions.Home()
            dispatch(_loading(true))
        } catch (err) {
            dispatch(_loading(false))
            console.error(err);
        }
    }
}





export function verificationCodeSend(email, navigation, routName) {
    return dispatch => {
        var options = {
            method: 'POST',
            url: `${BaseUrl}sendcode`,
            headers: {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: {
                email, createdAt: new Date().getTime(),
            }
        }
        axios(options)
            .then(result => {
                console.log(result, "code send")
                dispatch(_loading(false))

                Actions.VerifyCode({ email, routName })
            })
            .catch(err => {
                dispatch(_loading(false))
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR',)
            })
    }
}

export function _verifyCode(user, navigation, routName) {
    console.log("resulttttroutName", routName)

    return dispatch => {
        console.log(user, "++++++++++++++++++")
        if (user["Verification code"]) {
            dispatch(_loading(true))

            var options = {
                method: 'POST',
                url: `${BaseUrl}sendcode/verifycodeEmail`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: {
                    email: user.Email, timestampp: new Date().getTime(), code: user["Verification code"]
                }
            }
            axios(options)
                .then(result => {
                    console.log(result, "resultttt", navigation.state.routeName)
                    dispatch(_loading(false))

                    Actions[routName]({ email: user.Email, routName: "SignIn" })
                    // navigation.push(routName, { email: user.Email, routName: "SignIn" })
                })
                .catch(err => {
                    let error = JSON.parse(JSON.stringify(err))
                    // console.log(error, 'ERRROR',err)
                    // console.log(error.message.split("code "), 'ERRROR',)
                    if (error.message.split("code ")[1] === "409") {
                        dispatch(_error("INVALID VERIFICATION CODE"))
                    }
                    dispatch(_loading(false))
                })
        }
        else {
            dispatch(_error("All fields are required"))
        }

    }
}


export function _ForgotPassword(user, navigation) {
    console.log(user, "969555")
    return dispatch => {
        if (user["Email"]) {
            dispatch(_loading(true))
            if (validateEmail(user["Email"])) {
                dispatch(verificationCodeSend(user["Email"], navigation, "NewPassword"))
            }
            else {
                dispatch(_loading(false))
                dispatch(_error("Invalid email"))
            }
        }
        else {
            dispatch(_loading(false))
            dispatch(_error("All fields are required"))
        }
    }
}

export function _NewPassword(user, navigation, routName) {
    console.log(user, "969555", routName)
    return dispatch => {
        if (user["New Password"] && user["Confirm Password"]) {
            dispatch(_loading(true))
            if (user["New Password"] === user["Confirm Password"]) {
                var options = {
                    method: 'POST',
                    url: `${BaseUrl}resetpassword/changepassword`,
                    headers: {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: {
                        email: user.Email, newPassword: user["New Password"]
                    }
                }
                axios(options)
                    .then(result => {
                        console.log(result, "resultttt", navigation.state.routeName)
                        dispatch(_loading(false))
                        Actions[routName]()
                    })
                    .catch(err => {
                        let error = JSON.parse(JSON.stringify(err))
                        console.log(error, 'ERRROR', err)
                        // console.log(error.message.split("code "), 'ERRROR',)
                        // if (error.message.split("code ")[1] === "409") {
                        //     dispatch(_error("INVALID VERIFICATION CODE"))
                        // }
                        dispatch(_loading(false))
                    })






            }
            else {
                dispatch(_loading(false))
                dispatch(_error("Password does not match"))
            }
        }
        else {
            dispatch(_loading(false))
            dispatch(_error("All fields are required"))
        }
    }
}


export function _signUpSocial(user, navigation, nextRout) {
    console.log(user, "_signUpSocial", navigation, nextRout)
    return dispatch => {
        if ((user["userRole"] === "User" && user["Full Name"] && user["Phone"]) ||
            (user["Business Name"] && user["Description"] && user["Address"]
                && user["openingHours"] && user["closingHours"])) {

            dispatch(_loading(true))

            var options = {
                method: 'POST',
                url: `${BaseUrl}signup`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: {
                    fullName: user["Full Name"],
                    email: user["Email"],
                    phoneNumber: user["Phone"],
                    // password: user["Password"],
                    userRole: user["userRole"],
                    createdAt: Date.now(),
                }
            }
            axios(options)
                .then(result => {
                    if (user["userRole"] === "Barber") {
                        var options = {
                            method: 'POST',
                            url: `${BaseUrl}shops/createShoops`,
                            headers: {
                                'cache-control': 'no-cache',
                                "Allow-Cross-Origin": '*',
                            },
                            data: {
                                name: user["Business Name"],
                                address: user["Address"],
                                phoneNumber: user["Phone"],
                                description: user["Description"],
                                openingHours: user["openingHours"],
                                closingHours: user["closingHours"],
                            }
                        }
                        axios(options)
                            .then(result => {
                                console.log(result, "resultttt")
                                Actions.BarberHome()
                                dispatch(_loading(false))

                            })
                            .catch(err => {
                                let error = JSON.parse(JSON.stringify(err))
                                console.log(error.message.split("code "), 'ERRROR',)
                                dispatch(_loading(false))
                                if (error.message.split("code ")[1] === "401") {
                                    dispatch(_error("email address already exists"))
                                }
                            })
                    }
                    else {
                        Actions.Home()
                        dispatch(_loading(false))
                    }
                    // dispatch(verificatihonCodeSend(user["Email"], navigation, "SignIn"))
                })
                .catch(err => {
                    let error = JSON.parse(JSON.stringify(err))
                    console.log(error.message.split("code "), 'ERRROR',)
                    dispatch(_loading(false))
                    if (error.message.split("code ")[1] === "401") {
                        dispatch(_error("email address already exists"))
                    }
                })
        }
        else {
            dispatch(_loading(false))
            dispatch(_error("All fields are required"))
        }
    }
}


// export function _signInFacebook(navigation) {
//     // LoginManager.logOut()
//     return dispatch => {
//         LoginManager.logInWithPermissions(["email", "public_profile"]).then(
//             function (result) {
//                 if (result.isCancelled) {
//                     console.log("Login cancelled");
//                 } else {
//                     console.log(
//                         "Login success with permissions: ", result
//                     );
//                     AccessToken.getCurrentAccessToken().then((data) => {
//                         const { accessToken } = data
//                         dispatch(initUser(accessToken, navigation))
//                     })
//                 }
//             },
//             function (error) {
//                 console.log("Login fail with error: " + error);
//             }
//         );
//     }
// }

// LoginManager.logOut()

// export const _signInGoogle = async (navigation) => {
//     try {
//         await GoogleSignin.hasPlayServices();
//         const userInfo = await GoogleSignin.signIn();
//         //   this.setState({ userInfo });
//         console.log(userInfo, "userinfo")
//         checkUser(userInfo.user.email)

//         // var options = {
//         //     method: 'POST',
//         //     url: `${BaseUrl}signup/checkUser`,
//         //     headers: {
//         //         'cache-control': 'no-cache',
//         //         "Allow-Cross-Origin": '*',
//         //     },
//         //     data: {
//         //         email: userInfo.email
//         //     }
//         // }
//         // axios(options)
//         //     .then(result => {
//         //         console.log(result, "resultttt", navigation.state.routeName)
//         //         dispatch(_loading(false))
//         //         storeData({ Email: json.email })
//         //         navigation.navigate("Home")
//         //     })
//         //     .catch(err => {
//         //         let error = JSON.parse(JSON.stringify(err))
//         //         // console.log(error, 'ERRROR', err)
//         //         // console.log(error.message.split("code "), 'ERRROR',)
//         //         if (error.message.split("code ")[1] === "409") {
//         //             console.log('New User',)
//         //             navigation.navigate("SocialSignupForm", { email: json.email, routName: "Home" })
//         //         }
//         //         dispatch(_loading(false))
//         //     })


//     } catch (error) {
//         console.log({ error }, "error")

//         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//             // user cancelled the login flow
//         } else if (error.code === statusCodes.IN_PROGRESS) {
//             // operation (e.g. sign in) is in progress already
//         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//             // play services not available or outdated
//         } else {
//             // some other error happened
//         }
//     }
// }
// export const _signInGoogle = async () => {

//     };
// }


export function initUser(token, navigation) {
    return dispatch => {
        dispatch(_loading(true))
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                dispatch(checkUser(json.email, navigation))
                console.log(json.email, "999999999")

            })
            .catch(() => {
                dispatch(_loading(false))
            })
    }
}


export function checkUser(email, navigation) {
    console.log(navigation, "checkUser", email)
    return dispatch => {
        dispatch(_loading(true))
        var options = {
            method: 'POST',
            url: `${BaseUrl}signup/checkUser`,
            headers: {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: {
                email: email
            }
        }
        axios(options)
            .then(result => {
                console.log(result, "checkUser", navigation.state.routeName)
                dispatch(_loading(false))
                // storeData({ Email: email, userRole: result.data.userRole })
                storeData({
                    Email: user["Email"],
                    userRole: result.data.userRole,
                    fullName: result.data.fullName,
                    phoneNumber: result.data.phoneNumber,
                })
                result.data.userRole === "User" ? Actions.Home() : Actions.BarberHome()
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
                console.log(error.message.split("code "), 'ERRROR',)
                if (error.message.split("code ")[1] === "409") {
                    console.log('New User',)
                    Actions.SocialSignupForm({ email: email, routName: "Home" })
                }
                dispatch(_loading(false))
            })
    }
}
// export const _favorite = (currentUser, shop,) => {
//     return dispatch => {
//         console.log(currentUser, shop,)
//         let shopClone = shop
//         shop.currentUserUid = currentUser.currentUserUid




//     }
// }
export const _favorite = (currentUser, shop, bol, favoriteShops) => {
    return dispatch => {
        let shopClone = shop
        shop.currentUserUid = currentUser.currentUserUid
        console.log(shopClone, "shopClone", shop, bol, favoriteShops)
        if (bol) {
            var options = {
                method: 'POST',
                url: `${BaseUrl}favorite/createFavorite`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: {
                    favorite: shopClone
                }
            }
            axios(options)
                .then(result => {
                    let data = result.data.data
                    let favoriteShopsStore = favoriteShops
                    favoriteShopsStore.push(data)
                    dispatch({ type: ActionTypes.FAVORITESHOPS, payload: favoriteShopsStore })
                })
                .catch(err => {
                    console.log(err, "ERR_favorite")
                })
        }
        else {


            var options = {
                method: 'POST',
                url: `${BaseUrl}favorite/removeFavorite`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: {
                    favorite: shopClone
                }
            }
            axios(options)
                .then(result => {
                    console.log(result, "checkFavorite",)
                    let favoriteShopsStore = favoriteShops
                    let index = favoriteShopsStore.findIndex(x => x.shopId === shop.shopId);
                    favoriteShopsStore.splice(index, 1)
                    console.log(index, favoriteShopsStore);
                    dispatch({ type: ActionTypes.FAVORITESHOPS, payload: favoriteShopsStore })
                    Actions.refresh();
                })
                .catch(err => {
                    console.log(err, "ERR_favorite")
                })
        }

    }
}


export function saveCurrentUserInStore(user) {
    return dispatch => {
        dispatch({ type: ActionTypes.CURRENTUSER, payload: user })
    }
}
export function _loading(bol) {
    return dispatch => {
        dispatch({ type: ActionTypes.ISLOADER, payload: bol })
    }
}

export function _error(err, time) {
    return dispatch => {
        dispatch({ type: ActionTypes.ISERROR, payload: err })
        setTimeout(() => {
            dispatch({ type: ActionTypes.ISERROR, payload: "" })
        }, time ? time : 3000)
    }
}


export function _DateChange(date) {
    return dispatch => {
        dispatch({ type: ActionTypes.DATECHANGE, payload: date })
    }
}


export function thankYou(bolean) {
    return dispatch => {
        dispatch({ type: ActionTypes.THANKYOUFORORDER, payload: bolean })
    }
}


export function _selectTime(bolean) {
    return dispatch => {
        dispatch({ type: ActionTypes.THANKYOUFORORDER, payload: bolean })
    }
}