import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { type ChangeEvent, type FC, type FormEvent, useState } from "react";



const Login: FC = ({}) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate: login, error } = api.admin.login.useMutation({
    onSuccess:() => {
      void router.push("/dashboard")
    }
  });

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div>
      <div className="container mx-auto flex p-8">
        <div className="mx-auto mt-32 w-full max-w-md">
          <div className="mb-12 flex justify-center font-thin">
            
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow-xl">
            <p className="p-8 text-sm text-red-600">
              {error && "Invalid login credentials"}
            </p>
            <div className="p-8">
              <form method="POST" className="" onSubmit={onFormSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>

                  <Input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    className="block w-full p-3"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>

                  <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="input-text block w-full p-3"
                  />
                </div>

                <Button className="">
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
