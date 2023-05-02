import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Logo from "./ui/Logo";
import { api } from "@/utils/api";
import { useState } from "react";

const Footer: FC = ({}) => {
  const mail = api.cookingClass.sendMail.useMutation()
  const [emailInput, setEmailInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="bg-atlantis-50">
      <div className="flex flex-col px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-5 mt-8">
          <div className="flex items-center justify-start w-[30%]">
            <Logo />
          </div>
          <div className="flex flex-col gap-1 py-5 w-full sm:w-[20%]">
            <Link
              href="/"
              className="text-lg font-medium text-atlantis-900"
            >
              <span className="">Home</span>
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium text-atlantis-900"
            >
              <span className="">About</span>
            </Link>
            <Link
              href="/classes"
              className="text-lg font-medium text-atlantis-900"
            >
              <span className="">Food for life Classes</span>
            </Link>
          </div>
          <div className="flex flex-col gap-1 py-5 w-full sm:w-[20%]">
            <Link
              href="https://www.facebook.com/profile.php?id=100089897072518"
              className="text-lg font-medium text-atlantis-900"
            >
              <span className="">Facebook</span>
            </Link>
            <Link
              href="https://www.youtube.com/@leahatinda8966"
              className="text-lg font-medium text-atlantis-900"
            >
              <span className="">Youtube</span>
            </Link>
            <Link
              href="https://www.instagram.com/mynatureskitchen/"
              className="text-lg font-medium text-atlantis-900"
            >
              <span className="">Instagram</span>
            </Link>
          </div>
          <div className="flex flex-col justify-start w-full sm:w-[50%]">
            <h2 className="font-extrabold mb-2 text-4xl uppercase">Keep in touch</h2>
            <p>Sign up to receive news and updates!</p>

            <div className="flex w-full gap-2">
              <Input placeholder="Your email address" name="email"
                value={emailInput}
                onChange={(e)=> setEmailInput(e.target.value)} className="w-[60%]" />
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  setLoading(true)

                  mail.mutateAsync({email: emailInput}).then((result)=> {
                    if(result.success){
                      setLoading(false)
                      setEmailInput("")
                    }
                  }).catch((error)=>{
                    console.error(error)
                  })
                  
                }}
                className="w-[40%] border-atlantis-100 bg-atlantis-100 hover:bg-atlantis-200"
              >
                
                {
                  loading ? ("sending...") : ( `Subscribe`)
                }
              </Button>
            </div>
          </div>
        </div>
        <div className="text-atlantis-900 mt-8 mb-5">
          <p>© {new Date().getFullYear()} My Natures Kitchen</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
