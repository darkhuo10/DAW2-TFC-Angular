export class User {
    constructor (
        public id: string,
        public name: string,
        public surname: string,
        public username: string,
        public email: string,
        public birthdate: string,
        public role: string,
        public active: boolean,
        public profilePicture: string
    )  {}
}

export class UserDtoUpdate {
    constructor(
        public name?: string,
        public surname?: string,
        public password?: string,
        public birthdate?: string
    ){}
}