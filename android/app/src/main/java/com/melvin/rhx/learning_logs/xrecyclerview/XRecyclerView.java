package com.melvin.rhx.learning_logs.xrecyclerview;

import android.content.Context;
import android.support.annotation.Nullable;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;
import java.util.List;

/*
* copy from https://github.com/XRecyclerView/XRecyclerView
 */

public class XRecyclerView extends RecyclerView {

    private boolean isLoadingData = false;
    private boolean loadingMoreEnabled = true;
    private boolean isNoMore = false;
    private View mFootView;
    private LoadingListener mLoadingListener;

    // 控制多出多少条的时候调用 onLoadMore
    private int limitNumberToCallLoadMore = 1;

    //下面的ItemViewType是保留值(ReservedItemViewType),如果用户的adapter与它们重复将会强制抛出异常。不过为了简化,我们检测到重复时对用户的提示是ItemViewType必须小于10000
    private static final int TYPE_REFRESH_HEADER = 10000;//设置一个很大的数字,尽可能避免和用户的adapter冲突
    private static final int TYPE_FOOTER = 10001;
    private static final int HEADER_INIT_INDEX = 10002;

    private boolean pullRefreshEnabled = true;
    private ArrowRefreshHeader mRefreshHeader;
    private float mLastY = -1;
    private static final float DRAG_RATE = 3;

    private WrapAdapter mWrapAdapter;

    public XRecyclerView(Context context) {
        this(context, null);
    }

