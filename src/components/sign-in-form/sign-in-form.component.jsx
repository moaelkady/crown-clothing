import { useState } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Email and Password are must!");
      return;
    }

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          alert("The email address is not valid.");
          break;
        case "auth/user-disabled":
          alert("The user account has been disabled.");
          break;
        case "auth/user-not-found":
          alert(
            "There is no user corresponding to the email address provided."
          );
          break;
        case "auth/wrong-password":
          alert("The password is incorrect for the provided email address.");
          break;
        case "auth/network-request-failed":
          alert("A network error occurred while trying to sign in.");
          break;
        case "auth/too-many-requests":
          alert(
            "The user has been temporarily blocked from signing in due to too many failed sign-in attempts."
          );
          break;
        case "auth/app-not-authorized":
          alert("The app is not authorized to use Firebase Authentication.");
          break;
        case "auth/internal-error":
          alert(
            "An internal error occurred while trying to authenticate the user."
          );
          break;
        default:
          alert("An unknown error occurred.");
          break;
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="text"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
