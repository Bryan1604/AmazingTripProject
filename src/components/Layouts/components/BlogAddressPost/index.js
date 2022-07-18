import { useState, useEffect, useRef, useContext } from 'react';
import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import moment from 'moment';
import { FaStar } from "react-icons/fa";
import classNames from 'classnames/bind';
import styles from './BlogAddressPost.module.scss';
import ReadMore from '../ReadMore';
import { BlogAddressContext } from '../../../../pages/BlogAddress/BlogAddressContext';
import { CommentContext } from './ReactComment/CommentContext';
import blogAddressPostApi from '../../../../api/blogAddressPostApi';
import commentAddressApi from '../../../../api/commentAddressApi';
import getImage from '../../../../hooks/getImage';
import images from '../../../../assets/images';
import ReactComment from './ReactComment';
import Avatar from '../Avatar';

const cx = classNames.bind(styles);

function BlogAddressPost({ postData, slideShow }) {
    const context = useContext(BlogAddressContext);
    const commentContext = useContext(CommentContext);
    const deleteBtnRef = useRef();

    const [showDelete, setShowDelete] = useState(false);
    const currentValue = parseInt(postData.blog_address_vote);

    const [ava, setAva] = useState('');
    const [blogImg, setBlogImg] = useState('');
    const stars = Array(5).fill(0);

    const avatarData = {
        avatar: ava,
        nickname: postData.nickname,
        id_user: postData.id_user
    };

    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
    };

    const handleDelete = async () => {
        try {
            context.handleResetPostData(postData.blog_address_id);
            blogAddressPostApi.delete(postData.blog_address_id);
            toast.warning('Bài viết đã bị xóa !!!', {
                toastId: 1,
            });
        } catch (error) {
            console.log('Toang meo chay roi loi cc:', error)
        }
    }

    // get Image url from firebase
    useEffect(() => {
        const getImageUrl = async () => {
            if (postData.avatar !== null) {
                const res = await getImage(postData.avatar);
                setAva(res);
            }
            if (postData?.blog_address_image !== null) {
                const res2 = await getImage(postData.blog_address_image);
                setBlogImg(res2);
            }
        }

        getImageUrl();
    }, [])

    // Get Comment Data
    useEffect(() => {
        const fetchCommentList = async () => {
            if (slideShow !== undefined && !slideShow) {
                try {
                    const res = await commentAddressApi.get(postData.blog_address_id);
                    commentContext.setCommentsBlog([...commentContext.commentsBlog, ...res.data]);
                } catch (error) {
                    console.log('Toang meo chay r loi cc ', error)
                }

            }
        }
        fetchCommentList();
    }, []);

    return (
        <div className={cx('feedback-blog')}>
            <div className={cx('user-post')}>
                <div className={cx('user-infor')}>
                    <div className={cx('inf')}>
                        <Avatar
                            src={ava || images.defaultava}
                            size={'50px'}
                            userData={avatarData}
                            placement={'right'}
                        />
                        <h4 className={cx('m-0')}>
                            {postData?.nickname}
                            <br />
                            <span className={cx('date-post')}>
                                {moment(postData.created_at).format('D [tháng] M [năm] YYYY')}
                            </span>
                        </h4>
                    </div>
                    <Tippy
                        theme={'light'}
                        interactive={true}
                        placement={'bottom'}
                        animation={'fade'}
                        arrow={true}
                        allowHTML={true}
                        trigger={'click'}
                        content={(
                            <div className={cx('delete-area')}>
                                {/* Report here */}
                                <button onClick={() => handleDelete()}>
                                    Xóa bài viết
                                </button>
                            </div>
                        )}
                    >
                        <button className={cx('btn-more')} >
                            <i className={cx('fa-solid fa-ellipsis icon-more')}></i>
                        </button>
                    </Tippy>
                </div>
                <div style={{ display: 'flex' }}>
                    {stars.map((_, index) => {
                        return (
                            <FaStar
                                key={index}
                                size={20}
                                color={currentValue > index ? colors.orange : colors.grey}
                                style={{ marginRight: '5' }}
                            />
                        )
                    })}
                </div>
            </div>
            <div className={cx('post-content')}>
                <ReadMore limit={200}>{postData.blog_address_content}</ReadMore>
                <div className={cx('post-img')}>
                    {blogImg &&
                        <img
                            src={blogImg}
                            alt="A image"
                            className={cx('blog-image')}
                        />
                    }
                </div>

                <ReactComment postData={postData} />
            </div>
        </div>
    )
}

export default BlogAddressPost;