import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
    selector: 'app-create-new-post',
    templateUrl: './create-new-post.component.html',
    styleUrls: ['./create-new-post.component.scss']
})
export class CreateNewPostComponent implements OnInit {
    title = '';
    content = '';
    form: FormGroup;
    @Output() postCreated = new EventEmitter<Post>();

    constructor(private fb: FormBuilder, private postsService: PostsService) { }

    ngOnInit() {
        this.setupForm();
        this.form.reset();
     }

    setupForm() {
        this.form = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            content: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    createPost() {
        if (this.form.invalid) {
            return;
        }
        const post: Post = {
            title: this.form.value.title,
            content: this.form.value.content
        };
        this.postsService.createPost(post);
        this.form.reset();
        this.form.updateValueAndValidity();
        // console.log(this.form);
        // this.form.markAsPristine();
        // console.log(this.form);
    }
}
