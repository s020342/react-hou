/*
 * @Author: mikey.liujiaxu 
 * @Date: 2019-03-14 11:36:04 
 * @Last Modified by: songmingjie
 * @Last Modified time: 2019-03-16 16:11:25
 */
import React, { Component } from 'react'
import { connect } from 'dva';
import 'element-theme-default';
import { Input, Button } from 'element-react';
import "./index.css"
import { questions } from '@/services/exam'
import { message } from 'antd'

import GetQuestions from './getQuestions';
import GetSubject from './getSubject'
import GetExam from './getExam'
const mapState = store => {
    return { ...store.exam }
}
@connect(mapState)
class TestList extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'exam/getSubjectList' });
        this.props.dispatch({ type: 'exam/getExamTypeList' });
        this.props.dispatch({ type: 'exam/getQuestionsTypeList' });
    }
    constructor(props) {
        super(props)
        this.state = {
            questions_type_id: '',
            questions_stem: '',
            subject_id: '',
            exam_id: '',
            user_id: '',
            questions_answer: ''
        }
        this.vals = this.vals.bind(this)
        this.submit = this.submit.bind(this)
    }
    success() {
        message.success('添加成功！', 3);
    };
    submit() {
        let userId = sessionStorage.getItem('userId')
        const { questions_type_id, questions_stem, subject_id, exam_id, questions_answer } = this.state;
        questions({
            title:"11",
            user_id: userId,
            questions_type_id,
            questions_stem,
            subject_id,
            exam_id,
            questions_answer
        }).then(res => {
            if (res.data.code === 1) {
                this.success()
            }
        })
    }
    vals(data) {
        console.log(data)
        if (data.type) {
            this.setState({
                questions_type_id: data.type
            })
        } else if (data.test) {
            this.setState({
                exam_id: data.test
            })
        } else {
            this.setState({
                subject_id: data.subject
            })
        }

    }
    render() {
        const { questionTypesList, examTypesList, subjectsList } = this.props
       // console.log(questionTypesList, examTypesList, subjectsList)
        return (
            <div className="test">
                <h1>添加试题</h1>
                <div className="bot">
                    <p>题干：</p>
                    <Input
                        type="text"
                        autosize={{ minRows: 2, maxRows: 4 }}
                        placeholder="请输入内容"
                        onInput={(e) => {
                            this.setState({
                                questions_stem: e.target.value
                            })
                        }}
                    />
                    <p>答案信息</p>
                    <Input
                        type="text"
                        autosize={{ minRows: 2, maxRows: 4 }}
                        placeholder="请输入内容"
                        onInput={(e) => {
                            this.setState({
                                questions_answer: e.target.value
                            })
                        }}
                    />
                    <GetQuestions
                        val={this.vals}
                        type={'type'}
                        questionTypesList={questionTypesList} />
                    <GetExam
                        val={this.vals}
                        type={'test'}
                        examTypesList={examTypesList} />
                    <GetSubject
                        val={this.vals}
                        type={'class'}
                        subjectsList={subjectsList} />
                    <Button type="primary" onClick={this.submit} id="btn">提交</Button>
                </div>

            </div>
        )
    }
}

export default TestList