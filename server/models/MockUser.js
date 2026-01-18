const users = [];

class MockUser {
    constructor(data) {
        Object.assign(this, data);
        this._id = Math.random().toString(36).substr(2, 9);
        this.createdAt = new Date();
    }

    save() {
        users.push(this);
        return Promise.resolve(this);
    }

    static async findOne(query) {
        const user = users.find(u => u.email === query.email);
        return user ? Promise.resolve(user) : Promise.resolve(null);
    }

    static async create(data) {
        const user = new MockUser(data);
        users.push(user);
        return Promise.resolve(user);
    }

    static findById(id) {
        const user = users.find(u => u._id === id);
        const result = user ? Promise.resolve(user) : Promise.resolve(null);

        // Mocking .select()
        result.select = function () {
            return this; // Ignore select for mock
        };

        return result;
    }
}

module.exports = MockUser;
