import React, { useEffect } from 'react';
import PostItems from '../../components/postItems';
import HeaderForMobile from '../../components/headerForMobile';
import { FlatList, RefreshControl } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useGlobal } from 'reactn';
import { fetchAllPosts } from '../../services/Posts';

const Home = () => {
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const [category] = useGlobal('category');
    const [posts] = useGlobal('posts');

    const filteredList = posts?.filter((post) => post.categoryName === category)

    const isFocused = useIsFocused();

    const fetchPosts = async () => {
        await fetchAllPosts();
    }

    useEffect(() => {
        fetchPosts();
    }, [posts?.length]);

    return (
        isFocused
            ?
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
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </>
            :
            null
    );
}

export default Home;