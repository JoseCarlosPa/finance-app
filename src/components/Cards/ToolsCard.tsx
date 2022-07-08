import React, {ReactElement} from 'react'
import {ArrowRight} from "heroicons-react";

interface ToolsCardProps {
  title: string;
  description: string;
  icon: ReactElement<any, any>;
  link: string;
}

const ToolsCard = ({title,description,icon,link}:ToolsCardProps) => {
  return (
    <a href={link} className="hover:scale-105 duration-300">
    <div className="flex w-full">
      <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                <div className="flex flex-col h-40">
                  <h5 className="font-bold">{title}</h5>
                  <p className="mb-3 text-sm">{description}.</p>
                </div>
              </div>
              <div className="max-w-full px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none">
                <div className="h-full bg-gradient-fuchsia rounded-xl">
                  <div className="relative flex items-center justify-center h-full">
                    {icon}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</a>
  );
}
export default React.memo(ToolsCard)