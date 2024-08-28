import { useQuery } from 'react-query';
import api from '@/lib/api';

const BASE_URL = 'https://story-api.ikattey.com';

const fetchPosts = async () => {
    try {
        const { data } = await api.get(`${BASE_URL}/api/posts`);
        return data;
    } catch (error) {
        console.log("error:", error)
    }
};

export const useFetchPosts = () => {
    return useQuery('posts', fetchPosts);
};



export const useFetchEachPost = (id: any) => {
    return useQuery(`posts/${id}`, async () => {
        try {
            const { data } = await api.get(`${BASE_URL}/api/posts/${id}`);
            return data;
        } catch (error) {
            console.log("error:", error)
        }
    });
};



export const useGetComments = (id: any) => {
    return useQuery(['comments', id], async () => {
        let postId = id.postid;
        try {
            const { data } = await api.get(`${BASE_URL}/api/posts/${postId}/comments`);
            // console.log(data)
            return data.comments;
        } catch (error) {
            console.error('Error message:', error);
        }
    });
}

export const postComment = async(postId: any, comment: string) => {
        try {
            const { data } = await api.post(`${BASE_URL}/api/posts/${postId}/comments`, {
                content:comment
            });
            // console.log(data)
            return data;
        } catch (error) {
            console.error('Error message:', error);
        }
}