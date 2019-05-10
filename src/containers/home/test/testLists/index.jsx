import React, { Component } from 'react'
import { connect } from 'dva';
import {  Button } from 'element-react';
import { message } from 'antd';

import Select from '@/components/select/select'
import {TestList} from '@/services/test'

const mapState = store => {
    return { ...store.exam }
}
@connect(mapState)

export default class TestLists extends Component {
    state = {
        subject_id: '',
        exam_id: '' 
    }
    componentDidMount(){
        this.props.dispatch({ type: 'exam/getSubjectList' });
        this.props.dispatch({ type: 'exam/getExamTypeList' });
       // this.props.dispatch({ type: 'addTest/getTestList' });
    }
    setValue = (type,item)=>{
        this.setState(()=>({
            [type]:item
        }))
    }
    
    submit() {
        const {subject_id,exam_id}=this.props;
        TestList({
            params:{
                subject_id,
                exam_id
            }
        }).then(res=>{
            console.log(res)
            if(res.data.code===1){
                message.success('获取试卷列表成功')
            }else{
                message.error(res.data.msg)
            }
        })
    }
  render() {
    const { examTypesList, subjectsList} = this.props;

    return (
      <div className='addtest'>
        <h1>试题列表</h1>
        <div className="cont">
            <div>
          <Select text="请选择考试类型：" id="exam_id" name="exam_name" source={examTypesList} setValue={this.setValue} ></Select>                
          </div>
           <div>
           <Select text="请选择课程类型：" id="subject_id" name="subject_text" source={subjectsList} setValue={this.setValue}></Select>
           </div>
             <Button type="primary" onClick={()=>{this.submit()}} id="btn">查询</Button>
        </div>
       
      </div>
    )
  }
}
