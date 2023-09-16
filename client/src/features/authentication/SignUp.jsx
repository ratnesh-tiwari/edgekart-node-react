import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function SignUp() {
  const { register, handleSubmit, reset, formState } = useForm({});
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          placeholder="Ratnesh Tiwari"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          placeholder="example@gmail.com"
          {...register('email', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          placeholder="Your Password"
          {...register('password', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow
        label="Password Confirm"
        error={errors?.confirmPassword?.message}
      >
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Your Password"
          {...register('confirmPassword', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <Button style={{ width: '100%', marginTop: '0.8rem' }}>Signup</Button>
    </form>
  );
}

export default SignUp;
