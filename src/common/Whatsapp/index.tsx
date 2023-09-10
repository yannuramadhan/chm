import { useEffect, useState } from "react";
import { SvgIcon } from "../SvgIcon";
import { WhatsappContainer } from "./styles";
import { getScroll } from "../utils/getWindow";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = (event: any) => {
    const offsetFromTop = getScroll(event.target, true);

    if (!showScroll && offsetFromTop > 350) {
      setShowScroll(true);
    } else if (offsetFromTop <= 350) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWhatsapp = () => {
    window.open('https://api.whatsapp.com/send/?phone=6287835398068&text&type=phone_number&app_absent=0', '_blank');
  };

  return (
    <WhatsappContainer onClick={getWhatsapp} show={showScroll}>
      <SvgIcon src="WhatsApp.png" width="60px" height="60px" />
    </WhatsappContainer>
  );
};

export default ScrollToTop;
