'use client';
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

export default function Share_section({ shareUrl }: { shareUrl: string }) {
  return (
    <div>
      <p className="mb-3 text-center">Share Us </p>
      <div className="flex items-center gap-x-3">
        <div>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
        <div>
          <FacebookMessengerShareButton url={shareUrl} appId="521270401588372">
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
        </div>
        <div>
          <WhatsappShareButton url={shareUrl} title={'title'} separator=":: ">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
}
