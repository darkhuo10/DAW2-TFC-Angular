export class User {
    constructor (
        public id: string,
        public name: string,
        public surname: string,
        public username: string,
        public email: string,
        public password: string,
        public birthday: string,
        public role: string,
        public active: boolean,
        public profilePicture: string,
    )  {}
}