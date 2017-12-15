package com.melvin.rhx.learning_logs;

import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.melvin.rhx.learning_logs.model.Topic;
import com.melvin.rhx.learning_logs.xrecyclerview.XRecyclerView;

import java.util.ArrayList;
import java.util.List;


public class TopicListFragment extends Fragment {

    private RecyclerView topiclistview;

    private XRecyclerView topiclist_xview;

    private FrameLayout loadingLayout;

    private TopicListAdapter adapter;

    private int pageIndex=1;

    private boolean loading = false;

    private TextView alltopics_loaed;

    private boolean finished = false;

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
        final LinearLayoutManager manager = new LinearLayoutManager(getContext());
        topiclistview.setLayoutManager(manager);
//        topiclistview.addItemDecoration(new CustomDecoration(getContext()));
//        topiclistview.addItemDecoration(new LeftAndRightTagDecoration(getContext()));
        topiclistview.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);

                int childCount = recyclerView.getChildCount();
                int itemCount = manager.getItemCount();
                int firstVisibleItemPosition = manager.findFirstVisibleItemPosition();
                if(loading == false && finished == false && childCount + firstVisibleItemPosition >= itemCount){
//                    pageIndex++;
//                    LoadTopics(pageIndex);
                }
            }

        });
        loadingLayout = (FrameLayout)getActivity().findViewById(R.id.list_loading);
        alltopics_loaed = (TextView)getActivity().findViewById(R.id.alltopics_loaded);
//        LoadTopics(pageIndex);

        topiclist_xview = (XRecyclerView)getActivity().findViewById(R.id.topiclist_xlist);
        final LinearLayoutManager layoutManager  = new LinearLayoutManager(getContext());
        layoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        topiclist_xview.setLayoutManager(layoutManager );
        topiclist_xview.addItemDecoration(new CustomDecoration(getContext()));
        topiclist_xview.setLoadingListener(new XRecyclerView.LoadingListener() {
            @Override
            public void onRefresh() {
                pageIndex = 1;
                LoadTopics4X(pageIndex, true);
            }

            @Override
            public void onLoadMore() {
                pageIndex++;
                LoadTopics4X(pageIndex);
            }
        });
        LoadTopics4X(pageIndex);
    }


    private void LoadTopics(final int pageIndex){
        AsyncTask asyncTask = new AsyncTask() {

            @Override
            protected void onPreExecute() {
                loading = true;
                ShowLoading();
            }

            @Override
            protected Object doInBackground(Object[] objects) {
                return APIUtility.getTopics(pageIndex);
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
    private void ShowFinish() {
        alltopics_loaed.setVisibility(View.VISIBLE);
    }

    private void FillTopicList(List<Topic> topics){
        loading = false;
        if(adapter == null) {
            adapter = new TopicListAdapter(topics);
            topiclistview.setAdapter(adapter);
        }else{
            if(topics == null || topics.size()==0){
                finished = true;
                ShowFinish();
                return;
            }
            adapter.topics.addAll(topics);
            adapter.notifyDataSetChanged();
        }
    }

    private void LoadTopics4X(final int pageIndex, final boolean reset){
        AsyncTask asyncTask = new AsyncTask() {

            @Override
            protected Object doInBackground(Object[] objects) {
                return APIUtility.getTopics(pageIndex);
            }

            @Override
            protected void onPostExecute(Object o) {
                List<Topic> topics = new ArrayList<>();
                if (o!=null) {
                    topics = (List<Topic>) o;
                }
                FillTopicList4X(topics, reset);
            }
        };
        asyncTask.execute();
    }

    private void LoadTopics4X(final int pageIndex){
      LoadTopics4X(pageIndex, false);
    }

    private void FillTopicList4X(List<Topic> topics){
        FillTopicList4X(topics, false);
    }

    private void FillTopicList4X(List<Topic> topics, boolean reset){
        loading = false;
        if(adapter == null) {
            adapter = new TopicListAdapter(topics);
            topiclist_xview.setAdapter(adapter);
        }else{
            if(topics == null || topics.size()==0){
                finished = true;
                topiclist_xview.setNoMore(true);
                return;
            }
            if(reset){
                adapter.topics = topics;
                finished = false;
                topiclist_xview.reset();
            }else {
                adapter.topics.addAll(topics);
            }
            adapter.notifyDataSetChanged();
        }
        topiclist_xview.loadMoreComplete();
    }
}
