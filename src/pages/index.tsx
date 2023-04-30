/* eslint-disable react/no-unescaped-entities */
import { type NextPageWithLayout } from './_app';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Salad } from "lucide-react";
import Link from "next/link";
import { Input } from '@/components/ui/input';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <main className="text-atlantis-900">
        <div className="items-center justify-center gap-2 pt-5 sm:flex sm:px-8">
          <div className="mt-14 px-8 py-2 flex flex-col items-center gap-6 text-center sm:mt-0 sm:w-1/2 sm:px-5">
            <p className='uppercase text-base leading-7'>My Natures Kitchen</p>
            <h2 className="mb-2 px-8 text-4xl leading-[43px] font-medium font-serif">
              The time to enjoy the Whole food plant based lifestyle is now.
            </h2>
            <p className="px-8 text-lg">
              Welcome to My Natures Kitchen website. We offer opportunity for
              everyone to enjoy a successful whole food plant-based eating
              lifestyle for a healthier you one step at a time.
            </p>
            <Link href="/classes" className=''>
              <div className="text-lg text-atlantis-50 bg-atlantis-300 w-[28rem] px-2 block py-3">
              <p className='hover:underline'>Upcoming zoom class: Introduction to How Foods Fight Cancer</p>
              </div>
            </Link>
            <div className="">
              <Button variant="outline" className="inline-flex text-lg border-atlantis-900">
                Sign up for our food for life classes
              </Button>
            </div>
          </div>
          <div className="relative sm:flex sm:w-1/2 sm:flex-row sm:justify-end">
            <div className="hidden sm:flex">
              <Image
                src="/assets/mealthree.jpg"
                alt="mealone"
                fill
                className="clip-custom absolute inset-0 h-full w-full object-cover"
                style={{ clipPath: `url(#custom-clip-path)` }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="731"
                height="627"
                fill="none"
                viewBox="0 0 731 627"
              >
                <clipPath id="custom-clip-path">
                  <path
                    fill="#4B931D"
                    d="M722.736 265.529c-1.311 20.11 5.174 40.222 3.303 60.053-7.488 74.578 11.768 172.62-19.118 236.306-13.477 27.931-35.566 32.96-56.532 39.105-95.652 28.769-196.734 25.696-293.885 25.977-58.216.279-116.244-1.396-174.273-4.748-50.541-3.073-90.545 1.953-139.402-18.716C-6.588 582.558-.719 496.528 1.341 438.986c3.37-98.04-.682-196.082 4.371-294.125 2.06-39.943 11.232-121.503 47.734-121.782 88.914-.839 179.888-15.852 268.24-9.427 64.955 4.749 129.909-9.935 195.051-9.656 36.315.278 199.568-25.608 210.238 50.926 9.173 69.27.441 140.496-4.239 210.607Z"
                  />
                </clipPath>
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-5 bg-atlantis-600 py-8 sm:mx-8">
          <div className="flex items-center justify-center">
            <div className="w-2/6"><h2 className='text-atlantis-100'>Join our  email list for a free one week meal plan, nutrition classes and other upcoming events!</h2></div>
            <div className="w-3/6 flex gap-2 justify-end">
            <Input placeholder='Your email address' className='w-4/6 text-atlantis-100' />
            <Button
              variant="outline"
              className="bg-atlantis-100 border-atlantis-100 hover:bg-atlantis-200 w-2/6"
            >
              Subscribe to our newsletter
            </Button>
            </div>
          </div>
        </div>

        <div className="px-8 py-5">
          <div className="mb-8 leading-8">
            <p className="mb-2 pt-2 text-sm font-semibold uppercase">
              Our services
            </p>
            <h2 className="font-base scroll-m-20 text-4xl leading-10 tracking-tight lg:text-5xl">
              At My Natures Kitchen LLC
            </h2>
            <p className="mt-4">
              we are passionate about helping people embrace the Whole Food
              Plant Based lifestyle. Our services are designed to make it easy
              and convenient for you to enjoy delicious and nutritious
              plant-based meals every day. Here are some of the ways we can
              support you:
            </p>
          </div>

          <div className="grid w-full grid-cols-3 gap-4">
            <div className="relative mb-4 border border-t-8 border-atlantis-500 bg-white px-6 py-4 shadow-lg">
              <span className="absolute top-[-28px] inline-flex h-12 w-12 items-center justify-center rounded-full bg-atlantis-500">
                <Salad className="h-8 w-8 text-white" />
              </span>
              <p className="mb-2 pt-2 text-sm font-semibold uppercase">
                Food for Life Classes
              </p>
              <p>
                Our classes are designed to teach you the basics of plant-based
                cooking and nutrition. Whether you're a beginner or an
                experienced cook, we have classes that will help you develop new
                skills and explore new flavors.
              </p>
            </div>
            <div className="relative mb-4 border border-t-8 border-atlantis-500 bg-white px-6 py-4 shadow-lg">
              <span className="absolute top-[-28px] inline-flex h-12 w-12 items-center justify-center rounded-full bg-atlantis-500">
                <Salad className="h-8 w-8 text-white" />
              </span>
              <p className="mb-2 pt-2 text-sm font-semibold uppercase">
                Meal Plans
              </p>
              <p>
                We offer customizable meal plans that are tailored to your
                preferences and dietary needs. Our plans include a variety of
                delicious plant-based meals and snacks that are designed to keep
                you feeling full and satisfied.
              </p>
            </div>

            <div className="relative mb-4 border border-t-8 border-atlantis-500 bg-white px-6 py-4 shadow-lg">
              <span className="absolute top-[-28px] inline-flex h-12 w-12 items-center justify-center rounded-full bg-atlantis-500">
                <Salad className="h-8 w-8 text-white" />
              </span>
              <p className="mb-2 pt-2 text-sm font-semibold uppercase">
                Meal Prep
              </p>
              <p>
                We offer meal prep services at specific locations, making it
                easy for you to enjoy healthy and delicious meals even when
                you're short on time.
              </p>
            </div>
            <div className="relative mb-4 border border-t-8 border-atlantis-500 bg-white px-6 py-4 shadow-lg">
              <span className="absolute top-[-28px] inline-flex h-12 w-12 items-center justify-center rounded-full bg-atlantis-500">
                <Salad className="h-8 w-8 text-white" />
              </span>
              <p className="mb-2 pt-2 text-sm font-semibold uppercase">
                Baked goods
              </p>
              <p>
                We offer a range of baked goods that are made with high-quality
                plant-based ingredients. Our products are available for sale at
                specific locations and are perfect for a quick snack or a
                special treat.
              </p>
            </div>
            <div className="relative mb-4 border border-t-8 border-atlantis-500 bg-white px-6 py-4 shadow-lg">
              <span className="absolute top-[-28px] inline-flex h-12 w-12 items-center justify-center rounded-full bg-atlantis-500">
                <Salad className="h-8 w-8 text-white" />
              </span>
              <p className="mb-2 pt-2 text-sm font-semibold uppercase">
                Easy to follow recipes
              </p>
              <p>
                We provide you with easy-to-follow plant-based recipes that are
                designed to fit your taste and budget. Our recipes are perfect
                for busy weeknights or special occasions.
              </p>
            </div>
            <div className="relative mb-4 border border-t-8 border-atlantis-500 bg-white px-6 py-4 shadow-lg">
              <span className="absolute top-[-28px] inline-flex h-12 w-12 items-center justify-center rounded-full bg-atlantis-500">
                <Salad className="h-8 w-8 text-white" />
              </span>
              <p className="mb-2 pt-2 text-sm font-semibold uppercase">
                Healthiest Cookware
              </p>
              <p>
                We teach you about the healthiest cookware in the world. Our
                experts will help you choose the best cookware for your needs
                and show you how to use it to create delicious and nutritious
                plant-based meals.
              </p>
            </div>
            <div className="relative mb-4 border border-t-8 border-atlantis-500 bg-white px-6 py-4 shadow-lg">
              <span className="absolute top-[-28px] inline-flex h-12 w-12 items-center justify-center rounded-full bg-atlantis-500">
                <Salad className="h-8 w-8 text-white" />
              </span>
              <p className="mb-2 pt-2 text-sm font-semibold uppercase">
                Lunch and Learn
              </p>
              <p>
                We host lunch and learn sessions that are designed to help you
                learn more about plant-based nutrition and cooking. These
                sessions are a great way to meet other people who are passionate
                about healthy eating and to get inspired to try new recipes and
                ingredients.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 bg-atlantis-300 px-8 py-11">
          <div className="w-2/6">
            <p>What Our Customers Say</p>
            <p>
              We can tell you about the amazing things we can do for your
              business, but we think our customers can tell you better. After
              all, what they think is what really matters.
            </p>
          </div>
          <div className="w-4/6">
            <div className=" w-[25rem] bg-slate-50 p-4 shadow-lg">
              <p className="font-base scroll-m-20 text-2xl tracking-tight">
                My Natures Kitchen will be at our final market of the season,
                Sept. 18, 12 pm - 3 pm at Cowles Commons. Leah, the owner, is
                excited to share her love for plant-based cooking and baking
                with you. Give one of her desserts a try - you'll love that
                there are veggies inside!
              </p>
              <p className="pt-8">VegLife Des Moines</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
