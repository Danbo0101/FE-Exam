import { useEffect, useState } from 'react';
import './DashBoard.scss';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { getDashBoardOverview } from '../../../services/adminServices';
import { toast } from 'react-toastify';


const DashBoard = (props) => {

    const [dataOverView, setDataOverView] = useState([]);
    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        fetchDataOverView();
    }, []);

    const fetchDataOverView = async () => {
        let res = await getDashBoardOverview();

        if (res && res.EC === 0) {
            setDataOverView(res.DT);
            let UT = 0, QZ = 0, QS = 0, AS = 0;
            UT = res?.DT?.users?.total ?? 0;
            QZ = res?.DT?.others?.countQuiz ?? 0;
            QS = res?.DT?.others?.countQuestions ?? 0;
            AS = res?.DT?.others?.countAnswers ?? 0;

            const data = [
                {
                    "name": "Users",
                    "UT": UT,
                },
                {
                    "name": "Quizzes",
                    "QZ": QZ,
                },
                {
                    "name": "Questions",
                    "QS": QS,
                },
                {
                    "name": "Answers",
                    "AS": AS,
                },

            ]
            setDataChart(data)
        }
        else {
            toast.error(res.EM)
        }
    }



    return (
        <div className='dashboard-container'>
            <div className='title'>
                DashBoard
            </div>
            <div className='main'>
                <div className='left-content'>
                    <div className='child'>
                        <span className='child-title'>Total Users</span>
                        <span className='child-data'>
                            {dataOverView && dataOverView.users
                                && dataOverView.users.total ?
                                <>   {dataOverView.users.total}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='child-title'> Total Quizzes</span>
                        <span className='child-data'>
                            {dataOverView && dataOverView.others
                                && dataOverView.others.countQuiz ?
                                <>   {dataOverView.others.countQuiz}</>
                                :
                                <>0</>
                            }
                        </span>

                    </div>
                    <div className='child'>
                        <span className='child-title'> Total Questions</span>
                        <span className='child-data'>
                            {dataOverView && dataOverView.others
                                && dataOverView.others.countQuestions ?
                                <>   {dataOverView.others.countQuestions}</>
                                :
                                <>0</>
                            }
                        </span>

                    </div>
                    <div className='child'>
                        <span className='child-title'>  Total Answers</span>
                        <span className='child-data'>
                            {dataOverView && dataOverView.others
                                && dataOverView.others.countAnswers ?
                                <>   {dataOverView.others.countAnswers}</>
                                :
                                <>0</>
                            }
                        </span>

                    </div>
                </div>

                <div className='right-content'>
                    <ResponsiveContainer width="95%" height="100%">
                        <BarChart data={dataChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <Tooltip />
                            {/* <Legend /> */}
                            <Bar dataKey="UT" fill="#8884d8" />
                            <Bar dataKey="QZ" fill="#82ca9d" />
                            <Bar dataKey="QS" fill="#8884d8" />
                            <Bar dataKey="AS" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>



        </div>
    )
}

export default DashBoard;