package com.melvin.rhx.learning_logs;

import android.content.Intent;
import android.os.Parcelable;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.alibaba.fastjson.JSON;
import com.melvin.rhx.learning_logs.model.Topic;

import java.util.ArrayList;
import java.util.List;

public class TopicListAdapter extends RecyclerView.Adapter<TopicListAdapter.ViewHolder> {

    private List<Topic> topics;

    public TopicListAdapter(List<Topic> topics){
        this.topics = topics;
    }

    @Override
    public ViewHolder onCreateViewHolder(final ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.topic_list_item, parent, false);
        final ViewHolder vh = new ViewHolder(view);
        vh.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int position = vh.getAdapterPosition();
                Topic topic = topics.get(position);
                if(topic!=null){
//                    Toast.makeText(parent.getContext(), topic.get_id(), Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(parent.getContext(), TopicItemActivity.class);
                    intent.putExtra("entries", JSON.toJSONString(topic.getEntries()));
                    parent.getContext().startActivity(intent);
                }
            }
        });
        return vh;
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Topic topic = topics.get(position);
        if(topic!=null){
            holder.textView.setText(topic.getText());
        }
    }

    @Override
    public int getItemCount() {
        return topics.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder{

        public TextView textView;

        public ViewHolder(View itemView) {
            super(itemView);
            textView = (TextView) itemView.findViewById(R.id.topic_text);

        }
    }
}
