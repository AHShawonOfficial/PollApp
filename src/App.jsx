import React from "react";
import Sidebar from "./Sidebar";
import POLLS from './data/polls'
import MainContent from "./Main-context/Main";
import {Container , Row , Col} from 'reactstrap';

import shortid from 'shortid'
class App extends React.Component{

   state = {
       polls : [],
       selectedPoll : {},
       SerchTerm : ' ',

   }
     
   componentDidMount = () => {
       this.setState({polls : POLLS})
   }

   addNewPoll = (poll) => {
       poll.id = shortid.generate() 
       poll.created = new Date()
       poll.totalVote = 0 
       poll.opinions = []
       
       this.setState({
           polls:this.state.polls.concat(poll)
       })
   }

   updatePoll = (updatedPoll) => {
       const polls = [...this.state.polls]
       const poll = polls.find((p)=>p.id===updatedPoll.id)

       poll.title = updatedPoll.title
       poll.description = updatedPoll.description
       poll.options = updatedPoll.options

       this.setState({polls})
   }

   deletePoll = (pollId) => {
     const polls = this.state.polls.filter(p=>p.id!==pollId)
     this.setState({polls , selectedPoll: {}})
   }

   selectPoll = (pollId) => {
       const poll = this.state.polls.find(p=>p.id === pollId)
       this.setState({selectPoll  : poll })
   }

   handleSerch = () => {

   }

    render(){
        return(
           <Container>
               <Row>
                   <Col md={4}>
                <Sidebar polls={this.state.polls} selectPoll={this.selectPoll} SerchTerm={this.state.SerchTerm} 
                handleSerch={this.handleSerch} addNewPoll={this.addNewPoll}/>
                   </Col>
                   <Col md={8}>
                <MainContent/>
                   </Col>
               </Row>
           </Container>
        )
    }
}
export default App;