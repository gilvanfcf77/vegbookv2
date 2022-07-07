import { gettingListingByCreatedAt } from '../../graphql/queries';
import { API } from 'aws-amplify'
import { setGlobal } from 'reactn';

export const fetchAllPosts = async () => {
    try {
        const itemListByCommonID = await API.graphql({
            query: gettingListingByCreatedAt,
            variables: { commonID: '1', sortDirection: 'DESC' },
            authMode: 'AWS_IAM'
        });
        setGlobal({
            'posts': itemListByCommonID.data.gettingListingByCreatedAt.items
        });

    } catch (error) {
        console.log(error);
    }
}