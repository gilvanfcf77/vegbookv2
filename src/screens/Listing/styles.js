import { StyleSheet } from 'react-native';
import { colors } from '../../modal/color';

const styles = StyleSheet.create({
    inputTextStyle: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 10,
        marginBottom: 20
    },

    catStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        paddingVertical: 10,
        backgroundColor: colors.white,
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 10
    }


});

export default styles;