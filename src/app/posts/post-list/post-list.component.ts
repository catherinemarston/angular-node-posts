import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
    @Input() posts: Post[];
    // posts = [
    //     {title: 'first post', content: 'hello from the other side'},
    //     {title: 'second post', content: 'hi from the other side'},
    //     {title: 'third post', content: 'herro from the other side'}

    // ];
    constructor() { }

    ngOnInit(): void { }
}
