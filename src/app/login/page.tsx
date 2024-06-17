import { Input } from "@nextui-org/react";
import SubmitButton from "../components/SubmitButton";
import { login } from "../server/actions";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col  p-24 items-center justify-between gap-4">
        <h1 className="">Login</h1>
        <div>
          <form action={login}>
            <Input
              variant="bordered"
              className="p-1"
              type="name"
              label="Username"
              name="username"
              required
            />
            <Input
              variant="bordered"
              className="p-1"
              type="password"
              label="Password"
              name="password"
              required
            />
            <SubmitButton>Login</SubmitButton>
          </form>
        </div>
      </div>
    </main>
  );
}
