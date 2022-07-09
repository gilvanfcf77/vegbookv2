import {
    Text,
    View,
    Image,
    Pressable
} from 'react-native';
import styles from './styles';
import { setGlobal } from 'reactn';
import useContainer from './Container';

const HeaderForMobile = () => {

    const {
        category,
        setCategory,
        categories
    } = useContainer();
    
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