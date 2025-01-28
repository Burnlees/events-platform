"use client";

import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Share2Icon, X } from "lucide-react";
import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

const SocialMedaShare = () => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild aria-label="Share">
          <Button size={"sm"} variant={"outline"}>
            <Share2Icon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between">
              <AlertDialogTitle>Share this event</AlertDialogTitle>
              <AlertDialogCancel asChild>
                <Button size={"icon"} variant={"outline"}>
                  <X />
                </Button>
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>
          <div className="flex justify-center gap-4 py-4">
            <FacebookShareButton url="http://google.com">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url="http://google.com">
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <RedditShareButton url="http://google.com">
              <RedditIcon size={32} round />
            </RedditShareButton>
          </div>
          <Separator />
          <AlertDialogFooter>
            <p className="text-sm">
              With just a few clicks, you can spread the word on Facebook,
              Twitter or Reddit.
            </p>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SocialMedaShare;
