
import styles from './sidebar.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div>Best Sold</div>
                <div>Best Review</div>
                <div>Best Rate</div>
                <div>Best Seller</div>
                <div>Best Price</div>

            </div>
        </aside>
    )
}

export default Sidebar