import InputLabel from "@/Components/common/inputs/InputLabel";
import Modal from "@/Components/common/utilities/Modal";
import SecondaryButton from "@/Components/common/buttons/SecondaryButton";
import UserPicker from "../utilities/UserPicker";
import { useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "../buttons/PrimaryButton";
import { useEventBus } from "@/EventBus";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";
import InputError from "../inputs/InputError";
import TextInput from "../inputs/TextInput";
import TextAreaInput from "../inputs/TextAreaInput";
import { Button } from "@/Components/ui/button";

export default function GroupModal({ show = false, onClose = () => {} }) {
  const page = usePage();
  const conversations = page.props.conversations;
  const { on, emit } = useEventBus();
  const [group, setGroup] = useState({});
  const { data, setData, processing, reset, post, put, errors } = useForm({
    id: "",
    name: "",
    description: "",
    user_ids: [],
  });

  const users = conversations.filter((c) => !c.is_group);

  const createOrUpdateGroup = (e) => {
    e.preventDefault();

    if (group.id) {
      put(route("group.update", group.id), {
        onSuccess: () => {
          closeModal();
          emit("toast.show", `Club: ${data.name} was updated`);
        },
      });
      return;
    }
    post(route("group.store"), {
      onSuccess: () => {
        emit("toast.show", `Club: ${data.name} was created`);
        closeModal();
      },
    });
  };

  const closeModal = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    return on("GroupModal.show", (group) => {
      setData({
        name: group.name,
        description: group.description,
        user_ids: group.users
          .filter((u) => group.owner_id !== u.id)
          .map((u) => u.id),
      });
      setGroup(group);
    });
  }, [on]);

  return (
    <Modal show={show} onClose={closeModal}>
      <form onSubmit={createOrUpdateGroup} className="p-6 overflow-y-auto">
        <h2 className="text-xl font-medium text-slate-900 dark:text-slate-100">
          {group.id ? `Edit Club "${group.name}"` : "Create new Group"}
        </h2>

        <div className="mt-8">
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            disabled={!!group.id}
            onChange={(e) => setData("name", e.target.value)}
            required
            isFocused
          />
          <InputError className="mt-2" message={errors.name} />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="description" value="Description" />
          <TextAreaInput
            id="description"
            rows="3"
            className="mt-1 block w-full"
            value={data.description || ""}
            onChange={(e) => setData("description", e.target.value)}
          />
          <InputError className="mt-2" message={errors.description} />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="description" value="Select Users" />
          <UserPicker
            value={
              users.filter(
                (u) => group.owner_id !== u.id && data.user_ids.includes(u.id)
              ) || []
            }
            options={users}
            onSelect={(users) =>
              setData(
                "user_ids",
                users.map((u) => u.id)
              )
            }
          />

          <InputError className="mt-2" message={errors.user_ids} />
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={closeModal}>
            cancel
          </Button>
          <Button className="ms-3" disabled={processing} type="submit">
            {group.id ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
