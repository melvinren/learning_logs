import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { TopicsComponent } from './topics/topics.component';
import { AboutComponent } from './about/about.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';

const routes: Routes = [  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'topics', component: TopicsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'topic/:id', component: TopicDetailComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
