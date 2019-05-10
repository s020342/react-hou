import React, { Component } from 'react'
import { connect } from 'dva';
import { Input, Button } from 'element-react';
import { InputNumber,DatePicker,message } from 'antd';
import './index.css'
import Select from '@/components/select/select'
import {addTest} from '@/services/test'

const mapState = store => {
    return { ...store.exam }
}
@connect(mapState)
export default class AddTest extends Component {
    state = {
        title:'',
        number:'',
        start_time:'',
        end_time:'',
        subject_id: '',
        exam_id: '' 
    }
    componentDidMount(){
        this.props.dispatch({ type: 'exam/getSubjectList' });
        this.props.dispatch({ type: 'exam/getExamTypeList' });
    }
    setValue = (type,item)=>{
        this.setState(()=>({
            [type]:item
        }))
    }
    onOkStart=(value)=> {
       // console.log('onOk: ', value);
       // console.log(value._d.toLocaleString())
       let str = value._d.toLocaleString();
       if(str.indexOf('上午')){
        let a = str.split("上午").join("").replace(/-/g, '/');
       // console.log(new Date(a).getTime());
        this.setState({
            start_time:new Date(a).getTime()
        })
       }
       if(str.indexOf('下午')){
        let a = str.split("下午").join("").replace(/-/g, '/');
       // console.log(new Date(a).getTime());
        this.setState({
            start_time:new Date(a).getTime()
        })
       }
    }
    onOk=(value)=>{
        //console.log('onOk: ', value);
        //console.log(value._d.toLocaleString())
       let str = value._d.toLocaleString();
       if(str.indexOf('上午')){
        let a = str.split("上午").join("").replace(/-/g, '/');
        //console.log(new Date(a).getTime());
        this.setState({
            end_time:new Date(a).getTime()
        })
       }
       if(str.indexOf('下午')){
          
        let a = str.split("下午").join("").replace(/-/g, '/');
        //console.log(new Date(a).getTime());
        this.setState({
            end_time:new Date(a).getTime()
        })
       }
        
    }
    onChanges=(value)=> {
     //console.log('changed', value);
     this.setState({
         number:value
     })
    }
    submit() {
      const { title,number,start_time,end_time,subject_id,exam_id}=this.state;
  
        addTest({
        title,number,start_time,end_time,subject_id,exam_id
        }).then(res=>{
            //console.log(res)
            if(res.data.code===1){
                message.success('添加考试成功')
                this.props.history.push({
                    pathname:'/home/testView',
                    state:{
                     data:{title,number,start_time,end_time,subject_id,exam_id}   
                    }
                })
            }else{
                message.error(res.data.msg)
            }
        })
      
    }
  render() {
    const { examTypesList, subjectsList} = this.props;
    return (
      <div className='addtest'>
        <h1>添加考试</h1>
        <div className="cont">
            <p>试卷名称</p>
            <Input
            type="text"
            autosize={{ minRows: 2, maxRows: 4 }}
            placeholder="请输入内容"
            onInput={(e) => {
                this.setState({
                    title: e.target.value
                })
            }}
            />
          <div>
          <Select text="请选择考试类型：" id="exam_id" name="exam_name" source={examTypesList} setValue={this.setValue} ></Select>                
          </div>
           <div>
           <Select text="请选择课程类型：" id="subject_id" name="subject_text" source={subjectsList} setValue={this.setValue}></Select>
           </div>
           <div>设置数量</div>
           <div><InputNumber min={1} max={10} defaultValue={0} onChange={this.onChanges} /></div>
           <div>
                <DatePicker showTime placeholder="开始时间"  onOk={this.onOkStart}/>--
                <DatePicker showTime placeholder="结束时间"  onOk={this.onOk}/>
           </div>
             <Button type="primary" onClick={()=>{this.submit()}} id="btn">创建试卷</Button>
        </div>
      </div>
    )
  }
}
