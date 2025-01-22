"use client";

import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

type EventPageSocialShareProps = {
  eventId: number;
};

const EventPageSocialShare = ({ eventId }: EventPageSocialShareProps) => {
    const shareUrl = window.location.origin + `/events/${eventId}`;
    
    

  return (
    <div>
      <div className="flex justify-center gap-4 py-4">
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <RedditShareButton url={shareUrl}>
          <RedditIcon size={32} round />
        </RedditShareButton>
      </div>
    </div>
  );
};

export default EventPageSocialShare;
