import React, { useEffect } from 'react';
import PostItems from '../../components/postItems';
import HeaderForMobile from '../../components/headerForMobile';
import { gettingListingByCreatedAt } from '../../graphql/queries';
import { API } from 'aws-amplify'
import { FlatList } from 'react-native';
import { useGlobal, setGlobal } from 'reactn';

const Home = () => {
    const [category] = useGlobal('category');
    const [posts] = useGlobal('posts');

    const filteredList = posts?.filter((post) => post.categoryName === category)

    const fetchAllPosts = async () => {
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

    useEffect(() => {
        fetchAllPosts();
    }, [posts?.length]);

    return (
        <>
            <HeaderForMobile />
            <FlatList
                data=
                {
                    category === 'Todas'
                        ?
                        posts
                        :
                        filteredList
                }
                renderItem={({ item }) => <PostItems post={item} />}
            />
        </>
    );
}

export default Home;