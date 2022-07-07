import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '../../modal/color';
import useContainer from './Container';

const Profile = () => {

    const {
        signOut,
        email
    } = useContainer();

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
                            onPress={() => { signOut() }}
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