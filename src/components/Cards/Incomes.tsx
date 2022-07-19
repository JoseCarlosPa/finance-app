import React, {ReactElement} from 'react'

interface IncomesProps {
  total: number | string
  title: string
  subtitle: string
  icon: ReactElement<any, any>
  percentage?: boolean
}
const Incomes = ({total,title,subtitle,icon,percentage}:IncomesProps) => {
  return (
    <div className="w-full max-w-full px-3  md:flex-none">
      <div
        className="relative flex flex-col min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
        <div
          className="p-4 mx-6 mb-0 text-center bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
          <div className="flex w-full h-16 text-center bg-center icon bg-gradient-fuchsia shadow-soft-2xl rounded-xl justify-center items-center ">
            {icon}
          </div>
        </div>
        <div className="flex-auto p-4 pt-0 text-center">
          <h6 className="mb-0 text-center">{title}</h6>
          <span className="leading-tight text-size-xs">{subtitle}</span>
          <hr className="h-px my-4 bg-transparent bg-gradient-horizontal-dark"/>
          <h5 className="mb-0">{percentage ? '%' : '$'} {(total).toLocaleString()}</h5>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Incomes)