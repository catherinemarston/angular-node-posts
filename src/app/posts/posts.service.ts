import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    constructor(private http: HttpClient, private router: Router) {}

    getPosts() {
        // this will obviously not work because the post-list component is being rendered before we create a post and then once
        // we create a new post, this copy of the posts array is not being updated so therefore we need to use the rxjs Subject
        this.http
            .get<{ message: string; posts: any }>(
                'http://localhost:3000/api/posts'
            )
            .pipe(
                map(postData => {
                    return postData.posts.map(post => {
                        return {
                            title: post.title,
                            content: post.content,
                            id: post._id,
                            imagePath: post.imagePath
                        };
                    });
                })
            )
            .subscribe(posts => {
                this.posts = posts;
                this.postsUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string) {
        // return this.http.get<[{ _id: string; title: string; content: string }, { message: string}]>(
            return this.http.get<any>(
            'http://localhost:3000/api/posts/' + id
        );
    }

    createPost(post: Post, image: File) {
        const postData = this.createFormData(post, image);

        this.http
            .post<{ message: string; post: Post }>(
                'http://localhost:3000/api/posts',
                postData
            )
            .subscribe(res => {
                const newPost: Post = {
                    id: res.post.id,
                    title: post.title,
                    content: post.content,
                    imagePath: res.post.imagePath
                };
                // get id from backend and update post on the front end so we have access to the id for deleting it.
                // Another option would have been to create the post, then fetch all posts but that's not ideal.
                this.posts.push(newPost);
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });
    }

    updatePost(post: Post, image: File | string) {
        let postData: Post | FormData;
        if (typeof(image) === 'object') {
            postData = this.createFormData(post, image);
            postData.append('id', post.id);
        } else {
            postData = {
                id: post.id,
                title: post.title,
                content: post.content,
                imagePath: image
            };
        }
        this.http
            .patch('http://localhost:3000/api/posts/' + post.id, postData)
            .subscribe(() => {
                this.router.navigate(['/']);
            });
    }

    createFormData(post: Post, image: File | string) {
        const postData = new FormData();
        postData.append('title', post.title);
        postData.append('content', post.content);
        postData.append('image', image, post.title);
        return postData;
    }

    deletePost(postId: string) {
        this.http
            .delete('http://localhost:3000/api/posts/' + postId)
            .subscribe(() => {
                const updatedPosts = this.posts.filter(
                    post => post.id !== postId
                );
                this.posts = updatedPosts;
                this.postsUpdated.next([...this.posts]);
            });
    }
}
