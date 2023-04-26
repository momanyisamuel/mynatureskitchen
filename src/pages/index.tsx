import { type NextPage } from "next";
import { NextPageWithLayout } from './_app';
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import NewCalendar from "@/components/AvailableClasses/AvailableClasses";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Salad } from "lucide-react";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <main className="">
        <div className="items-center justify-center gap-2 pt-5 sm:flex sm:px-8">
          <div className="border bg-atlantis-200 px-5 py-48 text-left sm:w-1/2">
            <h2 className="mb-2 px-8 text-3xl font-bold uppercase">
              Welcome to My natures kitchen
            </h2>
            <p className="px-8 text-lg">
              At My Natures Kitchen LLC we are dedicated to support, encourage
              and help people who are searching for a way to be able to enjoy
              the Whole food plant based lifestyle
            </p>
          </div>
          <div className="relative h-[515px] border object-contain sm:w-1/2">
            <Image src="/assets/mealthree.jpg" alt="mealone" fill />
          </div>
        </div>

        <div className="mt-5 bg-atlantis-200 py-8">
          <div className="flex items-center justify-center">
            <h2>Take a look at some of our classes</h2>
            <Button
              variant="outline"
              className="ml-4 border-atlantis-700 hover:bg-atlantis-700 hover:text-white"
            >
              View our class schedule
            </Button>
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
        <div className="bg-atlantis-300 px-8 py-11 flex gap-4">
          <div className="w-2/6">
            <p>What Our Customers Say</p>
            <p>We can tell you about the amazing things we can do for your business, but we think our customers can tell you better. After all, what they think is what really matters.</p>
          </div>
          <div className="w-4/6">
            <div className=" bg-slate-50 w-[25rem] p-4 shadow-lg">
            <p className="scroll-m-20 text-2xl font-base tracking-tight">
              My Natures Kitchen will be at our final market of the season,
              Sept. 18, 12 pm - 3 pm at Cowles Commons. Leah, the owner, is
              excited to share her love for plant-based cooking and baking with
              you. Give one of her desserts a try - you'll love that there are
              veggies inside!
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
