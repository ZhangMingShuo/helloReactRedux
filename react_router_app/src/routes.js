import Home from './pages/home/Home'
import About from './pages/about/About'
import Topics from './pages/topics/Topics'
import Topic from './pages/topics/Topic'
import NotFount from './pages/common/NotFound'


const routes = [
  {path: '/', component: Home, exact: true},
  {path: '/home', component: Home},
  {path: '/about', component: About},
  {
    path: '/topics',
    component: Topics,
    children: [
      {path: '/topics/html', component: Topic},
      {path: '/topics/css', component: Topic},
      {path: '/topics/javascript', component: Topic}
    ]
  },
  {path: '*', component: NotFount}
]

export default routes
