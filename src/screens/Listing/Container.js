import { useState, useEffect } from 'react';
import { Auth, Storage, API } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid';
import { createListing } from '../../graphql/mutations';
import { fetchAllPosts } from '../../services/Posts';
import { setGlobal } from 'reactn';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";

export default () => {

    const navigation = useNavigation();

    const [userID, setUserID] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const [imageData, setImageData] = useState([]);
    const [category, setCategory] = useState({ categoryID: 0, categoryName: "Tipo de receita" });
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [directions, setDirections] = useState("");

    const [postSuccess, setPostSuccess] = useState('');
    const [postProcessing, setPostProcessing] = useState(false);

    const imageAllURL = [];

    Auth.currentAuthenticatedUser()
        .then((user) => {
            setUserID(user.attributes.sub)
            setUserEmail(user.attributes.email)
            setGlobal({
                'email': user.attributes.email
            });
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })

    const resetFields = () => {
        setImageData([]);
        setCategory({ categoryID: 0, categoryName: "Tipo de receita" });
        setTitle("");
        setIngredients("");
        setDirections("");
    }

    useEffect(() => {
        if (postSuccess !== '') {

            setPostProcessing(false);

            resetFields();

            Alert.alert(
                'Sucesso',
                postSuccess,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.navigate('Home', { screen: "Explorar" })
                        }
                    }
                ]
            )
        }
    }, [postSuccess]);

    const route = useRoute();

    useEffect(() => {

        if (!route.params) {
            if (postProcessing) { Alert.alert('Por favor, preencha os campos corretamente!'); }
            setPostProcessing(false);
        } else {
            if (route.params.imageData !== undefined) {
                setImageData(route.params.imageData);
            }
            else if (route.params.categoryID !== undefined) {
                setCategory(route.params);
            }
        }
    });

    const storeToDB = async () => {

        setPostProcessing(true);

        if (imageData.length === 0) {
            Alert.alert('Por favor, selecione uma imagem!');
            setPostProcessing(false);
            return;
        }

        if (category.categoryName === "Tipo de receita") {
            Alert.alert('Por favor, preencha o campo "Tipo de receita"!');
            setPostProcessing(false);
            return;
        }

        if (!title) {
            Alert.alert('Por favor, preencha o campo "Título"!');
            setPostProcessing(false);
            return;
        }

        if (!ingredients) {
            Alert.alert('Por favor, preencha o campo "Ingredientes"!');
            setPostProcessing(false);
            return;
        }

        if (!directions) {
            Alert.alert('Por favor, preencha o campo "Modo de preparo"!');
            setPostProcessing(false);
            return;
        }

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
                    owner: userEmail,
                    comments: [],
                    commonID: '1'
                }

                await API.graphql({
                    query: createListing,
                    variables: { input: postData },
                    authMode: 'AMAZON_COGNITO_USER_POOLS'
                });

                setPostProcessing(false);
                setPostSuccess("Receita cadastrada com sucesso!");
                await fetchAllPosts();
            }

        })
    }

    return {
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
    };
} 