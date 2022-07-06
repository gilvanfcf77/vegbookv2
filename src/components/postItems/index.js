import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    Pressable
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { getFormattedDate } from '../../services/Date';

const PostItems = (props) => {

    const navigation = useNavigation();

    const post = props.post;

    const [images] = useState(JSON.parse(post.images));
    const [comments] = useState(JSON.parse(post.comments));
    const [createdAt] = useState(getFormattedDate(post.createdAt))

    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                navigation.navigate("PostDetails", {
                    post
                })
            }}
        >
            <View style={styles.postWrap}>
                <Image
                    source={{ uri: `https://d2ejckwzrz2fdl.cloudfront.net/fit-in/400x400/public/${images[0].imageUri}` }}
                    style={styles.postImage}>
                </Image>
                <View style={styles.postContentWrap}>
                    <View>
                        <Text style={styles.postTitle}>{post.title}</Text>
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.postPlace}>Enviada por {post.owner.split("@")[0]}</Text>
                            <Text style={styles.postPlace}>em {createdAt}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row'}}>
                                <FontAwesome name="comments" size={18} color="black" />
                                <Text style={{ marginLeft: 5 }}>{comments.length}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default PostItems;