import { ReactNode } from "react";

interface LayoutProps {
    children : ReactNode
}

const Layout =  async({children}:LayoutProps) => {
    return(
        <div>
            <div>nav</div>
            {children}
        </div>
    )
}
export default Layout