    public XRecyclerView(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs,0);
    }

    public XRecyclerView(Context context, @Nullable AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }

    private void init(){
        if(pullRefreshEnabled){
            mRefreshHeader = new ArrowRefreshHeader(getContext());
//            mRefreshHeader.setProgressStyle();
        }
        mFootView = new LoadingMoreFooter(getContext());
        mFootView.setVisibility(GONE);
    }

    @Override
    public void setLayoutManager(LayoutManager layout) {
        super.setLayoutManager(layout);
        // TODO: 2017/11/21  layout
    }

    @Override
    public void setAdapter(Adapter adapter) {
        mWrapAdapter = new WrapAdapter(adapter);
        super.setAdapter(mWrapAdapter);
    }

    @Override
    public Adapter getAdapter() {
        return mWrapAdapter!=null ? mWrapAdapter.adapter : null;
    }

    @Override
    public void onScrollStateChanged(int state) {
        super.onScrollStateChanged(state);
        if(state == RecyclerView.SCROLL_STATE_IDLE && mLoadingListener!=null && !isLoadingData && loadingMoreEnabled){
            LayoutManager layoutManager = getLayoutManager();
            int lastVisibleItemPosition;
            if (layoutManager instanceof GridLayoutManager){
                lastVisibleItemPosition = ((GridLayoutManager)layoutManager).findLastVisibleItemPosition();
            } else if (layoutManager instanceof StaggeredGridLayoutManager){
                int[] into = new int[((StaggeredGridLayoutManager)layoutManager).getSpanCount()];
                ((StaggeredGridLayoutManager)layoutManager).findLastVisibleItemPositions(into);
                lastVisibleItemPosition = findMax(into);
            } else {
                lastVisibleItemPosition = ((LinearLayoutManager)layoutManager).findLastVisibleItemPosition();
            }
            int adjAdapterItemCount = layoutManager.getItemCount();
            if(layoutManager.getItemCount()>0 && lastVisibleItemPosition >= adjAdapterItemCount - limitNumberToCallLoadMore && !isNoMore){
                isLoadingData = true;
                if(mFootView instanceof LoadingMoreFooter){
                    ((LoadingMoreFooter)mFootView).setState(LoadingMoreFooter.STATE_LOADING);
                }
                mLoadingListener.onLoadMore();
            }
        }
    }

    @Override
    public boolean onTouchEvent(MotionEvent e) {
        if(mLastY == -1){
            mLastY = e.getRawY();
        }
        switch (e.getAction()){
            case MotionEvent.ACTION_DOWN:
                mLastY = e.getRawY();
                break;
            case MotionEvent.ACTION_MOVE:
                final float deltaY = e.getRawY() - mLastY;
                mLastY = e.getRawY();
                if(isOnTop() && pullRefreshEnabled){
                    mRefreshHeader.onMove(deltaY/DRAG_RATE);
                    if(mRefreshHeader.getVisibleHeight() > 0 && mRefreshHeader.getState() < ArrowRefreshHeader.STATE_REFRESHING){
                        return false;
                    }
                }
                break;
            default:
                mLastY = -1;
                if(isOnTop() && pullRefreshEnabled){
                    if(mRefreshHeader.releaseAction()){
                        if(mLoadingListener!=null){
                            mLoadingListener.onRefresh();
                        }
                    }
                }
        }
        return super.onTouchEvent(e);
    }

    private boolean isOnTop(){
        return mRefreshHeader.getParent() != null;
    }
    private int findMax(int[] lastPositions){
        int max = lastPositions[0];
        for(int value: lastPositions){
            if(value>max){
                max = value;
            }
        }
        return max;
    }

    public void setLoadingListener(LoadingListener listener) {
        mLoadingListener = listener;
    }

    public void loadMoreComplete(){
        isLoadingData = false;
        if(mFootView instanceof LoadingMoreFooter){
            ((LoadingMoreFooter)mFootView).setState(LoadingMoreFooter.STATE_COMPLETE);
        }
    }
    public void setNoMore(boolean noMore){
        isLoadingData = false;
        isNoMore = noMore;
        if(mFootView instanceof LoadingMoreFooter){
            ((LoadingMoreFooter)mFootView).setState(isNoMore?LoadingMoreFooter.STATE_NOMORE:LoadingMoreFooter.STATE_COMPLETE);
        }
    }

    public void reset(){
        setNoMore(false);
        loadMoreComplete();
        refreshComplete();
    }

    public void refreshComplete(){
        mRefreshHeader.refreshComplete();
        setNoMore(false);
    }

    public interface LoadingListener {

        void onRefresh();

        void onLoadMore();
    }


    private class WrapAdapter extends RecyclerView.Adapter<ViewHolder>{

        private RecyclerView.Adapter adapter;

        public WrapAdapter(RecyclerView.Adapter adapter){
            this.adapter = adapter;
        }

        public RecyclerView.Adapter getOriginalAdapter(){
            return this.adapter;
        }



        @Override
        public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            if(viewType == TYPE_REFRESH_HEADER){
                return new SimpleViewHolder(mRefreshHeader);
            }
            if(viewType == TYPE_FOOTER){
                return new SimpleViewHolder(mFootView);
            }
            return adapter.onCreateViewHolder(parent, viewType);
        }

        @Override
        public void onBindViewHolder(ViewHolder holder, int position) {
            if(isRefreshHeader(position)){
                return;
            }
            int adjPosition = position - 1 ; // 减去refreshHeader
            if(adapter !=null) {
                int adapterCount = adapter.getItemCount();
                if (adjPosition < adapterCount) {
                    adapter.onBindViewHolder(holder, adjPosition);
                }
            }
        }

        @Override
        public void onBindViewHolder(ViewHolder holder, int position, List<Object> payloads) {
            if(isRefreshHeader(position)){
                return;
            }
            int adjPosition = position - 1 ; // 减去refreshHeader
            if(adapter !=null) {
                int adapterCount = adapter.getItemCount();
                if (adjPosition < adapterCount) {
                    if(payloads.isEmpty()) {
                        adapter.onBindViewHolder(holder, adjPosition);
                    }else{
                        adapter.onBindViewHolder(holder, adjPosition, payloads);
                    }
                }
            }
        }

        @Override
        public int getItemCount() {
            int adjLen = loadingMoreEnabled ? 2 : 1;  // refreshHeader + loadingMore
            if(adapter!=null){
                return adapter.getItemCount() + adjLen;
            }else{
                return adjLen;
            }
        }

        private boolean isRefreshHeader(int position){
            return position == 0;
        }

        private boolean isFooter(int position){
            if(loadingMoreEnabled){
                return position == getItemCount() -1;
            }else{
                return false;
            }
        }
        private boolean isReservedItemViewType(int itemViewType){
            if(itemViewType == TYPE_FOOTER){
                return true;
            }else{
                return false;
            }
        }

        @Override
        public int getItemViewType(int position) {
            if(isRefreshHeader(position)){
                return TYPE_REFRESH_HEADER;
            }
            if(isFooter(position)){
                return TYPE_FOOTER;
            }
            int adjPosition = position - 1 ; // 减去refreshHeader
            if(adapter!=null){
                int adapterCount = adapter.getItemCount();
                if(adjPosition<adapterCount) {
                    int type = adapter.getItemViewType(adjPosition);
                    if(isReservedItemViewType(type)){
                        throw new IllegalStateException("XRecyclerView require itemViewType in adapter should be less than 10000 " );
                    }
                    return type;
                }
            }
            return 0;
        }

        @Override
        public long getItemId(int position) {
            if(adapter!=null && position>=1){
                int adjPosition = position - 1;
                if(adjPosition<adapter.getItemCount()){
                    return adapter.getItemId(adjPosition);
                }
            }
            return -1;
        }

        @Override
        public void onAttachedToRecyclerView(RecyclerView recyclerView) {
            super.onAttachedToRecyclerView(recyclerView);
            // TODO: 2017/11/22 gridlayoutmanager
            adapter.onAttachedToRecyclerView(recyclerView);
        }

        @Override
        public void onDetachedFromRecyclerView(RecyclerView recyclerView) {
            adapter.onDetachedFromRecyclerView(recyclerView);
        }

        @Override
        public void onViewAttachedToWindow(ViewHolder holder) {
            super.onViewAttachedToWindow(holder);
            // TODO: 2017/11/22 layoutmanager
            adapter.onViewAttachedToWindow(holder);
        }

        @Override
        public void onViewDetachedFromWindow(ViewHolder holder) {
            adapter.onViewDetachedFromWindow(holder);
        }

        @Override
        public void onViewRecycled(ViewHolder holder) {
            adapter.onViewRecycled(holder);
        }

        @Override
        public boolean onFailedToRecycleView(ViewHolder holder) {
            return adapter.onFailedToRecycleView(holder);
        }

        @Override
        public void unregisterAdapterDataObserver(AdapterDataObserver observer) {
            adapter.unregisterAdapterDataObserver(observer);
        }

        @Override
        public void registerAdapterDataObserver(AdapterDataObserver observer) {
            adapter.registerAdapterDataObserver(observer);
        }

        private class SimpleViewHolder extends RecyclerView.ViewHolder {
            public SimpleViewHolder(View itemView) {
                super(itemView);
            }
        }
    }
}
