package com.melvin.rhx.learning_logs;

import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.RelativeLayout;

import com.melvin.rhx.learning_logs.model.Topic;

import java.util.ArrayList;
import java.util.List;

public class TopicListActivity extends AppCompatActivity {

    private RecyclerView topiclist_viewlist;

    private RelativeLayout loadingLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_topic_list);
        topiclist_viewlist = (RecyclerView)findViewById(R.id.topiclist_viewlist);
        LinearLayoutManager manager = new LinearLayoutManager(this);
        topiclist_viewlist.setLayoutManager(manager);
        topiclist_viewlist.setHasFixedSize(true);
        loadingLayout = (RelativeLayout)findViewById(R.id.list_loading);
        LoadTopics();
    }

    private void LoadTopics(){

        AsyncTask asyncTask = new AsyncTask() {

            @Override
            protected void onPreExecute() {
                ShowLoading();
            }

            @Override
            protected Object doInBackground(Object[] objects) {
                return APIUtility.getTopics(0);
            }

            @Override
            protected void onPostExecute(Object o) {
                HideLoading();
                List<Topic> topics = new ArrayList<>();
                if (o!=null) {
                    topics = (List<Topic>) o;
                }
                FillTopicList(topics);
            }
        };
        asyncTask.execute();
    }

    private void ShowLoading(){
        loadingLayout.setVisibility(View.VISIBLE);
    }
    private void HideLoading(){
        loadingLayout.setVisibility(View.GONE);
    }
    private void FillTopicList(List<Topic> topics){
        TopicListAdapter adapter = new TopicListAdapter(topics);
        topiclist_viewlist.setAdapter(adapter);
    }
}
