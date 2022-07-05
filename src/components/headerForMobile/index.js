import {
    Text,
    View,
    Image,
    Pressable
} from 'react-native';
import styles from './styles';
import { useEffect, useState } from 'react';
import { setGlobal } from 'reactn';

const HeaderForMobile = () => {

    const [categories] = useState([
        'Todas',
        'Vegetariana',
        'Inclui ovos',
        'Inclui leite',
        'Inclui ovos e leite'
    ])
    const [category, setCategory] = useState('Todas');

    useEffect(() => {
        setGlobal({
            'category': 'Todas'
        });
    }, []);
    
    return (
        <View style={styles.headerWrap}>
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