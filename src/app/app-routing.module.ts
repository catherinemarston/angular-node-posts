import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CreateNewPostComponent } from './posts/create-new-post/create-new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';

const routes: Routes = [
    { path: '', component: PostListComponent },
    { path: 'create', component: CreateNewPostComponent },
    { path: 'edit/:postId', component: CreateNewPostComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}