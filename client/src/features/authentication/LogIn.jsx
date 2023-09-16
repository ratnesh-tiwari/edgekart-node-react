import Input from '../../ui/Input';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';

function LogIn() {
  const { register, handleSubmit, reset, formState } = useForm({});
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button style={{ width: '100%', marginTop: '0.8rem' }}>Login</Button>
    </form>
  );
}

export default LogIn;
