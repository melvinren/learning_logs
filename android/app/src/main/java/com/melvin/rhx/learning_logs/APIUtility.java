package com.melvin.rhx.learning_logs;

import android.text.TextUtils;
import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.melvin.rhx.learning_logs.model.Topic;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class APIUtility {
    private static final String apihost = "http://192.168.0.230:11111";
    private static final String topicListApi = "/api/topics/get";

    public static List<Topic> getTopics(int pageIndex){
        String requestUrl = apihost+topicListApi+"/"+pageIndex;
        String response = SendRequest(requestUrl);
        List<Topic> topics = new ArrayList<>();
        if(response!=null && !TextUtils.isEmpty(response)) {
            topics = JSON.parseArray(response, Topic.class);
        }
//        Log.i("API response:", "getTopics: "+response);
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return topics;
    }

    public static String SendRequest(final String address) {
        HttpURLConnection connection = null;
        BufferedReader reader = null;
        try {
            URL url = new URL(address);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setConnectTimeout(10000);
            connection.setReadTimeout(10000);
            InputStream in = connection.getInputStream();
            reader = new BufferedReader(new InputStreamReader(in));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (connection != null) {
                connection.disconnect();
            }
        }
        return "";
    }
}
