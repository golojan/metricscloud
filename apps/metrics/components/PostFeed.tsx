import {
  AuthUserInfo,
  IPostComment,
  IPostFeed,
} from '@metricsai/metrics-interfaces';
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { OwnerStatus, UserStatus } from './Status';
import Link from 'next/link';
import { toDayMonth } from '../libs/toDate';
import { authToken } from '../hocs/auth/withAuth';
import { toast } from 'react-toastify';
import CommentsFeedItem from './CommentsFeedItem';
import { Virtuoso } from 'react-virtuoso';
import { Components } from 'react-virtuoso';

import avatar from '/img/rmate2.jpg';

interface PostFeedProps {
  username: string;
  post: IPostFeed;
  isScrolling: boolean;
}

const ProfileInfo = async (username: string) => {
  const response = await fetch(`/api/${username}/profile`);
  const membership = await response.json();
  if (membership.status) {
    return membership.data;
  } else {
    return {};
  }
};

const allComments = async (postFeedId: string) => {
  const response = await fetch(`/api/posts/comments/${postFeedId}/all`);
  const result = await response.json();
  if (result.status) {
    return result.comments;
  } else {
    return {};
  }
};

function PostFeed(props: PostFeedProps) {
  const [busy, setBusy] = useState<boolean>(false);
  const { username, post } = props;
  const [ownerProfile, setOwnerProfile] = React.useState<AuthUserInfo>({});
  const [commentCount, setCommentCount] = React.useState<number>(0);
  const [comments, setComments] = React.useState<IPostComment[]>([]);

  const [loading, setLoading] = useState(false);

  const token = authToken();

  const [currentPosition, setCurrentPosition] = useState(0);
  const [chunkSize] = useState<number>(5);

  const loadMore = () => {
    setCurrentPosition(currentPosition + chunkSize);
  };

  const [postComment, setPostComment] = React.useState<IPostComment>({
    postFeedId: post._id,
    fromUser: token,
    toUser: ownerProfile.username,
  });

  const scrollRef: RefObject<Components['Scroller']> =
    useRef<Components['Scroller']>(null);
  const itemRef: RefObject<Components['Item']> =
    useRef<Components['Item']>(null);

  const commentRef: RefObject<HTMLTextAreaElement> =
    useRef<HTMLTextAreaElement>(null);

  const commentUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (commentRef.current) {
      setPostComment({ ...postComment, comment: e.target.value });
      const height = commentRef.current.scrollHeight;
      commentRef.current.style.height = `${height}px`;
    }
    return;
  };

  const clearComment = () => {
    if (commentRef.current) {
      commentRef.current.value = '';
      commentRef.current.style.height = `10px`;
      commentRef.current.rows = 1;
    }
    return;
  };

  const postCommentHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!postComment.comment) return;
    if (!token)
      return toast.error(`You must be logged in to comment`, {
        toastId: 'comment-not-logged-in',
      });
    setBusy(true);
    const response = await fetch(`/api/posts/comments/add-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postComment),
    });
    const { status, data } = await response.json();
    if (status) {
      toast.success(`Comment created successfully`, {
        toastId: 'comment-created-success',
      });
      clearComment();
    } else {
      toast.error(`Comment creation failed, please try again later`, {
        toastId: 'comment-created-success',
      });
    }
    setBusy(false);
  };

  useEffect(() => {
    const getProfile = async () => {
      const profile = await ProfileInfo(username);
      setOwnerProfile(profile);
    };
    const getComments = async () => {
      const result = await allComments(post._id);
      const _chunkSize = currentPosition + chunkSize;
      const chunk = result.slice(0, _chunkSize);
      setCurrentPosition(_chunkSize);
      setComments(chunk);
      setCommentCount(chunk.length);
    };
    getProfile();
    getComments();
  }, [username, post._id, busy]);

  return (
    <>
      <div className="bg-white p-3 feed-item rounded-4 mb-2 shadow-sm">
        <div className="d-flex">
          <img
            src={ownerProfile.picture || '/img/rmate2.jpg'}
            className="img-fluid rounded-circle user-img"
            alt={ownerProfile.firstname || 'profile-img'}
          />
          <div className="d-flex ms-3 align-items-start w-100">
            <div className="w-100">
              <div className="d-flex align-items-center justify-content-between">
                <Link
                  href="#"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <h6 className="fw-bold mb-0 text-body">
                    {ownerProfile.firstname} {ownerProfile.lastname}
                  </h6>
                  <OwnerStatus username={username} />
                  <small className="text-muted ms-2">
                    @{ownerProfile.username}
                  </small>
                </Link>
                <div className="d-flex align-items-center small">
                  <p className="text-muted mb-0">
                    {toDayMonth(ownerProfile.createdAt)}
                  </p>
                  <div className="dropdown">
                    <Link
                      href="#"
                      className="text-muted text-decoration-none material-icons ms-2 md-20 rounded-circle bg-light hover:bg-green-500 p-1"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      more_vert
                    </Link>
                    {/* <ul
                      className="dropdown-menu fs-13 dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton1"
                    >
                     <li>
                        <a className="dropdown-item text-muted" href="#">
                          <span className="material-icons md-13 me-1">
                            edit
                          </span>
                          Edit
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-muted" href="#">
                          <span className="material-icons md-13 me-1">
                            delete
                          </span>
                          Delete
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-muted" href="#">
                          <span className="material-icons md-13 me-1 ltsp-n5">
                            arrow_back_ios arrow_forward_ios
                          </span>
                          Embed Vogel
                        </a>
                      </li> 
                      <li>
                        <a
                          className="dropdown-item text-muted d-flex align-items-center"
                          href="#"
                        >
                          <span className="material-icons md-13 me-1">
                            share
                          </span>
                          Share Post
                        </a>
                      </li>
                    </ul>*/}
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="my-3">
                  <p className="text-gray-900">{post.content}</p>
                </div>

                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>
                    <Link
                      href="#"
                      className="text-muted text-decoration-none d-flex align-items-start fw-light"
                    >
                      <span className="material-icons md-20 me-2 hover:text-blue-500">
                        thumb_up_off_alt
                      </span>
                      <span>{0}</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="#"
                      className="text-muted text-decoration-none d-flex align-items-start fw-light"
                    >
                      <span className="material-icons md-20 me-2">
                        chat_bubble_outline
                      </span>
                      <span>{commentCount}</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="#"
                      className="text-muted text-decoration-none d-flex align-items-start fw-light"
                    >
                      <span className="material-icons md-20 me-2">repeat</span>
                      <span>{0}</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="#"
                      className="text-muted text-decoration-none d-flex align-items-start fw-light"
                    >
                      <span className="material-icons md-18 me-2">share</span>
                      <span>Share</span>
                    </Link>
                  </div>
                </div>
                <form onSubmit={postCommentHandler}>
                  <div className="d-flex align-items-center mb-3">
                    <span className="material-icons bg-white border-0 text-primary pe-2 md-36">
                      account_circle
                    </span>

                    <textarea
                      className="form-control form-control-sm rounded-3 border-2 fw-light relative"
                      placeholder="Write Your comment (text only)"
                      ref={commentRef}
                      rows={1}
                      onChange={commentUpdate}
                    />
                    <button className="material-icons bg-white border-0 text-gray-300 hover:text-gray-400 pe-2 md-36 me-2 md-16">
                      send
                    </button>
                  </div>
                </form>
                <div className="comments">
                  {comments.slice(0, currentPosition).map((comment) => (
                    <CommentsFeedItem key={comment._id} commentInfo={comment} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostFeed;
