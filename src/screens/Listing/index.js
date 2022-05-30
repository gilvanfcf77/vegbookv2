import {
    Text,
    View
} from 'react-native';
import { withAuthenticator } from '@aws-amplify/ui-react';

const Listing = () => {
    return (
        <View>
            <Text>
                Listing
            </Text>

        </View>
    );
}

export default withAuthenticator(Listing);