import { type FC } from 'react'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'



const ClassLoad: FC = ({}) => {
  return <div>
    <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (cookingClass, index) => (
            <div
              key={index}
              className="relative rounded-md border shadow-sm"
            >
              <Button
                type="button"
                className="m-2 bg-red-500 transition-colors duration-300 hover:bg-red-600"
              >
               <Skeleton className="h-5 w-5" />
              </Button>
              <div className="p-4">
                  <div className="">
                    <div className="mb-2">
                      <Skeleton className="h-4 w-6" />
                    </div>
                    <Skeleton className="h-[400px] w-full" />
                  </div>
                
              </div>
            </div>
          ))}
        </div>
  </div>
}

export default ClassLoad