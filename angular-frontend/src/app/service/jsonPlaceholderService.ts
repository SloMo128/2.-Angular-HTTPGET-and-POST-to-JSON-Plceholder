import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule, HttpParams, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";

import { JsonPostsRepos } from "../model/repository";



@Injectable()
export class JsonService{
    baseURL: string = 'https://jsonplaceholder.typicode.com';

    constructor(private http: HttpClient){};

    getJsonPosts():Observable<any> {
        return this.http.get(this.baseURL + '/posts');
    }

    createJsonPosts(newPost: JsonPostsRepos){
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(newPost);

        return this.http.post(this.baseURL +'/posts', body,{'headers':headers , observe: 'response'})
    }
}