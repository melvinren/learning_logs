package com.melvin.rhx.learning_logs.model;

import java.util.List;

public class Topic {
    private String _id;
    private String date;
    private String update_data;
    private String text;
    private List<Entry> entries;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUpdate_data() {
        return update_data;
    }

    public void setUpdate_data(String update_data) {
        this.update_data = update_data;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }
}
