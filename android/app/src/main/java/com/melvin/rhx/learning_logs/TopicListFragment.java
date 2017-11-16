package com.melvin.rhx.learning_logs;

import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import com.melvin.rhx.learning_logs.model.Topic;

import java.util.ArrayList;
import java.util.List;


public class TopicListFragment extends Fragment {

    private RecyclerView topiclistview;

    private RelativeLayout loadingLayout;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_topiclist, container, false);
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        topiclistview = (RecyclerView)getActivity().findViewById(R.id.topiclist_viewlist);
        topiclistview.setHasFixedSize(true);
        LinearLayoutManager manager = new LinearLayoutManager(getContext());
        topiclistview.setLayoutManager(manager);
        loadingLayout = (RelativeLayout)getActivity().findViewById(R.id.list_loading);
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
                return APIUtility.getTopics();
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
        topiclistview.setAdapter(adapter);
    }
}
