import { StyleSheet } from 'react-native';
import { colors } from '../../modal/color';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    postWrap: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        overflow: 'hidden'
    },
    postImage: {
        height: 100,
        width: 100,
        borderRadius: 0,
        marginLeft: 10,
        marginRight: 20,
        marginVertical: 10
    },
    postContentWrap: {
        // justifyContent: 'space-between',
        paddingVertical: 10
    },
    postTitle: {
        fontWeight: 'bold'
    },
    postPlace: {
        color: colors.grey
    },
    postValue: {
        color: colors.basic,
        backgroundColor: colors.secondary,
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: 10
    }
});

export default styles;