"use client";

import { api } from "@/lib/api/api";

export default function RegistrationForm() {
  return (
    <>
      <form>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
