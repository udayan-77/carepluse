"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {CustomFormfield} from './CustomFormfield';
import { useState } from "react";
import SubmitButton from "@/components/ui/forms/SubmitButton";
import { UserFormValidation } from "@/lib/validations";
import { useRouter } from "next/navigation";
export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkBox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

// Updated formSchema to include both username and email
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
});

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      username: "",
      email: "",
      phone: "", // Ensure email is included in defaultValues
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone}: z.infer<typeof UserFormValidation>) {
   setIsLoading(true);

   try{
    //const userData = { name,    email,   phone,  }

    //const user = await createUser(userData);
    //if(user) router.push(`/patients/${user.$id}/register`)
   } catch (error) {
    console.log(error);
   }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋 </h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>

        <CustomFormfield
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="username" // Matches formSchema
          label="Full name"
          placeHolder="udayan pawar" // Correct placeholder spelling
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormfield
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email" // Matches formSchema
          label="Email"
          placeHolder="udayanpawar2@gmail.com" // Placeholder updated for context
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

<CustomFormfield
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone" // Matches formSchema
          label="phone number"
          placeHolder="(+91) 7559263249" // Placeholder updated for context
        />

        <SubmitButton isLoading={isLoading}> Get Started </SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;

