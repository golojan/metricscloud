import Link from 'next/link';
import React, { RefObject } from 'react';
import { useAtom } from 'jotai';
import {
  profileAtom,
  showUserPostFeedDialogAtom,
} from '@metricsai/metrics-store';
import CommentBox from './Modals/CommentBox';

function StatusTextBox() {
  const [profile] = useAtom(profileAtom);
  const [dialog, setDialog] = useAtom(showUserPostFeedDialogAtom);

  const postFeedInputRef: RefObject<HTMLInputElement> =
    React.useRef<HTMLInputElement>(null);

  const invokePostFeed = (e: React.SyntheticEvent) => {
    if (profile && !dialog) {
      setDialog(true);
    } else {
      postFeedInputRef.current?.blur();
      alert('Please login to post a feed.');
    }
  };

  return (
    <>
      <div className="input-group mb-4 shadow-sm rounded-4 overflow-hidden py-2 bg-white">
        <span className="input-group-text material-icons border-0 bg-white text-primary">
          account_circle
        </span>
        <input
          type="text"
          ref={postFeedInputRef}
          className="form-control border-0 fw-light ps-1"
          placeholder="What's on your mind."
          onClick={invokePostFeed}
        />
        <Link
          href="#"
          className="text-decoration-none input-group-text bg-white border-0 material-icons text-primary"
        >
          add_circle
        </Link>
      </div>

      <CommentBox />
    </>
  );
}

export default StatusTextBox;
