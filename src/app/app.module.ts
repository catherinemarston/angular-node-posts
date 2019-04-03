import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CreateNewPostComponent } from './posts/create-new-post/create-new-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostListComponent } from './posts/post-list/post-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PostsService } from './posts/posts.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { AuthenticationService } from './auth/auth.service';

@NgModule({
    declarations: [
        AppComponent,
        CreateNewPostComponent,
        HeaderComponent,
        PostListComponent,
        LoginComponent,
        SignUpComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        HttpClientModule
    ],
    providers: [PostsService, AuthenticationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
