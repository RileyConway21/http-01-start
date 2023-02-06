import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MonoTypeOperatorFunction, Subject, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({providedIn: "any"})
export class PostsService {
error = new Subject<string>();

constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        this.http
        .post<{name: string}>(
          'https://ng-complete-guide-947e0-default-rtdb.firebaseio.com/posts.json',
          postData,
          {
            observe: 'response'
          }
        )
        .subscribe(
          responseData => {
          console.log(responseData.body)
        }, error => {
          this.error.next(error.message);
        });    }


    fetchPost () {
      let searchParams = new HttpParams();
      searchParams =searchParams.append('print', 'pretty');
      searchParams = searchParams.append('custom', 'key');
        return this.http.get<{[key: string]: Post }>('https://ng-complete-guide-947e0-default-rtdb.firebaseio.com/posts.json',
        {
headers: new HttpHeaders({"Custom-Header": 'Hello'}),
params: searchParams
responseType: 'text'
        }
        )
        .pipe(
          map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }), 
        catchError(errorRes => {
// Send to analytics server
          return throwError(errorRes);
        })
    
        
    }

    deletePosts() {
      return this.http.delete('https://ng-complete-guide-947e0-default-rtdb.firebaseio.com/posts.json');
      {
        observe: 'events',
      }
      pipe(
        tap(event=>{
          console.log(event);
          if (event === HttpEventType.Sent) {
            // ...
          }
          if (event === HttpEventType) {
            console.log(event);
          }
        })
      
      )
    }
}

function pipe(arg0: MonoTypeOperatorFunction<unknown>) {
  throw new Error("Function not implemented.");
}
