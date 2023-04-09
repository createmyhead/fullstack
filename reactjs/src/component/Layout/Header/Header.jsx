import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
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
                    <div className={cx('register')}>  
                        <Link style={{ textDecoration: 'none' }} to='/register'>REGISTER</Link>
                    </div>
                    <div  className={cx('login')}>
                        <Link style={{ textDecoration: 'none' }} to='/login'>LOG IN</Link>
                    </div>
                </div>
            </div>
        </header>
      
    )
}

export default Header