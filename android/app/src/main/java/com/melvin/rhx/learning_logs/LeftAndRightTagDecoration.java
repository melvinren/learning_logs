package com.melvin.rhx.learning_logs;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.support.v7.widget.RecyclerView;
import android.view.View;

public class LeftAndRightTagDecoration extends RecyclerView.ItemDecoration {
    private Paint leftPaint;
    private Paint rightPaint;

    public LeftAndRightTagDecoration(Context context){
        leftPaint = new Paint();
        leftPaint.setColor(context.getResources().getColor(R.color.colorPrimary));
        rightPaint = new Paint();
        rightPaint.setColor(context.getResources().getColor(R.color.colorAccent));
    }

    @Override
    public void onDrawOver(Canvas c, RecyclerView parent, RecyclerView.State state) {
        super.onDrawOver(c, parent, state);
        int childCount = parent.getChildCount();
        for(int i = 0; i< childCount; i++){
            View view = parent.getChildAt(i);
            int pos = parent.getChildAdapterPosition(view);
            boolean isLeft = pos % 2 == 0;
            float top = view.getTop();
            float bottom = view.getBottom();
            if(isLeft){
                float left = view.getLeft();
                float right = left + 20;
                c.drawRect(left, top, right, bottom, leftPaint);
            }else{
                float right = view.getRight();
                float left = right - 20;
                c.drawRect(left, top, right, bottom, rightPaint);
            }
        }
    }
}
