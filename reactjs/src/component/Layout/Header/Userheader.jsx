import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import classNames from 'classnames/bind'
import styles from './Userheader.module.scss'

const cx = classNames.bind(styles)

function UserHeader() {
    return (
        
            <header className={cx('wrapper')} >
            <div className={cx('inner')}>
                <div className={cx('homename')}>
                    <Link to='/'>BEST SELLER</Link>
                </div>
                <div className={cx('seachAction')}>
                    <div className={cx('seachInput')}>
                        <input className={cx('input')} placeholder="Seach User and Product " spellCheck={false} />
                        <button className={cx('seach')}>Seach</button>
                    </div>
                </div>
                <div className={cx('actionUser')}>
                    <button className={cx('logout')}>
                        <Link to='/'>LogOut</Link>
                    </button>
                </div>
            </div>
            </header>
      
    )
}

export default UserHeader