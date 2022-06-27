import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import LeftContent from './LeftContent';

const cx = classNames.bind(styles);

function CreatePost() {
    return ( 
        <div className={cx('body-content')}>
            <div className={cx('left-content')}>
                <LeftContent /> 
            </div>
            <div className={cx('right-content')}>
                <div className={cx('slide-show')}>
                </div>
                <div className={cx('comment')}>
                    <h2> Bình luận gần đây </h2>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;