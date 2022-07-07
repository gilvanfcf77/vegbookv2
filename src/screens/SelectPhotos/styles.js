import { StyleSheet } from 'react-native';
import { colors } from '../../modal/color';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    textStyle: {
        color: colors.white,
    },

    buttonStyle: {
        backgroundColor: colors.primary,
        borderRadius: 5
    }
});

export default styles;