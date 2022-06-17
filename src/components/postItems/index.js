import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    Pressable
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const PostItems = (props) => {

    const navigation = useNavigation();

    const post = props.post;

    const [images] = useState(JSON.parse(post.images));

    console.log(images);

    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                navigation.navigate("PostDetails")
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
                        <Text style={styles.postPlace}>Enviada em {post.createdAt}</Text>
                    </View>
                    {/* <Text style={styles.postValue}
                    >$100 / Day
                    </Text> */}
                </View>
            </View>
        </Pressable>
    )
}

export default PostItems;