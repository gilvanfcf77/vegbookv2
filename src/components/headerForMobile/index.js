import {
    Text,
    View,
    // TextInput,
    Image,
    Pressable
} from 'react-native';
import styles from './styles';
// import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useGlobal, setGlobal } from 'reactn';

const HeaderForMobile = () => {

    const [categories] = useState([
        'Todas',
        'Vegetariana',
        'Inclui ovos',
        'Inclui leite',
        'Inclui ovos e leite'
    ])
    const [category, setCategory] = useState('Todas');

    return (
        <View style={styles.headerWrap}>
            {/* <View style={styles.searchByTextWrap}>
                <FontAwesome name="search" size={24} color="black" />
                <TextInput
                    placeholder='Pesquisar receita'
                    style={styles.searchPlaceholder}
                    multiline={false}
                />
            </View> */}
            <Image
                source={require('../../../assets/Logo.png')}
                style={{
                    height: 50,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                }}
            />
            <View
                style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'space-evenly'
                }}
            >
                {categories &&
                    categories.map((item, index) => {
                        return (
                            <Pressable key={index}
                                onPress={() => {
                                    setCategory(item)
                                    setGlobal({
                                        'category': item
                                    });
                                }}>
                                <Text style={{ fontWeight: category === item ? 'bold' : 'normal' }}>
                                    {item}
                                </Text>
                            </Pressable>
                        )
                    })}
            </View>
        </View>
    )
}

export default HeaderForMobile;