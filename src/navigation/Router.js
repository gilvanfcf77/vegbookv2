import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import PostDetails from '../screens/PostDetails';
import BottomTabNav from './BottomTabNavigator';

const Route = () => {

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#175d0320'
                    }
                }}>
                <Stack.Screen name='Home' component={BottomTabNav} options={{ headerShown: false }} />
                <Stack.Screen name='PostDetails' component={PostDetails} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Route;