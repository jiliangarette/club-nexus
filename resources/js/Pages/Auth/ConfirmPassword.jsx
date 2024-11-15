import { useEffect } from "react";
import InputError from "@/Components/common/inputs/InputError";
import InputLabel from "@/Components/common/inputs/InputLabel";
import PrimaryButton from "@/Components/common/buttons/PrimaryButton";
import TextInput from "@/Components/common/inputs/TextInput";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/layout/GuestLayout";

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route("password.confirm"));
  };

  return (
    <GuestLayout>
      <Head title="Confirm Password" />

      <div className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        This is a secure area of the application. Please confirm your password
        before continuing.
      </div>

      <form onSubmit={submit}>
        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            isFocused={true}
            onChange={(e) => setData("password", e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ms-4" disabled={processing}>
            Confirm
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
