export class Comment {
    constructor(public commentId: number, public commentTxt: string, public commentDate: string,
        public commentShow: boolean, public postId: number, public profilId: number, 
        public username: string) { }
}