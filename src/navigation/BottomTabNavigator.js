import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../modal/color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Listing from '../screens/Listing';
import SelectCategoryScreen from '../screens/SelectCategory';
import PostDetails from '../screens/PostDetails';

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
                name='Enviar receita'
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
                name='Perfil'
                component={Profile}
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
            <Tab.Screen
                name='SelectCategory'
                component={SelectCategoryScreen}
                options={{
                    headerShown: false,
                    tabBarButton: (props) => null,
                    tabBarVisible: false,
                }}
            />
            <Tab.Screen
                name='PostDetails'
                component={PostDetails}
                options={{
                    headerShown: false,
                    tabBarButton: (props) => null,
                    tabBarVisible: false,
                }}
            />

        </Tab.Navigator>
    );
}

export default BottomTabNav;