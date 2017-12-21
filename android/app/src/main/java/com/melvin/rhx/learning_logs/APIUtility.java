package com.melvin.rhx.learning_logs;

import android.support.annotation.NonNull;
import android.text.TextUtils;

import com.alibaba.fastjson.JSON;
import com.melvin.rhx.learning_logs.model.SimpleResponse;
import com.melvin.rhx.learning_logs.model.Topic;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class APIUtility {
    private static final String apihost = "http://192.168.0.230:11111";
    private static final String topicListApi = "/api/topics/get";
    private static final String saveTopicApi = "/api/topic";

    public static List<Topic> getTopics(int pageIndex){
        String requestUrl = apihost+topicListApi+"/"+pageIndex;
        String response = SendRequest(requestUrl);
        List<Topic> topics = new ArrayList<>();
        if(response!=null && !TextUtils.isEmpty(response)) {
            topics = JSON.parseArray(response, Topic.class);
        }
//        Log.i("API response:", "getTopics: "+response);
        return topics;
    }
    @NonNull
    private static String SendRequest(final String address) {
        return SendRequest(address, null);
    }

    @NonNull
    private static String SendRequest(final String address, final String body) {
        HttpURLConnection connection = null;
        BufferedReader reader = null;
        try {
            URL url = new URL(address);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setConnectTimeout(10000);
            connection.setReadTimeout(10000);
            connection.setRequestProperty("Content-Type","application/json");
            if(body!=null && body.length()>0){
                OutputStream outputStream = connection.getOutputStream();
                outputStream.write(body.getBytes("UTF-8"));
                outputStream.close();
            }
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

    public static boolean SaveTopic(final Topic topic){
        String requestUrl = apihost+saveTopicApi;
        String response = SendRequest(requestUrl, JSON.toJSONString(topic));
        if(response!=null && !TextUtils.isEmpty(response)) {
            SimpleResponse obj = JSON.parseObject(response,SimpleResponse.class);
            if(obj !=null && "1".equals(obj.getSuccess())){
                return true;
            }
        }
        return false;
    }
}

