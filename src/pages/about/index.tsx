import Image from "next/image";
import { type FC } from "react";
import ReactPlayer from "react-player";

const About: FC = ({}) => {
  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center pb-11">
        <div className="">
          <div className="mb-8 px-8">
            <p className="mb-2 px-8 text-center font-serif text-4xl font-medium leading-[43px]">
              My Story
            </p>
            <p className="mt-4 text-center text-lg">
              Leah Atinda has been a vegetarian the whole of her life till 2015
              when she transitioned to vegan/whole food plant-based lifestyle
              due to some healthy struggles after her son was born. She is the
              founder of My Natures Kitchen
            </p>
          </div>
        </div>
        <div className="">
          <Image
            width={935}
            height={100}
            src="/assets/MeatlessMonday.png"
            alt="leahs story photo"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 bg-white px-8 py-11 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <div className="mb-8 px-8">
            <p className="mb-2 text-left font-serif text-4xl font-medium leading-[43px]">
              Food for life instructor
            </p>
            <p className="mt-4 text-left text-lg">
              I am a Licensed Food for Life Instructor with Physicians Committee
              for Responsible Medicine, teaching nutrition and cooking classes
              in my community. I offer both in person and online nutrition and
              cooking classes. I also conduct special events including
              workshops, seminars and food store tours. I am very passionate in
              sharing the plant-based eating lifestyle and on my free time I
              love to work on none plant-based recipes replacing the ingredients
              with plant-based.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <ReactPlayer
            width="100%"
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
