import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { JsonPostsRepos } from './model/repository';
import { JsonService } from './service/jsonPlaceholderService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-frontend';
  repos: JsonPostsRepos[] =[];
  newPost: JsonPostsRepos;

  loaded: boolean;
  no_data_found: boolean;
  no_data_found_msg: string = "Nessn post trovato"
  errorMessage: any;

  constructor(private jsonPostsService: JsonService) {}
  
  ngOnInit() {}

  public getPosts(){
    this.repos=[];
    this.errorMessage="";
    this.jsonPostsService.getJsonPosts()
    .subscribe({
      next: (response: JsonPostsRepos[]): void => {
        if (response.length != 0) {
          response.map((item: { userId: number; id: number; title: string; body: string }) => {
            this.repos.push({
              userId: item.userId,
              id: item.id,
              title: item.title,
              body: item.body
            });
          });
          this.loaded = true;
          this.no_data_found = false;
        }
        else{
          this.loaded = false;
          this.no_data_found = true;
        }
          
      },
      error: (err: HttpErrorResponse ): void => {
        this.no_data_found = false;
        this.errorMessage = {
          statusCode: err.status + ', ' + err.error.message,
          //message: err.error.message
          message: err.message.substring(0,err.message.indexOf( ": 404 OK" ))   // elimina ": 404 OK" dal messaggio
        };
        console.log(`HttpErrorResponse body: ${JSON.stringify(err)}`);          // stampa di tutto l'HttpErrorResponse   
        this.loaded = false;
      },

      complete: () => {
        console.log('Request completed.');
        //this.loaded = true;
      },
    });
  }

  creatPost(){
    //const newPost = new JsonPostsRepos (23, null, 'My New Post', 'Hello World!');
    
    this.newPost={
      id: 23,
      userId: null,
      title: 'My New Post',
      body: 'Hello World!'
    }

    this.jsonPostsService.createJsonPosts(this.newPost).subscribe(
      response=>{
        console.log("POST completed sucessfully. the response recived " + JSON.stringify(response.body));
      },
      error=>{
        console.log("Post failed the errors");
      },
      ()=>{
        console.log("Post completed");
      }
    )
  }

}
