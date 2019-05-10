import app from '@/app';
import dynamic from 'dva/dynamic';
export const groups = {
  questionsManger:{
      groupName:'试题管理',groupIcon:'user'
  },
  userManger:{
      groupName:'用户管理',groupIcon:'user'
  },
  examManger:{
      groupName:'考试管理',groupIcon:'user'
  },
  gradeManger:{
      groupName:'班级管理',groupIcon:'user'
  },
 menuManger:{
      groupName:'菜单管理',groupIcon:'user'
  }
}

export default [{
  path: "/login",
  component: dynamic({
    app,
    model: [() => import('@/models/login')],
    component: () => import('view/login/index.jsx')//登录
  }),
  title:'登录'
},
 {
  path: '/home',
  component: dynamic({
    app,
    component: () => import('view/home/home.jsx')//主页
  }),
  auth: true,
  title:'主页',
  children:[
    {
      title:'查看试题',
      path: '/home/TestList',
      groupName:groups.questionsManger.groupName,
      component: dynamic({
        app,
        component: () => import('view/home/examTest/testList')
      }),
      auth: true
    },
    {
      title:'添加试题',
      path: '/home/add',
      groupName:groups.questionsManger.groupName,
      component: dynamic({
        app,
        component: () => import('view/home/examTest/addExam')
      }),
      auth: true
    },
    {
      title:'试题分类',
      path: '/home/look',
      groupName:groups.questionsManger.groupName,
      component: dynamic({
        app,
        component: () => import('view/home/examTest/lookExam')
      }),
      auth: true
    },
    {
      title:'用户展示',
      path: '/home/showUser',
      groupName:groups.userManger.groupName,
      component: dynamic({
        app,
        component: () => import('view/home/user/userShow')
      }),
      auth: true
    },
    {
      title:'添加用户',
      path: '/home/addUser',
      groupName:groups.userManger.groupName,
      component: dynamic({
        app,
        component: () => import('view/home/user/addUser')
      }),
      auth: true
    },
    {
      title:'添加Api接口权限',
      path: '/home/addApi',
      groupName:groups.userManger.groupName,
      component: dynamic({
        app,
        component: () => import('view/home/user/addApi')
      }),
      auth: true
    },
    {
      title:'设置身份Api接口',
      path: '/home/addApiAuthorit',
      groupName:groups.userManger.groupName,
      component: dynamic({
        app,
        component: () => import('view/home/user/addApiAuthorit')
      }),
      auth: true
    },
    {
      title:'设置身份视图权限',
      groupName:groups.userManger.groupName,
      path: '/home/addIdentityView',
      component: dynamic({
        app,
        component: () => import('view/home/user/addIdentityView')
      }),
      auth: true
    },
    {
      title:'添加身份',
      groupName:groups.userManger.groupName,
      path: '/home/addTdentity',
      component: dynamic({
        app,
        component: () => import('view/home/user/addTdentity')
      }),
      auth: true
    },
    {
      title:'添加视图接口权限',
      path: '/home/addView',
      groupName:groups.userManger.groupName,
      component: dynamic({
        app,
        component: () => import('view/home/user/addView')
      }),
      auth: true
    },
    {
      title:'添加考试',
      path: '/home/addTest',
      groupName:groups.examManger.groupName,
      component: dynamic({
        app,
        component: () => import('view/home/test/addTest')
      }),
      auth: true
    },
    {
      title:'考试列表',
      path: '/home/testView',
      groupName:groups.examManger.groupName,
      component: dynamic({
        app,
        component: () => import('view/home/test/addTest/testView')
      }),
      auth: true
    },
    {
      title:'试卷列表',
      path: '/home/testLists',
      groupName:groups.examManger.groupName,
      component: dynamic({
        app,
        component: () => import('view/home/test/testLists')
      }),
      auth: true
    },
    //班级管理
    {
      path: '/home/class',
      title: "班级管理",
      groupName:groups.gradeManger.groupName,
      view_id: "main-grade",
      component: dynamic({
          app,
          component: () => import('view/home/room/classRoom')
      })
  },
  {
      path: '/home/room',
      title: "教室管理",
      groupName:groups.gradeManger.groupName,
      view_id: "main-room",
      component: dynamic({
          app,
          component: () => import('view/home/room/rooms')
      })
  },
  {
      path: '/home/student',
      title: "学生管理",
      groupName:groups.gradeManger.groupName,
      view_id: "main-student",
      component: dynamic({
          app,
          component: () => import('view/home/room/student')
      })
  },
  //菜单管理
  {
      path: '/home/addMenu',
      title: "添加菜单",
      groupName:groups.menuManger.groupName,
      view_id: "main-menu",
      component: dynamic({
          app,
          component: () => import('view/home/menu')
      })
  }
  ]
}];
