import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('views/home/Home');
const Cart = () => import('views/cart/Cart');
const Category = () => import('views/category/Category');
const Profile = () => import('views/profile/Profile');

Vue.use(VueRouter);

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/profile',
        component: Profile
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router ;

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location){
    return routerPush.call(this,location).catch(err => err)
}

const routerReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location){
    return routerReplace.call(this,location).catch(err => err)
}