import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { colors } from '../../modal/color';
import { Auth } from 'aws-amplify'
import { useNavigation } from '@react-navigation/native';
import { useGlobal, setGlobal } from 'reactn';

const Profile = () => {

    const navigation = useNavigation();
    const [email] = useGlobal('email');

    const signOutFunc = async () => {

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

    return (
        <>
            {
                email
                    ?
                    <View style={{ margin: 10, marginTop: 250 }}>
                        <Text
                            style={{
                                color: colors.grey,
                                alignSelf: 'center',
                            }}
                        >
                            Você está logado(a) como
                        </Text>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                alignSelf: 'center',
                            }}
                        >
                            {email}
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
                            Você não está logado(a)!
                        </Text>
                    </View>
            }


        </>
    );
}

export default Profile;