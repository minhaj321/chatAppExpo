import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login.jsx';
import Register from './screens/Register.jsx';
import MyChatList from './screens/MyChatList.jsx';
import ChatPage from './screens/ChatPage.jsx';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
 <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="/" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="myChatList" component={MyChatList} />
        <Stack.Screen name="chatPage" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:10
  },
});
