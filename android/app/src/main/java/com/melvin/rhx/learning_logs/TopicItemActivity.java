package com.melvin.rhx.learning_logs;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.alibaba.fastjson.JSON;
import com.melvin.rhx.learning_logs.model.Entry;

import java.util.List;

public class TopicItemActivity extends AppCompatActivity {

    private TextView entry_date;

    private TextView entry_text;

    private TextView no_entry;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_topic_item);
        entry_date = (TextView)findViewById(R.id.entry_date);
        entry_text =(TextView)findViewById(R.id.entry_text);
        no_entry = (TextView)findViewById(R.id.no_entry);
        String entries = getIntent().getStringExtra("entries");
        if(entries!=null){
            List<Entry> entryList = JSON.parseArray(entries, Entry.class);
            if(entryList!=null && entries.length() >0){
                LoadEntry(entryList.get(0));
                no_entry.setVisibility(View.GONE);
            }else{
                no_entry.setVisibility(View.VISIBLE);
            }
        }else{
            no_entry.setVisibility(View.VISIBLE);
        }
    }

    public void LoadEntry(Entry entry){
        if(entry!=null){
            entry_date.setText(entry.getDate());
            entry_text.setText(entry.getText());
        }
    }
}
