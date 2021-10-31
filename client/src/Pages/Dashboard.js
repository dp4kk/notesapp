import React from 'react'
import CreateList from '../Components/CreateList'
import CreateNote from '../Components/CreateNote'
import Display from '../Components/Display'
import EditList from '../Components/EditList'
import EditNote from '../Components/EditNote'
import Sidebar from '../Components/Sidebar'
const Dashboard = () => {
    return (
       <React.Fragment>
        <Sidebar/>
        <CreateNote/>
        <CreateList/>
        <Display/>
        <EditNote/>
        <EditList/>
       </React.Fragment>
    )
}

export default Dashboard
