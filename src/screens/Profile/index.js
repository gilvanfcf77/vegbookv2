import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '../../modal/color';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify'

const Profile = () => {

    const [userID, setUserID] = useState('');
    const [userEmail, setUserEmail] = useState('');

    Auth.currentAuthenticatedUser()
        .then((user) => {
            setUserID(user.attributes.sub)
            setUserEmail(user.attributes.email)
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })

    return (
        <>
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
                    onPress={() => { alert('Ainda não é possível fazer logout') }}
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

        </>
    );
}

export default Profile;