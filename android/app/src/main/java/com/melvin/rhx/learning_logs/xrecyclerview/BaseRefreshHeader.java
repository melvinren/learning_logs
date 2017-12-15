package com.melvin.rhx.learning_logs.xrecyclerview;

interface BaseRefreshHeader {
    int STATE_NORAML = 0;
    int STATE_RELEASE_TO_REFRESH = 1;
    int STATE_REFRESHING = 2;
    int STATE_DONE = 3;

    void onMove(float delta);
    boolean releaseAction();
    void refreshComplete();
}
