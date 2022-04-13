import React from "react";
import {Form ,  FormGroup , Input , Button , FormFeedback  , Label} from 'reactstrap';

const MyForm = ({title , deletOption , description , handleChange , handleSubmit , createOption , handleOptionChange ,
   options , errors}) => (
    <Form onSubmit={handleSubmit}>
    <FormGroup>
           <Label for='title'>Title</Label>
         <Input name='title' id='title' value={title} onChange={handleChange} invalid={errors.title ? true : false}/> {title && <FormFeedback>'Okay'</FormFeedback>}
       </FormGroup>
       <FormGroup>
           <Label for='description'>Description</Label>
         <Input name='description' id='description' value={description} onChange={handleChange} invalid={errors.description ? true : false}/> {errors.description && (<FormFeedback>{errors.description}</FormFeedback>)}
       </FormGroup>
       <FormGroup>
       <Button color='success' onClick={createOption} className='mt-2'>Add option</Button>
       {options.map((opt,index) => (
         <div key = {opt.value} className='d-flex my-2'>
             <Input onChange={(e)=>handleOptionChange(e , index)}/> 
           <Button color='danger' onClick={()=>deletOption(index)} disabled={options.length <= 2}>
             Delet 
           </Button>
       </div>
     ))}
     </FormGroup>
     <Button color='danger' type='submit' className='mt-2'>Okay</Button>
     </Form>
)
export default MyForm;