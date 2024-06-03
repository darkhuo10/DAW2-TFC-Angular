export class Game {
    constructor (
        public id: string,
        public name: string,
        public developer: string,
        public publisher: string,
        public genres: Array<string>,
        public languages : Array<string>,
        public description: string,
        public date: string,
        public price: number,
        public rating: number,
        public sellNumber: number,
        public mainImage: string,
        public showcaseImages: Array<string>,
        public file: string,
        public visible: boolean
    )  {}
}