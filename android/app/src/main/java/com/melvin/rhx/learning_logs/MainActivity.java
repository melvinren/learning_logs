package com.melvin.rhx.learning_logs;

import android.app.ActionBar;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;

public class MainActivity extends AppCompatActivity {

    private  ViewPager viewPager;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

//        CrashHandler crashHandler = CrashHandler.getInstance();
//        crashHandler.init(this);

        if(Build.VERSION.SDK_INT >= 21){
            View decorView = getWindow().getDecorView();
            decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
            getWindow().setStatusBarColor(Color.TRANSPARENT);
        }
        setContentView(R.layout.activity_main);

        // init home fragement
//        ReplaceFragment(new HomeFragment());

//        Button goto_topiclist = (Button)findViewById(R.id.goto_topiclist);
//        goto_topiclist.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Intent intent = new Intent(MainActivity.this, TopicListActivity.class);
//                startActivity(intent);
//            }
//        });
//        Button goto_tabs = (Button)findViewById(R.id.goto_tabs);
//        goto_tabs.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Intent intent = new Intent(MainActivity.this, TabsActivity.class);
//                startActivity(intent);
//            }
//        });

        final BottomNavigationView bottomNavigationView = (BottomNavigationView) findViewById(R.id.bottom_navigation);
        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
//                SwitchFragment(item.getItemId());
                SwitchViewPager(item.getItemId());
                item.setChecked(true);
                return false;
            }
        });

        viewPager = (ViewPager)findViewById(R.id.viewpager);
        ViewPagerAdapter adapter = new ViewPagerAdapter(getSupportFragmentManager());
        adapter.addFragment(new HomeFragment());
        adapter.addFragment(new TopicListFragment());
        adapter.addFragment(new AboutFragment());
        viewPager.setAdapter(adapter);

        viewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {
                bottomNavigationView.getMenu().getItem(position).setChecked(true);
            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });
    }

    private void SwitchFragment(int id){
        Fragment fragment = new Fragment();
        switch (id){
            case R.id.action_home:
                fragment = new HomeFragment();
                break;
            case R.id.action_topics:
                fragment = new TopicListFragment();
                break;
            case R.id.action_about:
                fragment = new AboutFragment();
                break;
            default:break;
        }
        ReplaceFragment(fragment);
    }

    private void ReplaceFragment(Fragment fragment){
        FragmentManager supportFragmentManager = getSupportFragmentManager();
        FragmentTransaction transaction = supportFragmentManager.beginTransaction();
        transaction.replace(R.id.fragment_container, fragment);
        transaction.commit();
    }

    private void SwitchViewPager(int id){
        switch (id){
            case R.id.action_home:
                viewPager.setCurrentItem(0);
                break;
            case R.id.action_topics:
                viewPager.setCurrentItem(1);
                break;
            case R.id.action_about:
                viewPager.setCurrentItem(2);
                break;
            default:break;
        }
    }
}
