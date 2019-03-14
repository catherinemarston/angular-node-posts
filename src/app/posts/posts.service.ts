import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable()
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPosts() {
        // this will obviously not work because the post-list component is being rendered before we create a post and then once
        // we create a new post, this copy of the posts array is not being updated so therefore we need to use the rxjs Subject
        return [...this.posts];
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    createPost(post: Post) {
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }


}
