import { Component, OnInit } from '@angular/core';
import { TopicService } from '../topic.service';
import { Topic } from '../topic';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  newtopic: string

  topics: Topic[]

  pageIndex = 1

  hasTopic() {
     return this.topics && this.topics.length > 0 || false
  }

  constructor(private topicService:TopicService) { }

  ngOnInit() {
    this.topicService.getTopics(this.pageIndex).subscribe( data => this.topics = data.topics )
  }

  addTopic(topic:string): void {
    if(!topic){
      return;
    }
    let newtopic = new Topic()
    newtopic.text = topic
    this.topicService.updateTopic(newtopic).subscribe(data=>{
      if(data.success === 1) {
        this.topics.unshift(data.topics[0])
      }
    })
  }

  deleteTopic(topic:Topic): void{
    const topicId = topic._id
    this.topicService.deleteTopic(topicId).subscribe(data=>{
      if(data.success === 1) {
       this.topics.splice(this.topics.findIndex(t=>t._id === topicId), 1)
      }
    })
  }

  onScroll(): void {
    this.pageIndex++
    this.topicService.getTopics(this.pageIndex).subscribe( data => {
      if (data.topics.length){
        this.topics = this.topics.concat(data.topics)        
      }
    })
  }
}
