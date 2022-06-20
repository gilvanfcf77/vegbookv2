import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    Pressable,
    TextInput
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors } from '../../modal/color';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
const { DateTime } = require("luxon");
import 'intl';
import 'intl/locale-data/jsonp/en-ZA'

const PostDetails = () => {

    const route = useRoute();

    const [images] = useState(JSON.parse(route.params.post.images));
    const [userEmail] = useState(route.params.post.owner.split("@")[0]);
    const [ingredients] = useState(route.params.post.ingredients);
    const [directions] = useState(route.params.post.directions);
    const [createdAt] = useState(DateTime.fromISO(route.params.post.createdAt).toLocaleString(DateTime.DATETIME_MED));
    const [likes] = useState(route.params.post.likes);
    const [comments] = useState(JSON.parse(route.params.post.comments));

    const [like, setLike] = useState(false);
    const [comment, setComment] = useState('');

    console.log('commentários: ', comments);

    const handleLike = () => {
        setLike(!like);
    }

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

            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <Pressable style={{ flexDirection: 'row' }} onPress={() => handleLike()}>
                        <AntDesign name="heart" size={18} color={like ? colors.basic : 'black'} />
                        <Text style={{ marginLeft: 5 }}>{likes}</Text>
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
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
                        return (
                            <View key={index}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{}}>por</Text>
                                        <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{comment.owner}</Text>
                                    </View>
                                    <Text style={{ marginLeft: 10, color: colors.grey }}>{comment.createdAt}</Text>
                                </View>
                                <Text key={index} style={{ margin: 10 }}>
                                    {comment.comment}
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
                        onChangeText={(text) => {
                            setComment(text);
                        }}
                    />
                    <Ionicons name="md-send-sharp" size={24} color={colors.basic} style={{ paddingRight: 20 }} />
                </View>
            </View>

        </ScrollView>
    );
}

export default PostDetails;