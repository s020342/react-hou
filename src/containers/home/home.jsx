/*
 * @Author: songmingjie 
 * @Date: 2019-03-13 13:30:22 
 * @Last Modified by: songmingjie
 * @Last Modified time: 2019-03-18 13:51:25
 */

import React, { Component } from 'react'
import { Layout, Menu, Icon, message } from 'antd';
import {NavLink} from 'react-router-dom';
import {connect} from 'dva'
import RouterView from '@/router/routerView';
import {getUserInfo} from '@/services/user'
import moment from 'moment'
import "./index.css"
import {setSession,getSession} from '@/utils/index.js'
import routes from '@/router/routes.js';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

const mapState = store => {
    window.store = store;
    return { ...store.userShow }
  }
  @connect(mapState)

 class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: '',
            time:'',
            identity:'',
            flag:true,
            collapsed: false,
            data:[],
            slidebar:{}
        }
     }
    _getUserInfo(){//获取用户信息
        getUserInfo().then(res=>{
          //console.log(res)
          let day=moment(res.data.data.signTime).format('YYYY-MM-DD:HH:MM:SS')
            this.setState({time:day})
            if(res.data.data.identity_text!=='管理员'){
                this.setState({
                    flag:false
                })
                message.error('身份权限不足')
            }
            setSession('identityId',res.data.data.identity_id)
            setSession('userId',res.data.data.user_id)
            this.setState({
                data:res.data.data,
                identity:res.data.data.identity_text
            })
        })
    }
    isLogin(){
        this.setState({user:getSession('user')})
        //console.log(getSession('user'))
        let token=getSession('token')
         if(!token){
              this.props.history.push('/login')
         }
    }
    componentWillReceiveProps(nextProps){
        let slidebar=this.filter(nextProps)
        this.setState({
            slidebar,
        })
      }
      filter(props){
         let {AuthorityRelationList}=props;
        // console.log(AuthorityRelationList)
         let data=this.state.data;
         //console.log(data)
          let rout=routes[1].children
          let dataObj={};
         // console.log(rout)
          AuthorityRelationList.forEach((obj,index)=>{
          for(let i=0;i<rout.length;i++){
              if(data.identity_text===obj.identity_text&&rout[i].title===obj.view_authority_text){
                    let key=rout[i].groupName;
                  dataObj[key]= dataObj[key]?dataObj[key]:[]
                  dataObj[key].push(rout[i])
              }
          }
      })
        return dataObj;
      }
    componentDidMount(){
       this._getUserInfo()
       this.props.dispatch({ type: 'userShow/getAuthorityRelationList' });
       this.isLogin()
    }
   toggle = () => {
    this.setState({
       collapsed: !this.state.collapsed,
     });
   }
   showDeleteConfirm() {
    sessionStorage.clear()
    }  
  render() {
   const {routes}=this.props;
   const {user,time,identity,slidebar}=this.state;
   const subMenu=Object.keys(slidebar)
   const menuItem=Object.values(slidebar)
  // console.log(subMenu,menuItem)
    return (
      <div className="shouye" style={{
       display: 'flex'}}> 
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="home" />
             <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                {
                    subMenu.length && subMenu.map((ele,ind)=>{
                        return  <SubMenu key={"sub"+ind} title={<span><Icon type="team" /><span>{ele}</span></span>}>
                                {
                                    menuItem.length && menuItem[ind].map((item,index)=>{
                                        return <Menu.Item key={index}>
                                        <NavLink to={item.path}>{item.title}</NavLink>
                                    </Menu.Item>
                                    })
                                }
                        </SubMenu>
                    })
                }
            </Menu>
         </Sider>
         <Layout>
          <Header className="header">
             <div className="logo" />
             <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <span className="content">北京八维研修学院</span>
            <span className="content">欢迎亲爱的<b style={{color:'red'}}>{identity}{user}回家!</b>!</span>
            <span className="content">您上次登录的时间是{time}</span>
            <NavLink  to='/login' tag="span" onClick={()=>{
                this.showDeleteConfirm()
            }}>退出</NavLink>
         </Header>
           <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            <RouterView Routes={routes}></RouterView>
          </Content>
        </Layout>
      </div>
    );
  }
}
export default connect()(Home)