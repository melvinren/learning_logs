import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'
import { TopicList, Topic } from './topic';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { map } from 'rxjs/operators/map';

@Injectable()
export class TopicService {
  private apihost = "http://localhost:11111"

  constructor(private http: HttpClient) { }

  getTopics(pageIndex: number): Observable<TopicList> {
    pageIndex = pageIndex || 1
    return this.http.post<TopicList>(`${this.apihost}/api/topics/get/${pageIndex}`, null)
      .pipe(
        catchError(this.handleError('getTopics', {count:0, topics:[]}))
      )
  }

  updateTopic(topic: Topic): Observable<any> {
    return this.http.post(`${this.apihost}/api/topic`, topic)
      .pipe(
        catchError(this.handleError("updateTopic", { success: 0}))
      )
  }

  deleteTopic(topicId: string): Observable<any> {
    return this.http.post(`${this.apihost}/api/topic/delete`, {_id: topicId})
      .pipe(
        catchError(this.handleError('deleteTopic', { success: 0}))
      )
  }

  getTopic(topicId: string): Observable<Topic> {
    return this.http.post(`${this.apihost}/api/topic/get`, {_id: topicId})
      .pipe(
        catchError(this.handleError('deleteTopic', null))
      )
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any) : Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }
}
