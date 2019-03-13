import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-new-post',
    templateUrl: './create-new-post.component.html',
    styleUrls: ['./create-new-post.component.scss']
})
export class CreateNewPostComponent implements OnInit {
    title = '';
    content = '';
    post: Post;
    form: FormGroup;
    @Output() postCreated = new EventEmitter<Post>();

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.setupForm();
     }

    setupForm() {
        this.form = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required]
        });
    }

    createPost() {
        const post: Post = {
            title: this.form.value.title,
            content: this.form.value.content
        };
        this.postCreated.emit(post);
    }
}
