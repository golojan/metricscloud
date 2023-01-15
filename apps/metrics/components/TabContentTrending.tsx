import React from 'react';
import AllPostFeeds from './AllPostFeeds';
import SlickSlider from './SlickSlider';
import StatusTextBox from './StatusTextBox';
import PostFeed from './PostFeed';

function TabContentTrending() {
  return (
    <div
      className="tab-pane fade show active"
      id="pills-trending"
      role="tabpanel"
      aria-labelledby="pills-trending-tab"
    >
      <div>
        <div className="feeds">{/* <PostFeed /> */}</div>
      </div>
    </div>
  );
}

export default TabContentTrending;
