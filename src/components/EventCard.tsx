import { format } from "date-fns";
import Link from "next/link";
import { type FC } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export type Event = {
  id: string;
  title: string;
  description: string;
  url: string;
  product: string;
  timestamp: string;
  date: Date;
};

interface EventCardProps {
  classEvent: Event;
}

const EventCard: FC<EventCardProps> = ({ classEvent }) => {
  return (
    <div>
      {" "}
      <div className="mb-5 w-[300px] sm:w-[800px]">
        <div className="relative w-full">
          <div className="relative h-96 w-full overflow-hidden rounded-lg border">
            <Image
              src={classEvent.product}
              alt={classEvent.title}
              className="object-contain"
              fill
            />
          </div>
          <div className="relative mt-4">
            <h3 className="mb-4 font-serif text-3xl font-medium text-atlantis-900">
              {classEvent.title}
            </h3>
            <p className="text-atlantis-900">
              Date: {format(classEvent.date, "yyyy-MM-dd")}
            </p>{" "}
            <p className="text-atlantis-900">Time: {classEvent.timestamp}</p>
            <p className="mt-1 text-lg text-atlantis-900">
              {classEvent.description}
            </p>
          </div>
          <div className="absolute inset-x-0 top-0 flex h-96 items-end justify-end overflow-hidden rounded-lg p-4">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
            />
          </div>
        </div>
        <div className="mt-6">
          <Button
            variant="secondary"
            className="bg-atlantis-500 hover:bg-atlantis-600"
          >
            <Link href={classEvent.url}>
              Register<span className="sr-only">,{classEvent.title}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
