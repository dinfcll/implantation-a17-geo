import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { UserPost } from '../class/post.class';

import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable()
export class UserPostService extends BaseService {

    baseUrl: string = '';

    constructor(private http: Http, private configService: ConfigService) {
        super();
        this.baseUrl = configService.getApiURI();
    }

    getListPost() {
        return this.http
            .get(this.baseUrl + '/postUser')
            .map(res => { return res.json() })
            .catch(this.handleError);
    }

    createPost(postTitle: string, postText: string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(this.baseUrl + '/postUser/create', JSON.stringify({ postTitle, postText}), {headers})
            .map(res => { return res.json(); })
            .catch(this.handleError);
    }

    modifyPost(p : UserPost) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .put(this.baseUrl + '/postUser/modify', JSON.stringify({ p }), {headers})
            .map(res => { return res.json(); })
            .catch(this.handleError);
    }

    likePost(postId : number) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(this.baseUrl + '/postUser/like', postId, {headers})
            .map(res => { return res.json(); })
            .catch(this.handleError);
    }

    unlikePost(postId : number) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(this.baseUrl + '/postUser/unlike', postId, {headers})
            .map(res => { return res.json(); })
            .catch(this.handleError);
    }

    deletePost(postId: number) {
        return this.http
            .delete(this.baseUrl + '/postUser/delete/' + postId, JSON.stringify({ postId }))
            .map(res => { return res; })
            .catch(this.handleError);
    }
}