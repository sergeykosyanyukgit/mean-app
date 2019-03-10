import axios from 'axios';

const url = 'api/posts/';

class PostService {
    // Get Posts
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post =>({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            } catch(err) {
                reject(err);
            }
        });
    }

    static getPostsEsp() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}esp/`);
                const data = res.data;
                resolve(
                    data.map(post =>({
                        ...post
                    }))
                );
            } catch(err) {
                reject(err);
            }
        });
    }

    // Create Post
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }

    // Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }

}

export default PostService;