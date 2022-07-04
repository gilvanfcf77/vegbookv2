import React, { useState, useEffect } from 'react';
import PostItems from '../../components/postItems';
import HeaderForMobile from '../../components/headerForMobile';
import { gettingListingByCreatedAt } from '../../graphql/queries';
import { API } from 'aws-amplify'
import { FlatList, Image } from 'react-native';
import { useGlobal } from 'reactn';

const Home = () => {

    const [postList, setPostList] = useState([]);
    const [category] = useGlobal('category');

    const filteredList = postList.filter((post) => post.categoryName === category)

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
                data={category === 'Todas' ? postList : filteredList}
                renderItem={({ item }) => <PostItems post={item} />}
            />
        </>
    );
}

export default Home;