const posts = [];

class MockPost {
    constructor(data) {
        Object.assign(this, data);
        this._id = Math.random().toString(36).substr(2, 9);
        this.createdAt = new Date();
    }

    static find() {
        // Return a sortable object
        return {
            sort: () => Promise.resolve([...posts].sort((a, b) => b.createdAt - a.createdAt))
        };
    }

    static async create(data) {
        const post = new MockPost(data);
        posts.push(post);
        return Promise.resolve(post);
    }
}

module.exports = MockPost;
