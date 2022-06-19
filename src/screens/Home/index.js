import React, { useState, useEffect } from 'react';
import PostItems from '../../components/postItems';
import HeaderForMobile from '../../components/headerForMobile';
import { gettingListingByCreatedAt } from '../../graphql/queries';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify'
import { FlatList } from 'react-native';

const Home = () => {

    const [postList, setPostList] = useState([]);

    const fetchAllPosts = async () => {
        try {
            const itemListByCommonID = await API.graphql({
                query: gettingListingByCreatedAt,
                variables: { commonID: '1', sortDirection: 'DESC' },
                authMode: 'AWS_IAM'
            });

            setPostList(itemListByCommonID.data.gettingListingByCreatedAt.items);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllPosts();
    }, [postList]);

    return (
        <>
            <HeaderForMobile />
            <FlatList 
                data={postList}
                renderItem={({ item }) => <PostItems post={item} />}
            />
        </>
    );
}

export default Home;