import { ActionFunction, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import React, { useRef } from "react";
import { supabase } from "~/models/user.server";
import { validateEmail } from "~/utils";

interface ActionData {
  errors?: {
    email?: string;
  };
  message?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");

  console.log(email, validateEmail(email));

  // Ensure the email is valid
  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email is invalid." } },
      { status: 400 }
    );
  }

  // const userExists = await getProfileByEmail(email);
  // console.log(userExists);
  const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
  return json<ActionData>(
    {
      message:
        "An email will be sent if there is an account associated with that address.",
    },
    { status: 200 }
  );
  console.log(data, error);
  // if (userExists) {
  // } else {
  //   return json<ActionData>(
  //     { errors: { email: "Email is not associated with any accounts." } },
  //     { status: 400 }
  //   );
  // }
};

export default function Reset() {
  const actionData = useActionData() as ActionData;
  const emailRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef?.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form className="space-y-6" method="post" noValidate>
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              <span className="block text-gray-700">Email Address</span>
              {actionData?.errors?.email && (
                <span className="block pt-1 text-red-700" id="email-error">
                  {actionData?.errors?.email}
                </span>
              )}
            </label>
            <input
              className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              type="email"
              name="email"
              id="email"
              required
              aria-invalid={actionData?.errors?.email ? true : undefined}
              aria-describedby="email-error"
              ref={emailRef}
            />
          </div>
          {actionData?.message ? (
            <span className="block text-gray-700">{actionData.message}</span>
          ) : (
            <button
              className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
              type="submit"
            >
              Send reset email
            </button>
          )}
        </Form>
      </div>
    </div>
  );
}
