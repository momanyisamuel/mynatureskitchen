import { api } from "@/utils/api";
import { error } from "console";
import { useRouter } from "next/router";
import { ChangeEvent, FC, FormEvent, useState } from "react";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
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
      router.push("/dashboard")
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
            <img src="" alt="" className="h-[36px] w-[120px]" />
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

                  <input
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

                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="input-text block w-full p-3"
                  />
                </div>

                <button className="button btn-primary mt-4 w-full p-3">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
