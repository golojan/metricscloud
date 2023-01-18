import {
  AuthUserInfo,
  IPostComment,
  IUserReactions,
} from '@metricsai/metrics-interfaces';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { timeAgo } from '@metricsai/metrics-utils';
import { authToken } from '@metricsai/metrics-hocs';
import { toast } from 'react-toastify';

type TCommentFeed = {
  commentInfo?: IPostComment;
};

const fromUserInfo = async (token: string) => {
  const response = await fetch(`/api/accounts/${token}/profile`);
  const user = await response.json();
  if (user.status) {
    return user.data;
  } else {
    return {};
  }
};

const getCommentLikes = async (commentId: string) => {
  const response = await fetch(`/api/reactions/comments/${commentId}/likes`);
  const commentLikes = await response.json();
  if (commentLikes.status) {
    return commentLikes.data;
  } else {
    return {};
  }
};

const CommentsFeedItem = (props: TCommentFeed) => {
  const token = authToken();

  const [busy, setBusy] = React.useState(false);

  const { commentInfo } = props;
  const { _id, postFeedId, fromUser, toUser, comment, createdAt } = commentInfo;
  const [userInfo, setUserInfo] = React.useState<AuthUserInfo>({});
  const [likes, setLikes] = React.useState<IUserReactions[]>([]);

  // find if user has liked this post

  const hasLiked = likes.find((like) => like.fromUser === token);

  const likePost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!token)
      return toast.error(`You must be logged in to like`, {
        toastId: 'like-not-logged-in',
      });
    setBusy(true);
    const response = await fetch(`/api/reactions/comments/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postFeedId: postFeedId,
        commentId: _id,
        fromUser: token,
        toUser: fromUser,
      }),
    });
    const { status, like } = await response.json();
    if (status) {
      if (like) {
        // toast.success(`Post liked successfully`, {
        //   toastId: 'post-liked-success',
        // });
      } else {
        // toast.warning(`Post unliked successfully`, {
        //   toastId: 'post-unliked-success',
        // });
      }
    } else {
      toast.error(`Post like failed, please try again later`, {
        toastId: 'post-liked-failed',
      });
    }
    setBusy(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await fromUserInfo(fromUser);
      setUserInfo(user);
    };
    const getAllCommentLikes = async () => {
      const commentLikes = await getCommentLikes(_id);
      setLikes(commentLikes);
    };
    getAllCommentLikes();
    getUserInfo();
  }, [busy]);

  return (
    <>
      <div className="d-flex mb-2" key={_id}>
        <Link href="#" className="text-dark text-decoration-none">
          <img
            src={
              userInfo && userInfo.picture
                ? userInfo.picture
                : '/img/rmate3.jpg'
            }
            className="img-fluid rounded-circle"
            alt="commenters-img"
          />
        </Link>
        <div className="ms-2 ">
          <Link href="#" className="text-dark text-decoration-none">
            <div className="bg-light px-3 py-2 rounded-4 mb-1 chat-text">
              <p className="fw-500 mb-0">{`${userInfo.firstname} ${userInfo.lastname}`}</p>
              <span className="text-muted">{comment}</span>
            </div>
          </Link>
          <div className="d-flex align-items-center ms-3">
            <Link
              href="#"
              className=" text-gray-500  hover:text-blue-800 text-muted text-decoration-none"
              onClick={likePost}
            >
              {hasLiked ? (
                <span className="text-green-500">Liked</span>
              ) : (
                <span className="">Like</span>
              )}{' '}
              <sup className="text-green-500 font-bold">{likes.length}</sup>
            </Link>
            <span className="fs-3 text-muted material-icons mx-2">circle</span>

            <span className="small text-muted">{timeAgo(createdAt)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsFeedItem;
