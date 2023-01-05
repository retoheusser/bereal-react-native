/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import Feed from './src/screens/Feed';
import UserDetail from './src/screens/UserDetail';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitleStyle,
            headerStyle: styles.headerStyle,
          }}>
          <Stack.Screen
            name="Feed"
            component={Feed}
            options={{
              title: 'BeFake.',
            }}
          />
          <Stack.Screen
            name="UserDetail"
            component={UserDetail}
            options={{
              title: 'User',
              animation: 'slide_from_right',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  headerStyle: {
    backgroundColor: 'black',
  },
});

export default App;
