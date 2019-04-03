import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, tap } from 'rxjs/operators';

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
    private mode = 'create';
    private postId: string;
    private post: Post;
    buttonText: string;
    isLoading = false;
    imagePreview: string;

    constructor(
        private fb: FormBuilder,
        private postsService: PostsService,
        public route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postsService
                    .getPost(this.postId)
                    .pipe(
                        // map(postData => this.setupForm(postData)),
                        map(
                            postData =>
                                this.post = {
                                    id: postData.post._id,
                                    title: postData.post.title,
                                    content: postData.post.content,
                                    imagePath: postData.post.imagePath
                                }
                        ),
                        tap(post => {
                            this.setupForm(post);
                        })
                    )
                    .subscribe(() => {
                        this.isLoading = false;
                    });
                this.buttonText = 'Edit Post';
                // this.setupForm(this.post);
            } else {
                this.mode = 'create';
                this.postId = null;
                this.buttonText = 'Create Post';
                this.setupForm();
            }
        });
        // this.form.reset();
    }

    setupForm(post?: Post) {
        if (this.mode === 'create') {
            this.form = this.fb.group({
                title: ['', [Validators.required, Validators.minLength(3)]],
                content: ['', [Validators.required, Validators.minLength(3)]],
                image: ['', Validators.required]
            });
        } else if (this.mode === 'edit') {
            this.form = this.fb.group({
                title: [
                    post.title,
                    [Validators.required, Validators.minLength(3)]
                ],
                content: [
                    post.content,
                    [Validators.required, Validators.minLength(3)]
                ],
                image: [
                    post.imagePath,
                    [Validators.required, Validators.minLength(3)]
                ]
            });
        }
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({image: file});
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = typeof reader.result === 'string' ? reader.result : null;
        };
        reader.readAsDataURL(file);
    }

    savePost() {
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create') {
            this.createPost();
        } else {
            this.editPost();
        }
    }
    createPost() {
        const post: Post = {
            id: null,
            title: this.form.value.title,
            content: this.form.value.content,
            imagePath: null
        };
        this.postsService.createPost(post, this.form.value.image);
        this.form.reset();
        this.form.updateValueAndValidity();
    }

    editPost() {
        const post: Post = {
            id: this.postId,
            title: this.form.value.title,
            content: this.form.value.content,
            imagePath: null
        };
        this.postsService.updatePost(post, this.form.value.image);
        this.form.reset();
    }
}
