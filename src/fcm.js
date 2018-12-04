import FCM, { FCMEvent, WillPresentNotificationResult, NotificationType } from "react-native-fcm";
import { Platform, AsyncStorage } from 'react-native';

export function initFCM() {
    FCM.createNotificationChannel({
        id: 'default',
        name: 'Default',
        description: 'used for example',
        priority: 'high'
    });

    FCM.getInitialNotification().then(notif => {
        console.log("notify", notif);
    });

    try {
        FCM.requestPermissions({
            badge: false,
            sound: true,
            alert: true
        })
            .then(result => console.log("FCM requestPermissions: ", result));
    } catch (e) {
        console.error(e);
    }

    FCM.getFCMToken().then(token => {
        console.log("TOKEN (getFCMToken)", token);
    });

    if (Platform.OS === "ios") {
        FCM.getAPNSToken().then(token => {
            console.log("APNS TOKEN (getFCMToken)", token);
        });
    }
    registerAppListener();
    subscribeTopics();
}

function registerAppListener() {
    FCM.on(FCMEvent.Notification, notif => {
        console.log("Notification", notif);

        if (Platform.OS === 'ios' && notif._notificationType === NotificationType.WillPresent && !notif.local_notification) {
            // this notification is only to decide if you want to show the notification when user if in foreground.
            // usually you can ignore it. just decide to show or not.
            notif.finish(WillPresentNotificationResult.All)
            return;
        }
    });

    FCM.on(FCMEvent.RefreshToken, token => {
        console.log("TOKEN (refreshUnsubscribe)", token);
    });
}

export function subscribeTopics() {
    AsyncStorage.getItem('@MySuperStore:credentials', (err, result1) => {
        console.log("credentials result1...", result1);
        console.log("err credentials...", err);
        var idToken = null;
        if (result1) {
            let credentials = JSON.parse(result1);
            idToken = credentials.idToken;
        }
        if (idToken) {
            return fetch(`https://api.honeycomb.be/v4/push/subscribe/topics`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: idToken
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('========subscribeTopics', responseJson)
                    const { data } = responseJson;
                    data.forEach((topic, index) => {
                        console.log("subscribe topic: ", topic);
                        FCM.subscribeToTopic(topic);
                    });
                    AsyncStorage.getItem('@MySuperStore:fcmTopics', (err, result1) => {
                        if (result1) {
                            let cachedTopics = JSON.parse(result1);
                            cachedTopics.forEach((cacheTopic) => {
                                if (data.indexOf(cacheTopic) === -1) {//not contain so keep up
                                    //unsubscribe this topic
                                    console.log("unsubscribe topic: ", cacheTopic);
                                    FCM.unsubscribeFromTopic(cacheTopic);
                                }
                            })
                        }
                        return AsyncStorage.setItem('@MySuperStore:fcmTopics', JSON.stringify(data))
                    })
                })
                .catch((error) => {
                    console.log('========getDataSlote', error);
                });
        } else {
            return Promise.resolve();
        }
    })
}

export function unsubcribeAllTopic() {
    return AsyncStorage.getItem('@MySuperStore:fcmTopics', (err, result1) => {
        console.log("fcmTopics: ", result1);
        if (result1) {
            let cachedTopics = JSON.parse(result1);
            cachedTopics.forEach((cacheTopic) => {
                console.log("unsubscribe topic: ", cacheTopic);
                FCM.unsubscribeFromTopic(cacheTopic);
            });
        }
        return AsyncStorage.setItem('@MySuperStore:fcmTopics', null)
    });
}