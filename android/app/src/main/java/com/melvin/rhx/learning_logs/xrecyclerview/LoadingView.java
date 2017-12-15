package com.melvin.rhx.learning_logs.xrecyclerview;

import android.animation.Animator;
import android.animation.ValueAnimator;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;

import java.util.ArrayList;
import java.util.List;

public class LoadingView extends View {

    //Sizes (with defaults in DP)
    public static final int DEFAULT_SIZE=30;

    private Paint mPaint;

    private boolean mHasAnimation;

    public LoadingView(Context context) {
        super(context);
        init(null,0);
    }

    public LoadingView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(attrs,0);
    }

    public LoadingView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(attrs, defStyleAttr);
    }

    public LoadingView(Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(attrs,defStyleAttr);
    }

    private void init(AttributeSet attrs, int defStyle){
        mPaint = new Paint();
        mPaint.setColor(Color.WHITE); //// TODO: 2017/11/20
        mPaint.setStyle(Paint.Style.FILL);
        mPaint.setAntiAlias(true);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int width = measureDimesion(dp2px(DEFAULT_SIZE), widthMeasureSpec);
        int height = measureDimesion(dp2px(DEFAULT_SIZE), heightMeasureSpec);
        setMeasuredDimension(width, height);
    }

    private int measureDimesion(int defaultSize, int measureSpec){
        int result = defaultSize;
        int mode = MeasureSpec.getMode(measureSpec);
        int size = MeasureSpec.getSize(measureSpec);
        if(mode == MeasureSpec.EXACTLY){
            result = size;
        }else if(mode == MeasureSpec.AT_MOST){
            result = Math.min(defaultSize, size);
        }
        return result;
    }

    private int dp2px(int dpValue){
        return (int)getContext().getResources().getDisplayMetrics().density * dpValue;
    }


    public static final float SCALE=1.0f;

    //scale x ,y
    private float[] scaleFloats=new float[]{
            SCALE,
            SCALE,
            SCALE
    };

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        // 画UI
        float circleSpacing = 4;
        float radius = (Math.min(getWidth(), getHeight()) - circleSpacing*2)/6;
        float x = getWidth()/2 - (radius*2+circleSpacing);
        float y = getHeight()/2;
        for(int i = 0; i<3;i++){
            canvas.save();
            float translateX = x + (radius*2)*i + circleSpacing*i;
            canvas.translate(translateX, y);
            canvas.scale(scaleFloats[i], scaleFloats[i]);
            canvas.drawCircle(0,0,radius, mPaint);
            canvas.restore();
        }
    }

    private List<Animator> mAnimators;

    public List<Animator> createAnimation() {
        List<Animator> animators=new ArrayList<>();
        int[] delays = new int[]{120,240,360};
        for(int i=0;i<3;i++){
            final int index = i;
            ValueAnimator scaleAnim = ValueAnimator.ofFloat(1,0.3f,1);

            scaleAnim.setDuration(750);
            scaleAnim.setRepeatCount(-1);
            scaleAnim.setStartDelay(delays[i]);

            scaleAnim.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                @Override
                public void onAnimationUpdate(ValueAnimator valueAnimator) {
                    scaleFloats[index] = (float)valueAnimator.getAnimatedValue();
                    postInvalidate();
                }
            });
            scaleAnim.start();
            animators.add(scaleAnim);
        }
        return animators;
    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        super.onLayout(changed, left, top, right, bottom);
        if(!mHasAnimation){
            mHasAnimation = true;
            mAnimators = createAnimation();
        }
    }

    @Override
    public void setVisibility(int visibility) {
        if(getVisibility() != visibility){
            super.setVisibility(visibility);
            if(visibility == GONE || visibility == INVISIBLE){
                setAnimationStatus(AnimStatus.END);
            }else{
                setAnimationStatus(AnimStatus.START);
            }
        }
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        setAnimationStatus(AnimStatus.CANCEL);
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        setAnimationStatus(AnimStatus.START);
    }

    private void setAnimationStatus(AnimStatus animStatus){
        if(mAnimators == null){
            return;
        }
        int count = mAnimators.size();
        for(int i= 0;i<count;i++){
            Animator animator = mAnimators.get(i);
            boolean isRunning = animator.isRunning();
            switch (animStatus){
                case START:
                    if(!isRunning){
                        animator.start();
                    }
                    break;
                case END:
                    if(isRunning){
                        animator.end();
                    }
                    break;
                case CANCEL:
                    if(isRunning){
                        animator.cancel();
                    }
                    break;
            }
        }
    }

    public enum AnimStatus{
        START,
        END,
        CANCEL
    }
}
