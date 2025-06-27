import {useForm} from 'react-hook-form'

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from '../../ui/FormRow';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';


function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
  const {createCabin, isCreating} = useCreateCabin();
  const {editCabin, isEditing} = useEditCabin()
  const isWorking = isCreating || isEditing;

  // data of existing Cabin to be edited
  const {id: editId, ...editValues} = cabinToEdit;

  const isEditSession = Boolean(editId);

  // React Hook Form
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    //can use default values to place already existing data in form to edit
    defaultValues: isEditSession ? editValues : {} 
  });

  const {errors} = formState;


  function onSubmit(data) {
    // check if image is string or an object
    const image = typeof data.image === 'string' ? data.image : data.image[0]

    // use mutate function for edit
    if(isEditSession) editCabin({newCabinData: {...data, image}, id: editId}, {
      onSuccess: () => {
        reset();
        onCloseModal?.();

      }
    })

    // use mutate function for creating new cabin
    else createCabin({...data, image}, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label="Cabin Name" error={errors?.name?.message} >
        <Input type="text" id="name" {...register('name', { // {} is for input validation
            required: 'This field is required',
        })} />
      </FormRow>

      <FormRow label="max Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register('maxCapacity', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Capacity should be at least 1'
          },
        })} />
      </FormRow>
 
      <FormRow label="regularPrice" error={errors?.regularPrice?.message} >
        <Input type="number" id="regularPrice" disabled={isWorking} {...register('regularPrice', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Capacity should be at least 1'
          },
        })} />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message} >
        <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register('discount', {
          required: 'This field is required',
          validate: (value) => value <= getValues().regularPrice || 'Discount should be less than regular price',
        })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message} >
        <Textarea type="number" id="description" disabled={isWorking} defaultValue="" {...register('description', {
          required: 'This field is required',
        })} />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message} >
        <FileInput 
          id="image" 
          accept="image/*" 
          {...register('image', {
          required: isEditSession ? false : 'This field is required',
        })} />
      </FormRow> 

      <FormRow>
        <Button onClick={() => onCloseModal?.()} $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit Cabin' : 'Create new Cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
