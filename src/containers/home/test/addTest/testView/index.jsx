import React, { Component } from 'react'

export default class TestView extends Component {
  state={
    end_time:'',
    start_time:'',
    number:'',
    subject_id:'',
    title:'',
    exam_id:''
  }
  componentDidMount(){
    
  }
  render() {
   // const {end_time,start_time,number,subject_id,title,exam_id}=this.props.location.state.data;
   // console.log(title)
    return (
      <div>
        考试列表
        <h2>1111</h2>
        <p>考试时间：1小时30分钟  监考人：刘于       开始考试时间：2018.9.10  10:00  阅卷人：刘于</p>
      </div>
    )
  }
}
