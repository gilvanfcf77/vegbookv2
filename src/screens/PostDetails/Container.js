import { useState } from 'react';
import { Auth, API } from 'aws-amplify';
import { getDate } from '../../services/Date';
import { updateListing } from '../../graphql/mutations';
import { useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { getFormattedDate } from '../../services/Date';

export default () => {

    const route = useRoute();

    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');

    const [id] = useState(route.params.post.id);
    const [images] = useState(JSON.parse(route.params.post.images));
    const [title] = useState(route.params.post.title);
    const [categoryName] = useState(route.params.post.categoryName);
    const [categoryID] = useState(route.params.post.categoryID);
    const [userID] = useState(route.params.post.userID);
    const [userEmail] = useState(route.params.post.owner);
    const [ingredients] = useState(route.params.post.ingredients);
    const [directions] = useState(route.params.post.directions);
    const [createdAt] = useState(getFormattedDate(route.params.post.createdAt));
    const [comments] = useState(JSON.parse(route.params.post.comments));
    const [commonID] = useState(route.params.post.commonID);

    const handleComment = async () => {

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
                images: route.params.post.images,
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
        route,
        loading,
        comment,
        setComment,
        id,
        images,
        title,
        categoryName,
        categoryID,
        userID,
        userEmail,
        ingredients,
        directions,
        createdAt,
        comments,
        commonID,
        handleComment
    };
} 