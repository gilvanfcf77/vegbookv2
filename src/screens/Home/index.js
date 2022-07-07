import React, { useEffect } from 'react';
import PostItems from '../../components/postItems';
import HeaderForMobile from '../../components/headerForMobile';
import { FlatList } from 'react-native';
import { useGlobal } from 'reactn';
import { fetchAllPosts } from '../../services/Posts';

const Home = () => {
    const [category] = useGlobal('category');
    const [posts] = useGlobal('posts');

    const filteredList = posts?.filter((post) => post.categoryName === category)

    const fetchPosts = async () => {
        await fetchAllPosts();
    }

    useEffect(() => {
        fetchPosts();
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