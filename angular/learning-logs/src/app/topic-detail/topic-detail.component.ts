import { Component, OnInit } from '@angular/core';
import { TopicService } from '../topic.service';
import { Topic } from '../topic';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { cloneDeep } from 'lodash'

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {

  topic:Topic

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.topicService.getTopic(id).subscribe(topic => this.topic = topic)
  }

  addEntry(entry: string): void{
    if(!entry){
      return;
    }
    const topic = cloneDeep(this.topic);
    const now = new Date()
    const date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getMinutes()
    const entryobj = {
      text: entry,
      date: date
    }
    topic.entries = topic.entries || []
    topic.entries.push(entryobj)
    this.topicService.updateTopic(topic).subscribe(data=>{
      if(data.success === 1) {
        this.topic = topic
      }
    })
  }

  saveTopic():void{
    if(!this.topic.text){
      return;
    }
    this.topicService.updateTopic(this.topic).subscribe(data=>{
      if(data.success === 1) {
        this.location.back();
      }
    })
  }
}
