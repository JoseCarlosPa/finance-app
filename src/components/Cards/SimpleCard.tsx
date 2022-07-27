import React, {ReactElement} from 'react'

interface SimpleCardProps {
  title: string
  icon: ReactElement<any, any>;
  value: number
  color?: string
}

const SimpleCard = ({title,icon,value,color}:SimpleCardProps) => {
  return (
    <div className="w-full  px-3 mb-6  sm:flex-none xl:mb-0 ">
      <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="flex-auto p-4">
          <div className="flex flex-row -mx-3">
            <div className="flex-none w-2/3 max-w-full px-3">
              <div>
                <p className="mb-0 font-sans font-semibold leading-normal text-size-sm">{title}</p>
                <h5 className="mb-0 font-bold">
                  $ {value.toLocaleString()}
                </h5>
              </div>
            </div>
            <div className="px-3 text-right basis-1/3">
              <div className={`inline-block w-12 h-12 text-center rounded-lg ${color ? color : 'bg-gradient-fuchsia'}  flex h-full items-center justify-center`} >
                {icon}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default React.memo(SimpleCard)