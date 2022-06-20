import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { colors } from '../../modal/color';
import { Auth } from 'aws-amplify'
import { useNavigation } from '@react-navigation/native';

const Profile = () => {

    const navigation = useNavigation();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then((user) => {
                setUserEmail(user.attributes.email)
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
    }, [userEmail]);

    const signOutFunc = async () => {

        setUserEmail('');

        await Auth.signOut()
            .then(data => {
                console.log("signed out...");
            })
            .catch(e => console.log("error: ", e));
        
        Alert.alert('Logout realizado com sucesso!');

        return navigation.navigate('Home', { screen: "Explorar" });
    };

    return (
        <>
            {
                userEmail
                    ?
                    <View style={{ margin: 10, marginTop: 250 }}>
                        <Text
                            style={{
                                color: colors.grey,
                                alignSelf: 'center',
                            }}
                        >
                            Você está logado como
                        </Text>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                alignSelf: 'center',
                            }}
                        >
                            {userEmail}
                        </Text>

                        <Pressable
                            onPress={() => { signOutFunc() }}
                            style={{
                                borderRadius: 30,
                                backgroundColor: colors.primary,
                                alignItems: 'center',
                                paddingLeft: 20,
                                marginTop: 20,
                                elevation: 5
                            }}
                        >

                            <Text
                                style={{
                                    color: colors.secondary,
                                    paddingVertical: 12,
                                    fontSize: 14.5,
                                    fontWeight: 'bold'
                                }}
                            >
                                Logout
                            </Text>

                        </Pressable>

                    </View>
                    :
                    <View style={{ margin: 10, marginTop: 250 }}>
                        <Text
                            style={{
                                color: colors.grey,
                                alignSelf: 'center',
                            }}
                        >
                            Você não está logado!
                        </Text>
                    </View>
            }


        </>
    );
}

export default Profile;