import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../modal/color';
import PostDetails from '../screens/PostDetails';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Listing from '../screens/Listing';

const BottomTabNav = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.basic,
            }}
            sceneContainerStyle={{
                backgroundColor: colors.background
            }}
        >
            <Tab.Screen
                name='Explorar'
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome
                            name='home'
                            size={25}
                            color={color}
                        />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name='Listing'
                component={Listing}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="clipboard-text"
                            size={24}
                            color={color}
                        />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name='Chat'
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo
                            name="chat"
                            size={24}
                            color={color}
                        />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome
                            name="user"
                            size={24}
                            color={color}
                        />
                    ),
                    headerShown: false
                }}
            />

        </Tab.Navigator>
    );
}

export default BottomTabNav;