import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGlobal, setGlobal } from 'reactn';
import { Auth } from 'aws-amplify'

export default () => {

    const navigation = useNavigation();
    const [email] = useGlobal('email');

    const signOut = async () => {

        await Auth.signOut()
            .then(() => {
                setGlobal({
                    'email': ''
                })
            })
            .catch(e => console.log("error: ", e));

        Alert.alert('Logout realizado com sucesso!');

        return navigation.navigate('Home', { screen: "Explorar" });
    };

    return {
        signOut,
        email
    };
} 