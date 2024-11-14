import InputError from "@/Components/common/inputs/InputError";
import InputLabel from "@/Components/common/inputs/InputLabel";
import PrimaryButton from "@/Components/common/buttons/PrimaryButton";
import TextInput from "@/Components/common/inputs/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import UserAvatar from "@/Components/common/avatars/UserAvatar";

export default function UpdateProfileInformationForm({
  mustVerifyEmail,
  status,
  className = "",
}) {
  const user = usePage().props.auth.user;

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      avatar: null,
      email: user.email,
      _method: "PATCH",
    });

  const submit = (e) => {
    e.preventDefault();

    post(route("profile.update"));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <UserAvatar user={user} profile={true} />
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            isFocused
            autoComplete="name"
          />

          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoComplete="username"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>
        <div>
          <InputLabel htmlFor="email" value="Profile Picture" />

          <input
            type="file"
            id="avatar"
            className="file-input border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300  rounded-md shadow-sm"
            onChange={(e) => setData("avatar", e.target.files[0])}
          />
          <div>
            <small className="text-slate-400">
              Please upload square Picture. Ex: 512px&times;512px
            </small>
          </div>

          <InputError className="mt-2" message={errors.avatar} />
        </div>
        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="text-sm mt-2 text-slate-800 dark:text-slate-200">
              Your email address is unverified.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="underline text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-slate-800"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
