import React from "react";
import { FormFeedback } from "reactstrap";
import shortid from "shortid";
import MyForm from "./form";
const defaultOptions = [
    {id : shortid.generate() , value: ' ' , vote : 0 },
    {id : shortid.generate() , value: ' ' , vote : 0 }
]

class PollForm extends React.Component{
    state = {
        title: ' ',
        description : ' ',
        options : defaultOptions,
        errors: {}
    }

   handleChange = (event) => {
       this.setState({
           [event.target.name]:event.target.value
       })
   }

    handleOptionChange = (event , index) => {
        const { options } = this.state
        options[index].value = event.target.value
        this.setState({
            options
        })
    }


    deleteOption = (index) => {
       const {options} = this.state
       if(options.length > 2){
           options.splice(index,1)
           this.setState(options)
       }else{
           alert('You must have list two options')
       }
    }

    createOption = () => {
        const {options} = this.state
        if(options.length < 5){
            options.push({
                id:shortid.generate(),
                value: ' ' , 
                vote: 0 ,
            })
            this.setState({options})
        }else{
            alert('Create later')
        }
    }
    


validate = () => {
    const errors = {}
    const {title , description , options} = this.state

    if(!title){
        errors.title = 'please provide a title'
    }

    if(!description){
     errors.description = 'Pleas erovide a description'
    }

    const optionErrors = []
     options.forEach((opt , index) => {
           if(!opt.value){
              optionErrors[index] = 'This is empty'
           } else if(!opt.value.length > 100){
               optionErrors[index] = 'Options is too long'
           }
        })

        if(optionErrors.length > 0 ){
            errors.options = optionErrors
        }

        return {
            errors,
            isValid : Object.keys(errors).length === 0
        }
    }

    handleSubmit = (event) => {
      event.preventDefualt()
      const {isValid , errors} = this.validate()

      if(isValid){
        const {title , description , options} = this.state
        this.props.submit({
            title, 
            description,
            options
        })
        event.target.reset()
        this.setState({title: ' ' , description : ' ' , options : defaultOptions , errors: {}
     })
      } else {
        this.setState({errors})
      }

    }

    render(){
        const {title , description , options , errors} = this.state
        return(
            <MyForm title={title} description={description} options={options} errors={errors} 
            handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleOptionChange={this.handleOptionChange}
             createOption={this.createOption} deletOption={this.deleteOption}/>             
             )
}
}

export default PollForm;
