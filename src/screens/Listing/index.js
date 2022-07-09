import React from 'react';
import {
    Text,
    View,
    Pressable,
    TextInput,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../modal/color';
import styles from './styles';
import 'react-native-get-random-values';
import useContainer from './Container';

const Listing = () => {

    const {
        imageData,
        category,
        title,
        setTitle,
        ingredients,
        setIngredients,
        directions,
        setDirections,
        postProcessing,
        navigation,
        storeToDB
    } = useContainer();

    return (
        <ScrollView style={{ margin: 10 }}>
            <View>
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
                    <AntDesign name="camera" size={24} color="black" />
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
                    value={title}
                    style={{ width: '100%' }}
                    onChangeText={(text) => {
                        setTitle(text);
                    }}
                />
            </View>

            <View style={styles.inputTextStyle}>
                <TextInput
                    placeholder='Liste os ingredientes'
                    value={ingredients}
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
                    value={directions}
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
                    {
                        postProcessing
                            ?
                            <ActivityIndicator size="small" color={colors.basic} />
                            :
                            "Enviar receita"
                    }
                </Text>
            </Pressable>
        </ScrollView>
    );
}

export default withAuthenticator(Listing);