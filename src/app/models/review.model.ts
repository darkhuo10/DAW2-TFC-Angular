export class Review {
    constructor (
        public id: string,
        public username: string,
        public userId: string,
        public publish_date: string,
        public rating: number,
        public description: string
    )  {}
}

export class ReviewDtoCreate {
    constructor (
        public game_id: string,
        public user_id: string,
        public rating: number,
        public description: string
    ) {}
}