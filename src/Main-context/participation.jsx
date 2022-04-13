import React from 'react';

import {
   Form,
   FormGroup,
   Input,
   FormFeedback,
   Button,
   Label,
   CustomInput,
} from 'reactstrap';

class Parcipation extends React.Component {
   state = {
      name: ' ',
      selectedOptions: ' ',
      errors: {},
   };

   handleChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value,
      });
   };

   handleSubmit = (event) => {
      event.preventDefualt();
      const { inValid, errors } = this.valiDate();
      if (inValid) {
         this.props.getOpinios({
            poliId: this.props.poll.id,
            name: this.state.name,
            selectedOptions: this.state.selectedOptions,
         });
         event.target.reset();
         this.setState({ name: ' ', selectedOptions: ' ', errors: ' ' });
      } else {
         return errors;
      }
   };

   valiDate = () => {
      const errors = {};
      const { name, selectedOptions } = this.state;
      if (!name) {
         errors.name = 'Please provide a name';
      } else if (!name.length > 20) {
         errors.name = 'Your name is Long';
      }

      if (!selectedOptions) {
         errors.selectedOptions = 'Please provide a selet options';
      }
      const inValid = Object.keys(errors).length === 0;

      return {
         errors,
         inValid,
      };
   };

   render() {
      return (
         <Form onSubmit={this.handleSubmit}>
            <div className='d-flex'>
               <Button
                  color='danger'
                  onClick={this.props.toggleModal}
                  className='ml-auto'
               >
                  Edit
               </Button>
               <Button
                  color='warning'
                  onClick={() => this.props.deletPoll(this.props.poll.id)}
               >
                  Delete
               </Button>
               {this.props.poll.options.map((opt) => (
                  <FormGroup className='ml-auto' key={opt.id}>
                     <Label className='d-flex'>
                        <CustomInput
                           type='radio'
                           onChange={this.handleSubmit}
                           value={opt.id}
                           id={opt.id}
                           inValid={this.errors ? true : false}
                        />
                        {opt.value}
                        <span
                           style={{
                              padding: '5px 20px',
                              background: 'green',
                              color: ' white',
                           }}
                           className='ml-auto'
                        >
                           {opt.vote}
                        </span>
                        <span
                           style={{
                              padding: ' 5px 20px',
                              background: 'orenge',
                              color: 'white',
                           }}
                        >
                           {this.props.poll.totalVote > 0
                              ? (
                                   (100 * opt.vote) /
                                   this.props.poll.totalVote
                                ).toFixed(2)
                              : 0}
                           %
                        </span>
                     </Label>
                  </FormGroup>
               ))}
               <FormGroup>
                  <Label>Enter your name</Label>
                  <CustomInput
                     type='text'
                     placeholder='tahsin mahi'
                     onChange={this.handleChange}
                     value={this.state.name}
                     invalid={this.state.errors.name ? true : false}
                  />
                  {this.props.name && (
                     <FormFeedback>{this.props.name}</FormFeedback>
                  )}
               </FormGroup>
               <Button color='warning' type='submit'>
                  Submit
               </Button>
            </div>
         </Form>
      );
   }
}
export default Parcipation;
