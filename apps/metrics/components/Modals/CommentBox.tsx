import Link from 'next/link';
import React, { RefObject } from 'react';
import {
  profileAtom,
  showUserPostFeedDialogAtom,
} from '@metricsai/metrics-store';
import { useAtom } from 'jotai';
import { hasAuth } from 'apps/metrics/hocs/auth/withAuth';
import Modal from 'react-bootstrap/Modal';
import { PostFeedTypes } from '@metricsai/metrics-interfaces';
import { toast } from 'react-toastify';

type TPostFeed = {
  accountId: string;
  schoolId: string;
  type?: PostFeedTypes;
  post?: string;
};

const CommentBox = () => {
  const [profile] = useAtom(profileAtom);
  const auth = hasAuth();

  const [postFeed, setPostFeed] = React.useState<TPostFeed>({
    accountId: profile._id,
    schoolId: profile.schoolId,
    type: PostFeedTypes.FEED,
    post: '',
  });

  const [dialog, setDialog] = useAtom(showUserPostFeedDialogAtom);
  const [errors, setErrors] = React.useState<string>('');

  const closeDialoge = () => {
    setErrors('');
    setPostFeed({
      ...postFeed,
      post: '',
    });
    setDialog(false);
  };

  const modalReference: RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null);

  const processPostFeed = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrors('');
    const postLenght: number = postFeed.post?.length || 0;
    if (postFeed && postLenght > 10) {
      // post comment to api
      const res = await fetch(`/api/accounts/${profile._id}/create-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postFeed),
      });
      const { status, data } = await res.json();
      if (status) {
        toast.success(`Post created`, {
          toastId: 'post-created-success',
        });
      } else {
        toast.error(`Failed to Create Post`, {
          toastId: 'post-created-success',
        });
      }
      closeDialoge();
    } else {
      setErrors('contents too small for a post...'); // set error message
    }
  };

  return (
    <>
      {auth ? (
        <Modal
          show={dialog}
          onHide={closeDialoge}
          onBackdropClick={closeDialoge}
          backdrop="static"
          keyboard={false}
          tabIndex={-1}
          id="postModal"
          className="fade bg-quaternary"
        >
          <Modal.Dialog centered={true} className="w-full h-full m-0">
            <Modal.Body className="rounded-4 p-4 border-0 bg-light">
              <form onSubmit={processPostFeed}>
                <Modal.Header className="d-flex align-items-center justify-content-start border-0 p-0 mb-3 relative">
                  <Link
                    href="#"
                    className="text-muted text-decoration-none material-icons"
                    onClick={closeDialoge}
                  >
                    arrow_back_ios_new
                  </Link>
                  <Modal.Title
                    className="text-muted ms-3 ln-0"
                    id="staticBackdropLabel"
                  >
                    <span className="material-icons md-32">account_circle</span>
                  </Modal.Title>
                  <h5 className="my-1 mx-2">
                    {profile.firstname} {profile.lastname}
                  </h5>
                  <Link
                    href="#"
                    className="text-muted absolute top-0 right-0 text-decoration-none material-icons"
                    onClick={closeDialoge}
                  >
                    close
                  </Link>
                </Modal.Header>
                <Modal.Body className="p-0 mb-1">
                  <div className="form-floating mb-1">
                    <textarea
                      className="form-control rounded-5 border-0 shadow-sm text-lg pl-4 pt-4"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{ height: 200 }}
                      defaultValue={''}
                      onChange={(e) =>
                        setPostFeed({
                          ...postFeed,
                          post: e.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor="floatingTextarea2"
                      className="h6 text-muted mb-0"
                    >
                      What&apos;s on your mind,{' '}
                      <strong>{profile.firstname}</strong>
                      ...
                    </label>
                  </div>
                  {errors && <div className="text-red-600 ml-1">{errors}</div>}
                </Modal.Body>

                <Modal.Footer className="justify-content-start px-1 py-1 bg-white shadow-sm rounded-5">
                  <div className="rounded-4 m-0 px-3 py-2 d-flex align-items-center justify-content-between w-75">
                    <Link
                      href="#"
                      className="text-muted text-decoration-none material-icons"
                    >
                      insert_link
                    </Link>
                    <Link
                      href="#"
                      className="text-muted text-decoration-none material-icons"
                    >
                      image
                    </Link>
                    <Link
                      href="#"
                      className="text-muted text-decoration-none material-icons"
                    >
                      smart_display
                    </Link>
                    <span className="text-muted">0/500</span>
                  </div>
                  <div className="ms-auto m-0">
                    <button
                      type="submit"
                      className="btn btn-primary rounded-5 fw-bold px-3 py-2 fs-6 mb-0 d-flex align-items-center"
                    >
                      <span className="material-icons me-2 md-16">send</span>
                      Post
                    </button>
                  </div>
                </Modal.Footer>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      ) : null}
    </>
  );
};

export default CommentBox;
