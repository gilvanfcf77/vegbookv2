import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    Pressable,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors } from '../../modal/color';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
import { getFormattedDate } from '../../services/Date';
import useContainer from './Container';

const PostDetails = () => {

    const {
        loading,
        comment,
        setComment,
        handleComment
    } = useContainer();

    const route = useRoute();

    const [id] = useState(route.params.post.id);
    const [images] = useState(JSON.parse(route.params.post.images));
    const [title] = useState(route.params.post.title);
    const [categoryName] = useState(route.params.post.categoryName);
    const [categoryID] = useState(route.params.post.categoryID);
    const [userID] = useState(route.params.post.userID);
    const [userEmail] = useState(route.params.post.owner.split("@")[0]);
    const [ingredients] = useState(route.params.post.ingredients);
    const [directions] = useState(route.params.post.directions);
    const [createdAt] = useState(getFormattedDate(route.params.post.createdAt));
    const [comments] = useState(JSON.parse(route.params.post.comments));
    const [commonID] = useState(route.params.post.commonID);

    return (
        <ScrollView>
            <ScrollView horizontal={true}>
                {images && images.map((image, index) => {
                    return (
                        <Image
                            key={index}
                            source={{ uri: `https://d2ejckwzrz2fdl.cloudfront.net/fit-in/500x500/public/${image.imageUri}` }}
                            style={{ width: 400, height: 300 }}
                        />
                    )
                })
                }
            </ScrollView>
            <Text
                style={{
                    marginLeft: 10,
                    marginRight: 10,
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop: 10
                }}
            >
                {route.params.post.title}
            </Text>

            <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
                <Text style={{ color: colors.grey }}>
                    Categoria:
                </Text>
                <Text style={{ marginLeft: 5, color: colors.grey }}>
                    {categoryName}
                </Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <FontAwesome name="comments" size={18} color="black" />
                    <Text style={{ marginLeft: 5 }}>{comments.length}</Text>
                </View>
            </View>

            <View
                style={{
                    margin: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text>por</Text>
                    <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{userEmail}</Text>
                </View>
                <Text style={{ color: colors.grey }}>{createdAt}</Text>
            </View>
            <Divider />
            <View>
                <View>
                    <Text style={{ color: colors.grey, margin: 10 }}>Ingredientes: </Text>
                    <Text style={{ margin: 10 }}>
                        {ingredients}
                    </Text>
                </View>
                <Divider />

                <View>
                    <Text style={{ color: colors.grey, margin: 10 }}>Modo de preparo: </Text>
                    <Text style={{ margin: 10 }}>
                        {directions}
                    </Text>
                </View>
                <Divider />

                <View>
                    <Text style={{ color: colors.grey, margin: 10 }}>Comentários: </Text>
                    {comments.map((comment, index) => {


                        const userName = comment.owner.split("@")[0];
                        const createdAt = getFormattedDate(comment.createdAt);

                        return (
                            <View key={index}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{}}>por</Text>
                                        <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{userName}</Text>
                                    </View>
                                    <Text style={{ marginLeft: 10, color: colors.grey }}>{createdAt}</Text>
                                </View>
                                <Text key={index} style={{ margin: 10 }}>
                                    {comment.text}
                                </Text>
                                <Divider />
                            </View>
                        )
                    })}
                </View>
            </View>


            <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 60 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        placeholder='Escreva um comentário'
                        style={{ width: '90%' }}
                        value={comment}
                        onChangeText={(text) => {
                            setComment(text);
                        }}
                    />
                    <Pressable onPress={
                        () => handleComment
                            (
                                id,
                                title,
                                categoryName,
                                categoryID,
                                ingredients,
                                directions,
                                route.params.post.images,
                                userID,
                                userEmail,
                                comments,
                                commonID
                            )
                    }>
                        {
                            loading
                                ?
                                <ActivityIndicator size="small" color={colors.basic} />
                                :
                                <Ionicons name="md-send-sharp" size={24} color={colors.basic} style={{ paddingRight: 20 }}
                                />
                        }

                    </Pressable>
                </View>
            </View>

        </ScrollView>
    );
}

export default PostDetails;