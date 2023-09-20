import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";

import { Button } from "semantic-ui-react";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({ setEditMode }: Props) {
  const {
    profileStore: { profile, updateProfile },
  } = useStore();

  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) =>
        updateProfile(values).then(() => {
          setEditMode(false);
        })
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form" autoComplete="off">
          <MyTextInput placeholder="disply Name" name="displayName" />
          <MyTextArea placeholder="Add your bio" name="bio" rows={5} />

          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Update profile"
            type="submit"
            floated="right"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});
