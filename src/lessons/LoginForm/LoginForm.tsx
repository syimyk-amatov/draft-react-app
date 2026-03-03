import { error } from "console";
import { useReducer } from "react";

type ActionType =
  | { type: "CHANGE_FIELD"; field: string; value: any }
  | { type: "VALIDATE" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" };

interface State {
  email: string;
  password: string;
  errors: { email: string | null; password: string | null };
  isSubmitting: boolean;
  isSuccess: boolean;
}

const initialState: State = {
  email: "",
  password: "",
  errors: { email: null, password: null },
  isSubmitting: false,
  isSuccess: false,
};

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "CHANGE_FIELD":
      return { ...state, [action.field]: [action.value], errors: { ...state.errors, [action.field]: null } };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true };
    case "VALIDATE":
      return {
        ...state,
        errors: {
          email:
            !state.errors.email || /[a-zA-Z_-]+@[a-zA-Z]+\.[a-zA-Z]/.test(state.errors.email) ? null : "Wrong email",
          password: !state.errors.email || state.password.length >= 6 ? null : "Password is too short",
        },
      };
    case "SUBMIT_SUCCESS":
      return { ...state, isSubmitting: false, isSuccess: true };
    default:
      return state;
  }
};

export const LoginForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);


  return <form>
    <div className="field">
      <label>Email</label>
      <input name="email" type="text" />
    </div>
    <div className="field">
      <label>Password</label>
      <input name="password" type="password" />
    </div>
  </form>
};
