import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectPhotosScreen from '../screens/SelectPhotos';
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
                <Stack.Screen name='SelectPhoto' component={SelectPhotosScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Route;