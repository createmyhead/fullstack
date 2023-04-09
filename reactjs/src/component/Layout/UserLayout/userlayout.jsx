import styles from './userlayout.module.scss'
import classNames from 'classnames/bind'
import UserHeader from '../Header/Userheader'
import Sidebar from '../SideBar/Sidebar'

const cx = classNames.bind(styles)

function UserLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <UserHeader />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}> {children}</div>

            </div>
        </div>
    )
}

export default UserLayout