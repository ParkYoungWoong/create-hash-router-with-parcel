import { createHashRouter } from './routerForParcel.js'

createHashRouter({
  // 페이지가 출력될 요소의 선택자!
  el: '#app',
  // 일치하는 페이자가 없을 때 출력할 컴포넌트!
  notFoundComponent: () => import('./pages/PageNotFound.js'), // 동적 import 함수는 꼭 함수에서 반환하도록 사용!
  // 관리하는 페이지들!
  routes: [
    { 
      path: '#/page1', 
      component: () => import('./pages/Page1.js') 
    },
    { 
      path: '#/page2', 
      component: () => import('./pages/Page2.js') 
    },
    { 
      path: '#/page3', 
      component: () => import('./pages/Page3.js') 
    }
  ]
})