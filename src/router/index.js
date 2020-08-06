import Vue from 'vue'
import VueRouter from 'vue-router'

//路由懒加载
const Home = () => import('views/Home')
const Index = () => import('views/index/Index')
const Product = () => import('views/Product')
const Detail = () => import('views/Detail')
const Login = () => import('views/Login')
const Register = () => import('views/Register')
const Cart = () => import('views/Cart')
const Order = () => import('views/Order')
const OrderList = () => import('views/OrderList')
const OrderConfirm = () => import('views/OrderConfirm')
const OrderPay = () => import('views/OrderPay')
const Alipay = () => import('views/Alipay')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: Index
      },
      {
        path: '/product/:id',
        component: Product
      },
      {
        path: '/detail/:id',
        component: Detail
      }

    ]
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/order',
    component: Order,
    children: [
      {
        path: 'list',//订单列表
        component: OrderList
      },
      {
        path: 'confirm',//订单确认
        component: OrderConfirm
      },
      {
        path: 'pay',//订单支付
        component: OrderPay
      },
      {
        path: 'alipay',//阿里支付页面
        component: Alipay
      },
    ]
  },
]
const router = new VueRouter({
  routes
})

export default router
