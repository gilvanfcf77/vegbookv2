import { useState } from 'react';
import { Auth, API } from 'aws-amplify';
import { getDate } from '../../services/Date';
import { updateListing } from '../../graphql/mutations';
import {
    Alert
} from 'react-native';

export default () => {

    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');

    const handleComment = async (
        id,
        title,
        categoryName,
        categoryID,
        ingredients,
        directions,
        images,
        userID,
        userEmail,
        comments,
        commonID
    ) => {

        setLoading(true);

        const user = await Auth.currentAuthenticatedUser();

        if (comment !== '') {
            const newComment = {
                text: comment,
                owner: user.attributes.email,
                createdAt: getDate()
            }

            comments.push(newComment);

            const postData = {
                id: id,
                title: title,
                categoryName: categoryName,
                categoryID: categoryID,
                ingredients: ingredients,
                directions: directions,
                images: images,
                userID: userID,
                owner: userEmail,
                comments: JSON.stringify(comments),
                commonID: commonID
            }

            await API.graphql({
                query: updateListing,
                variables: { input: postData },
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });

            setComment('');
            setLoading(false);

        }
        else {
            Alert.alert('Você ainda não digitou um comentário!');
            setLoading(false);
        }
    }

    return {
        loading,
        comment, 
        setComment,
        handleComment
    };
} 