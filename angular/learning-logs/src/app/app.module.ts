import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicService } from './topic.service';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TopicsComponent,
    TopicDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule
  ],
  providers: [TopicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
