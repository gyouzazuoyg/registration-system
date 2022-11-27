import React from "react";
import { useSelector } from "react-redux";
import {Button, Table} from "antd";
import {Link} from "react-router-dom";

function AppliedList() {
    const {jobs} = useSelector(state=>state.jobsReducer)

    const user =JSON.parse(localStorage.getItem('user'))

    const userAppliedJobs=[]


    for(const job of jobs){

        const appliedCandidates = job.appliedCandidates;

        const temp = appliedCandidates.find(candidate => candidate.userid === user._id);

        if(temp){

            const obj = {
                title: job.title,
                company: job.company,
                appliedDate: temp.appliedDate,
                jobId: <Link to={`/jobs/${job._id}`}><Button>Redirect</Button></Link>,
            };

            userAppliedJobs.push(obj)

        }



    }

    const columns = [
        {
            title : 'Job Title' ,
            dataIndex : 'title'
        },
        {
            title : 'Company' ,
            dataIndex : 'company'
        },{
            title : 'Applied Date' ,
            dataIndex : 'appliedDate'
        },{
            title : 'Link to Job',
            dataIndex : 'jobId'
        }
    ]

    return (
        <div>
                <h1>AppliedJobs</h1>
                <Table columns={columns} dataSource={userAppliedJobs}/>
        </div>
    )
}

export default AppliedList