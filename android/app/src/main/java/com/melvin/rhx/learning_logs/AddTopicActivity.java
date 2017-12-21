package com.melvin.rhx.learning_logs;

import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.melvin.rhx.learning_logs.model.Topic;

public class AddTopicActivity extends AppCompatActivity {

    private EditText topic_text;

    private Button saveButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_topic);
        topic_text = (EditText)findViewById(R.id.newtopic_text);
        saveButton = (Button)findViewById(R.id.save_newtopic);
        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(topic_text.getText()!=null && topic_text.getText().length()>0){
                    Topic topic = new Topic();
                    topic.setText(topic_text.getText().toString());
                    SaveTopic(topic);
                }else{
                    Toast.makeText(AddTopicActivity.this, "topic must have content!", Toast.LENGTH_SHORT).show();
                    return;
                }
            }
        });
    }

    private void SaveTopic(Topic topic){
        AsyncTask task = new AsyncTask(){
            @Override
            protected Object doInBackground(Object[] objects) {
                if (APIUtility.SaveTopic((Topic) objects[0])) return true;
                else return false;
            }

            @Override
            protected void onPostExecute(Object o) {
                boolean result = (boolean)o;
                checkSaveSuccess(result);
            }
        };
        task.execute(topic);
    }

    private void checkSaveSuccess(boolean result){
        if(result){
            setResult(10000);
            finish();
        }else{
            Toast.makeText(AddTopicActivity.this,"save topic:"+result, Toast.LENGTH_SHORT).show();
        }
    }
}
