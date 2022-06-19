import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../modal/color';

const PostDetails = () => {

    const route = useRoute();
    const navigation = useNavigation();

    const [images, setImages] = useState(JSON.parse(route.params.post.images));
    const [userEmail, setUserEmail] = useState(route.params.post.owner.split("@")[0]);
    const [ingredients] = useState(route.params.post.ingredients);
    const [directions] = useState(route.params.post.directions);

    return (
        <ScrollView>
            <ScrollView horizontal={true}>
                {images && images.map((image, index) => {
                    console.log(image.imageUri);
                    return (
                        <Image
                            key={index}
                            source={{ uri: `https://d2ejckwzrz2fdl.cloudfront.net/fit-in/500x500/public/${images[index].imageUri}` }}
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
            <View
                style={{
                    margin: 10
                }}
            >
                <View>
                    <Text style={{ color: colors.grey }}>Enviada por: </Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{userEmail}</Text>
                </View>
            </View>

            <View>
                <View>
                    <Text style={{ color: colors.grey, margin: 10 }}>Ingredientes: </Text>
                    <Text style={{ margin: 10 }}>
                        {ingredients}
                    </Text>
                </View>

                <View>
                    <Text style={{ color: colors.grey, margin: 10 }}>Modo de preparo: </Text>
                    <Text style={{ margin: 10 }}>
                        {directions}
                    </Text>
                </View>
            </View>

        </ScrollView>
    );
}

export default PostDetails;