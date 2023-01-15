import { AuthUserInfo, IPostComment } from '@metricsai/metrics-interfaces';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { timeAgo } from '../libs/toDate';
import { authToken } from '../hocs/auth/withAuth';
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

const CommentsFeedItem = (props: TCommentFeed) => {
  const token = authToken();

  const { commentInfo } = props;
  const { _id, fromUser, toUser, comment, createdAt } = commentInfo;
  const [userInfo, setUserInfo] = React.useState<AuthUserInfo>({});

  const likePost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    alert(0);
    if (!token)
      return toast.error(`You must be logged in to like`, {
        toastId: 'like-not-logged-in',
      });
    // setBusy(true);
    // const response = await fetch(`/api/posts/like/${post._id}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ token }),
    // });
    // const { status, data } = await response.json();
    // if (status) {
    //   toast.success(`Post liked successfully`, {
    //     toastId: 'post-liked-success',
    //   });
    // } else {
    //   toast.error(`Post like failed, please try again later`, {
    //     toastId: 'post-liked-failed',
    //   });
    // }
    // setBusy(false);
  };

  const dislikePost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!token)
      return toast.error(`You must be logged in to like`, {
        toastId: 'like-not-logged-in',
      });
  };

  const agreePost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!token)
      return toast.error(`You must be logged in to agree`, {
        toastId: 'agree-not-logged-in',
      });
  };

  const disagreePost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!token)
      return toast.error(`You must be logged in to disagree`, {
        toastId: 'disagree-not-logged-in',
      });
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await fromUserInfo(fromUser);
      setUserInfo(user);
    };
    getUserInfo();
  }, []);

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
        <div className="ms-2 small">
          <Link href="#" className="text-dark text-decoration-none">
            <div className="bg-light px-3 py-2 rounded-4 mb-1 chat-text">
              <p className="fw-500 mb-0">{`${userInfo.firstname} ${userInfo.lastname}`}</p>
              <span className="text-muted">{comment}</span>
            </div>
          </Link>
          <div className="d-flex align-items-center ms-2">
            <Link
              href="#"
              className=" text-gray-500  hover:text-blue-800 text-muted text-decoration-none"
              onClick={likePost}
            >
              Like <sup className="text-green-500 font-bold">{0}</sup>
            </Link>
            <span className="fs-3 text-muted material-icons mx-1">circle</span>
            <Link
              href="#"
              className=" text-gray-500 text-decoration-none hover:text-red-600"
              onClick={dislikePost}
            >
              Dislike <sub className="text-red-500 font-bold">{0}</sub>
            </Link>
            <span className="fs-3 text-muted material-icons mx-1">circle</span>
            <Link
              href="#"
              className="text-gray-500  hover:text-blue-800 text-muted text-decoration-none"
              onClick={agreePost}
            >
              Agree <sup className="text-green-500 font-bold">{0}</sup>
            </Link>
            <span className="fs-3 text-muted material-icons mx-1">circle</span>
            <Link
              href="#"
              className=" text-gray-500 text-decoration-none hover:text-red-600"
              onClick={disagreePost}
            >
              Disagree <sub className="text-red-500 font-bold">{0}</sub>
            </Link>

            <span className="fs-3 text-muted material-icons mx-1">circle</span>
            <span className="small text-muted">{timeAgo(createdAt)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsFeedItem;
