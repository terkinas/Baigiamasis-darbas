// "use client"
// import dynamic from 'next/dynamic'

// import useWindow from "@/hooks/useWindow";
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

// const LazyMobileHeader = dynamic(() => import('./MobileHeader'))
// const LazyDesktopHeader = dynamic(() => import('./DesktopHeader'))



export const HeaderLayout = () => {

    // const { isMobile } = useWindow() ?? { isMobile: undefined };

    // return typeof isMobile !== 'undefined' ? (
    //     <>
    //         {isMobile ? <LazyMobileHeader /> : <LazyDesktopHeader />}
    //     </>
    // ) : null

    return (
        <>
            <MobileHeader /> 
            <DesktopHeader />
        </>
    )
    
  }

export default HeaderLayout;