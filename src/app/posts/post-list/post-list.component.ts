import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[];
    subscriptions: Subscription;
    isLoading = false;
    // posts = [
    //     {title: 'first post', content: 'hello from the other side'},
    //     {title: 'second post', content: 'hi from the other side'},
    //     {title: 'third post', content: 'herro from the other side'}

    // ];
    constructor(private postsService: PostsService) { }

    ngOnInit() {
        this.isLoading = true;
        this.postsService.getPosts();
        // we now need to subscribe to the subject
        this.subscriptions = this.postsService.getPostUpdateListener()
        .subscribe((posts: Post[]) => {
            this.isLoading = false;
            this.posts = posts;
        });
    }

    deletePost(postId: string) {
        this.postsService.deletePost(postId);
    }
    // this is added to ensure theres not a memory leak
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
