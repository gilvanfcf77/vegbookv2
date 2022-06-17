import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Pressable,
    TextInput,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../modal/color';
import styles from './styles';
import { useNavigation, useRoute } from "@react-navigation/native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { createListing } from '../../graphql/mutations';

const Listing = () => {

    const navigation = useNavigation();

    const [userID, setUserID] = useState('');

    const [imageData, setImageData] = useState([]);
    const [category, setCategory] = useState({ categoryID: 0, categoryName: "Tipo de receita" });
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [directions, setDirections] = useState("");

    const [postSuccess, setPostSuccess] = useState('');
    const [postProcessing, setPostProcessing] = useState(false);

    useEffect(() => {
        if (postSuccess !== '') {

            setPostProcessing(false);

            Alert.alert(
                'Sucesso',
                postSuccess,
                [
                    {
                        text: 'OK',
                        onPress: () => { navigation.navigate('Home', {screen: "Explorar"}) }

                    }
                ]
            )
        }
    }, [postSuccess]);


    Auth.currentAuthenticatedUser()
        .then((user) => {
            console.log(user.attributes.sub)
            setUserID(user.attributes.sub)
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })

    const route = useRoute();

    useEffect(() => {

        if (!route.params) {
            console.log('There is no data in route');
        } else {
            if (route.params.imageData !== undefined) {
                setImageData(route.params.imageData);
            }
            else if (route.params.categoryID !== undefined) {
                setCategory(route.params);
            }
        }
    });

    const imageAllURL = [];

    const storeToDB = async () => {

        setPostProcessing(true);

        imageData && imageData.map(async (image, index) => {
            const imageURL = image.uri;
            const response = await fetch(imageURL);
            const blob = await response.blob();
            const urlParts = imageURL.split('.');
            const extention = urlParts[urlParts.length - 1];
            const key = `${uuidv4()}.${extention}`;
            imageAllURL.push({ imageUri: key });

            await Storage.put(key, blob);

            if (imageData.length === index + 1) {
                const postData = {
                    title: title,
                    categoryName: category.categoryName,
                    categoryID: category.categoryID,
                    ingredients: ingredients,
                    directions: directions,
                    images: JSON.stringify(imageAllURL),
                    userID: userID,
                    commonID: '1'
                }

                await API.graphql({
                    query: createListing,
                    variables: { input: postData },
                    authMode: 'AMAZON_COGNITO_USER_POOLS'
                });

                setPostProcessing(false);
                setPostSuccess("Receita cadastrada com sucesso!");

            }

        })
    }

    return (
        <ScrollView style={{ margin: 10 }}>
            <View>
                <Text style={{ marginTop: 10 }}>Upload Images (max 5)</Text>
                <Pressable
                    style={{
                        backgroundColor: colors.white,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 20,
                        height: 100,
                        width: 100,
                        borderWidth: 1,
                        borderStyle: 'dashed',
                        borderRadius: 30
                    }}
                    onPress={() => {
                        navigation.navigate('SelectPhoto');
                    }}
                >
                    <AntDesign name="pluscircle" size={24} color="black" />
                </Pressable>
                <View>
                    <ScrollView horizontal={true}>
                        {imageData &&
                            imageData.map((image, index) => {
                                return (
                                    <Image
                                        key={image.id}
                                        source={{ uri: image.uri }}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            marginBottom: 15,
                                            marginTop: -5,
                                            marginRight: 5
                                        }}
                                    />
                                )
                            })}

                    </ScrollView>
                </View>
            </View>

            <Pressable
                style={styles.catStyle}
                onPress={() => {
                    navigation.navigate('SelectCategory');
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        color: colors.black
                    }}
                >
                    {category.categoryName}
                </Text>
                <AntDesign name="right" size={18} color="black" />
            </Pressable>

            <View style={styles.inputTextStyle}>
                <TextInput
                    placeholder='Escreva um título'
                    style={{ width: '100%' }}
                    onChangeText={(text) => {
                        setTitle(text);
                    }}
                />
            </View>

            <View style={styles.inputTextStyle}>
                <TextInput
                    placeholder='Liste os ingredientes'
                    style={{ width: '100%' }}
                    multiline={true}
                    onChangeText={(text) => {
                        setIngredients(text);
                    }}
                />
            </View>

            <View style={styles.inputTextStyle}>
                <TextInput
                    placeholder='Descreva o modo de preparo'
                    style={{ width: '100%' }}
                    multiline={true}
                    onChangeText={(text) => {
                        setDirections(text);
                    }}
                />
            </View>

            <Pressable
                onPress={() => { storeToDB() }}
                disabled={postProcessing}
                style={{
                    margin: 10,
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
                    {postProcessing ? "Processing..." : "Enviar receita"}
                </Text>
            </Pressable>
        </ScrollView>
    );
}

export default withAuthenticator(Listing);