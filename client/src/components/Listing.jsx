import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

// const jobListing = [
//   {
//     id: 1,
//     firstName: 'Baby',
//     lastName: 'Shark',
//     phone: '206-123-1234',
//     description: 'dump a couch1',
//     completed: false,
//     pending:false,
//     posterId: 1,
//     fullfillerId: 0
//   },
//   {
//     id: 2,
//     firstName: 'Baby',
//     lastName: 'Shark',
//     phone: '206-123-1234',
//     description: 'dump a couch2',
//     completed: true,
//     pending:false,
//     posterId: 2,
//     fullfillerId: 1
//   },
//   {
//     id: 3,
//     firstName: 'Baby2',
//     lastName: 'Shark2',
//     phone: '206-123-1234',
//     description: 'dump a couch3',
//     completed: false,
//     pending:true,
//     posterId: 1,
//     fullfillerId: 0
//   },
//   {
//     id: 4,
//     firstName: 'Baby3',
//     lastName: 'Shark3',
//     phone: '206-123-1234',
//     description: 'dump a couch4',
//     completed: true,
//     pending:false,
//     posterId: 1,
//     fullfillerId: 2
//   },
//   {
//     id: 5,
//     firstName: 'Baby4',
//     lastName: 'Shark4',
//     phone: '206-123-1234',
//     description: 'dump a couch5',
//     completed: false,
//     pending:false,
//     posterId: 1,
//     fullfillerId: 0
//   },
// ]
const Listing = ({currentUser, jobListing, setCurrentJob, currentJob, getList}) => {
  const [modal, setModal] = useState(false);
  // const [jobListing, setJobListing] = useState([]);
  // const [currentJob, setCurrentJob] = useState({});

  useEffect(() => {
    getList();
  },[currentJob]);

  // const getList = () => {
  //   axios.get(`/jobs`)
  //   .then((data)=>setJobListing(data.data))
  //   .catch((err) => console.log(err));
  // }

  const showModal = (event, job) => {
    setModal(true);
    setCurrentJob(job);
  };

  const hideModal = () => {
    setModal(false);
  };

  return (
    <div className="jobs">
      <h2>Open Jobs</h2>
      {jobListing.map((job) => {
           if(!job.completed && !job.pending && job.posterid!==currentUser.id) {
             return <div className="job" key={job.id} onClick={(e) => showModal(e, job)}>{`${job.jobdescription}`}</div>
           }
        })}
      <h2>Pending Jobs</h2>
      {jobListing.map((job) => {
           if(job.pending === true) {
             return <div className="job" key={job.id} onClick={(e) => showModal(e, job)}>{`${job.jobdescription}`}</div>
           }
        })}
      <h2>Requests History</h2>
      {jobListing.map((job) => {
           if(job.posterid === currentUser.id) {
             return <div className="job" key={job.id}>{`${job.jobdescription}`}</div>
           }
        })}
      <Modal currentJob={currentJob} setCurrentJob={setCurrentJob} show={modal} handleClose={hideModal} currentUser={currentUser} />
    </div>
  )
};

export default Listing;