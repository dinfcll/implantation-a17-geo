export class UserPost {
    constructor(public postTitle : string, public postText : string, public postId : number,
        public postLike : number, public postComment : string, public profilId : number, 
        public datePublication: string) { }
}