

import HomePage from '../pages/Home/HomeComponent'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'



// những routers ko cần đăng nhập
const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
      
]
// những routers phải đăng nhập mới gọi API đc.


export default publicRoutes  