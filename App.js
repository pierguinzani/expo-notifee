import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, AppRegistry } from 'react-native';
import notifee, { AndroidLaunchActivityFlag, EventType, TimestampTrigger, TriggerType, AndroidImportance, AndroidCategory, AndroidVisibility } from '@notifee/react-native';


// Create a channel (required for Android)
notifee.createChannel({
  id: 'test',
  name: 'Firing alarms & timers',
  lights: false,
  vibration: true,
  importance: AndroidImportance.HIGH,
});

const notifications = {
  example: {
    title: 'Title',
    body: 'Body',
    android: {
      channelId: 'test',
      category: AndroidCategory.CALL,
      visibility: AndroidVisibility.PUBLIC,
      importance: AndroidImportance.HIGH,
      timestamp: Date.now(),
      showTimestamp: true,
      pressAction: {
        id: "default",
        //mainComponent: 'custom',
        launchActivity: 'com.exponotifee.CustomActivity'
      },
      actions: [{
        title: "Option 1",
        pressAction: {
          id: "option1",
          launchActivity: 'com.exponotifee.CustomActivity',
        }
      }, {
        title: 'Option2',
        pressAction: {
          id: "option2",
        }
      }],
      fullScreenAction: {
        id: 'default',
        launchActivity: 'com.exponotifee.CustomActivity',
      },
    },
  }
}

export default function App() {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Display a notification
    notifee.displayNotification(notifications.example);
  }

  async function onCreateTriggerNotification() {
    const timestampDate = new Date(Date.now());
    timestampDate.setSeconds(timestampDate.getSeconds() + 5); //now + 5 seconds
    console.log(timestampDate.getTime())

    // Create a time-based trigger
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: timestampDate.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      notifications.example,
      trigger,
    );
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      <Button title="Display Notification" onPress={() => onDisplayNotification()} />
      <Button title="Create Trigger Notification" onPress={() => onCreateTriggerNotification()} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


AppRegistry.registerComponent('custom', () => CustomComponent);