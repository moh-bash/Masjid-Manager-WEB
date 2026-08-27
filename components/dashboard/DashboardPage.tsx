import {ReactNode} from "react";

function DashboardPage({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen md:max-w-5xl mx-auto px-3 pb-20 pt-3 md:py-12">
      {children}
    </div>
  )
}

export default DashboardPage
