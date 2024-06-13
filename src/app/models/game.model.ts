export class Game {
    constructor (
        public id: string,
        public name: string,
        public developer: string,
        public publisher: string,
        public genres: Array<string>,
        public languages: Array<string>,
        public description: string,
        public release_date: string,
        public price: number,
        public rating: number,
        public sell_number: number,
        public mainImage: string,
        public showcaseImages: Array<string>,
        public file: string,
        public visible: boolean
    )  {}
}

export class GameDtoUpdate {
    constructor (
        public name: string,
        public developer: string,
        public publisher: string,
        public description: string,
        public price: number,
        public genres: Array<string> | null,
        public languages: Array<string> | null
    ) {}
}