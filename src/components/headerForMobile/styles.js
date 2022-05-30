import { StyleSheet } from 'react-native';
import { colors } from '../../modal/color';

const styles = StyleSheet.create({
    headerWrap: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        backgroundColor: colors.primary,
        alignItems: 'center'
    },

    searchByTextWrap: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        borderRadius: 5
    },
    searchPlaceholder: {
        width: '100%',
        marginLeft: 5
    },
    categorySearchWrap: {
        flexDirection: 'row'
    },
    categorySearchText: {
        fontWeight: 'bold',
        marginLeft: 5
    }
});

export default styles;