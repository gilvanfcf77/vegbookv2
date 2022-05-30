import {
    Text,
    View,
    TextInput
} from 'react-native';
import styles from './styles';
import { FontAwesome } from '@expo/vector-icons';

const HeaderForMobile = () => {
    return (
        <View style={styles.headerWrap}>
            <View style={styles.searchByTextWrap}>
            <FontAwesome name="search" size={24} color="black" />
                <TextInput
                    placeholder='Pesquisar receita'
                    style={styles.searchPlaceholder}
                    multiline={false}
                />
            </View>
            <View style={styles.categorySearchWrap}>
                <Text>Categoria</Text>
                <Text style={styles.categorySearchText}>Ovolacto</Text>
            </View>
        </View>
    )
}

export default HeaderForMobile;