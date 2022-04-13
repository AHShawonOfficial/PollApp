import React from "react";
import {Input , Button , Modal , ModalBody , ModalHeader} from 'reactstrap';
import PollList from "./polls";
import PollForm from "../Polls";
import '../App.css';
class Sidebar extends React.Component{

    state = {
        isOpenPoll : false
    }

    toggleModal = () => {
        this.setState({
            isOpenPoll: !this.state.isOpenPoll
        })
    }
 

    render(){
        return(
          <div style={{background:'#efefef' , padding:'10px'}}>
              <div>
                  <div className='hadodo input.form-control'>
                  <Input placeholder='Serach' value={this.props.serachTerm}
                   onChange={(e)=>this.props.handleSerch(e.target.value)}/>
                  </div>
                  <Button color='success' className='koddos button.koddos.btn.btn-success' onClick={this.toggleModal}>New</Button>
                  <hr/>
                  <h3>App Polls Items</h3>
                  <PollList polls={this.props.polls} selectPoll={this.props.selectPoll}/>
                   <Modal isOpen={this.state.isOpenPoll} toggle={this.toggleModal} unmountOnClose={true}>
                        <ModalHeader toggle={this.toggleModal}>
                            Craete Poll Items
                        </ModalHeader>
                        <ModalBody>
                             <PollForm submit={this.props.addNewPoll}/>
                        </ModalBody>
                   </Modal>
              </div>
          </div>          
        )
    }
}
export default Sidebar;