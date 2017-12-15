package com.melvin.rhx.learning_logs.xrecyclerview;

import android.animation.ValueAnimator;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.RotateAnimation;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.melvin.rhx.learning_logs.R;

import java.util.Date;

public class ArrowRefreshHeader extends LinearLayout implements BaseRefreshHeader {

    private LinearLayout mContainer;
    private ImageView mArrowImageView;
    private TextView mStatusTextView;
    private SimpleViewSwitcher mProgressBar;
    private TextView mHeaderTimeView;

    private int mState = STATE_NORAML;

    private Animation mRotateUpAnim;
    private Animation mRotateDownAnim;

    private static final int ROTATE_ANIM_DURATION = 180;

    public int mMeasuredHeight;

    public ArrowRefreshHeader(Context context) {
        super(context);
        initView();
    }

    public ArrowRefreshHeader(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initView();
    }

    private void initView(){
        mContainer = (LinearLayout) LayoutInflater.from(getContext()).inflate(R.layout.listview_header, null);
        LayoutParams lp = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
        lp.setMargins(0,0,0,0);
        this.setLayoutParams(lp);
        this.setPadding(0,0,0,0);

        addView(mContainer, new LayoutParams(LayoutParams.MATCH_PARENT, 0));
        setGravity(Gravity.BOTTOM);

        mArrowImageView = (ImageView)findViewById(R.id.listview_header_arrow);
        mStatusTextView = (TextView)findViewById(R.id.refresh_status_textview);

        mProgressBar = (SimpleViewSwitcher)findViewById(R.id.listview_header_progressbar);
        LoadingView progressView = new LoadingView(getContext());
        mProgressBar.setView(progressView);

        mRotateUpAnim = new RotateAnimation(0.0f, -180.0f, Animation.RELATIVE_TO_SELF, 0.5f, Animation.RELATIVE_TO_SELF, 0.5f);
        mRotateUpAnim.setDuration(ROTATE_ANIM_DURATION);
        mRotateUpAnim.setFillAfter(true);
        mRotateDownAnim = new RotateAnimation(-180.0f, 0.0f, Animation.RELATIVE_TO_SELF, 0.5f, Animation.RELATIVE_TO_SELF, 0.5f);
        mRotateDownAnim.setDuration(ROTATE_ANIM_DURATION);
        mRotateDownAnim.setFillAfter(true);

        mHeaderTimeView = (TextView)findViewById(R.id.last_refresh_time);
        measure(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        mMeasuredHeight = getMeasuredHeight();
    }

    public void setProgressStyle(int style){

    }

    public void setArrowImageView(int resid){
        mArrowImageView.setImageResource(resid);
    }

    public void setState(int state){
        if(state == mState) return;

        if(state == STATE_REFRESHING){
            mArrowImageView.clearAnimation();
            mArrowImageView.setVisibility(INVISIBLE);
            mProgressBar.setVisibility(VISIBLE);
            smoothScrollTo(mMeasuredHeight);
        } else if(state == STATE_DONE){
            mArrowImageView.setVisibility(INVISIBLE);
            mProgressBar.setVisibility(INVISIBLE);
        }else{
            mArrowImageView.setVisibility(VISIBLE);
            mProgressBar.setVisibility(INVISIBLE);
        }

        switch (state){
            case STATE_NORAML:
                if(mState == STATE_RELEASE_TO_REFRESH){
                    mArrowImageView.setAnimation(mRotateDownAnim);
                }
                if(mState == STATE_REFRESHING){
                    mArrowImageView.clearAnimation();
                }
                mStatusTextView.setText(R.string.listview_header_hint_normal);
                break;
            case STATE_RELEASE_TO_REFRESH:
                if(mState!= STATE_RELEASE_TO_REFRESH){
                    mArrowImageView.clearAnimation();
                    mArrowImageView.setAnimation(mRotateUpAnim);
                    mStatusTextView.setText(R.string.listview_header_hint_release);
                }
                break;
            case STATE_REFRESHING:
                mStatusTextView.setText(R.string.refreshing);
                break;
            case STATE_DONE:
                mStatusTextView.setText(R.string.refresh_done);
                break;
            default:break;
        }
        mState = state;
    }

    public int getState(){
        return mState;
    }

    private void smoothScrollTo(int destHeight){
        ValueAnimator animator = ValueAnimator.ofInt(getVisibleHeight(), destHeight);
        animator.setDuration(300).start();
        animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator valueAnimator) {
                setVisibleHeight((int)valueAnimator.getAnimatedValue());
            }
        });
    }

    public void setVisibleHeight(int height){
        if(height<0) height = 0;
        LayoutParams lp = (LayoutParams)mContainer.getLayoutParams();
        lp.height = height;
        mContainer.setLayoutParams(lp);
    }

    public int getVisibleHeight(){
        LayoutParams lp = (LayoutParams)mContainer.getLayoutParams();
        return lp.height;
    }


    @Override
    public void onMove(float delta) {
        if(getVisibleHeight()>0 || delta>0){
            setVisibleHeight((int)delta+getVisibleHeight());
            if(mState <= STATE_RELEASE_TO_REFRESH){
                if(getVisibleHeight()> mMeasuredHeight){
                    setState(STATE_RELEASE_TO_REFRESH);
                }else{
                    setState(STATE_NORAML);
                }
            }
        }
    }

    @Override
    public boolean releaseAction() {
        boolean isOnRefresh = false;
        int height = getVisibleHeight();
        if(height == 0){
            isOnRefresh = false;
        }
        if(getVisibleHeight()>mMeasuredHeight && mState<STATE_REFRESHING){
            setState(STATE_REFRESHING);
            isOnRefresh = true;
        }
        if(mState == STATE_REFRESHING && height <= mMeasuredHeight){
            //
        }
//        Log.i("RefreshHeader", "releaseAction: "+mState);
        if(mState !=STATE_REFRESHING){
            smoothScrollTo(0);
        }
        if(mState == STATE_REFRESHING){
            int destHeight = mMeasuredHeight;
            smoothScrollTo(destHeight);
        }
        return isOnRefresh;
    }

    @Override
    public void refreshComplete() {
        mHeaderTimeView.setText(friendlyTime(new Date()));
        setState(STATE_DONE);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                reset();
            }
        }, 200);
    }

    public void reset(){
        smoothScrollTo(0);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                setState(STATE_NORAML);
            }
        }, 500);
    }

    public static String friendlyTime(Date time){
        int ct = (int)((System.currentTimeMillis() - time.getTime())/1000);
        if(ct == 0){
            return "刚刚";
        }
        if(ct>0 && ct<60){
            return ct + "秒前";
        }
        if(ct>=60 && ct<3600){
            return Math.max(ct/60,1) + "分钟前";
        }
        if(ct>=3600 && ct<86400){
            return ct/3600 + "小时前";
        }
        if(ct>=86400 && ct < 2592000){
            return ct/86400 + "天前";
        }
        if(ct >= 2592000 && ct < 31104000) { //86400 * 30
            return ct / 2592000 + "月前";
        }
        return ct / 31104000 + "年前";
    }
}
