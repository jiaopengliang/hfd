import longtou from "@/assets/images/longtou@3x.png";
import longgujia from "@/assets/images/longgujia@3x.png";
import kongzhiren from "@/assets/images/kongzhiren@3x.png";
import ziranren from "@/assets/images/Group@3x.png";
import icon0 from "@/assets/images/circle/0@2x.png";
import icon1 from "@/assets/images/circle/1@2x.png";
import icon2 from "@/assets/images/circle/2@2x.png";
import icon3 from "@/assets/images/circle/3@2x.png";
import icon4 from "@/assets/images/circle/4@2x.png";
import icon5 from "@/assets/images/circle/5@2x.png";
import icon6 from "@/assets/images/circle/6@2x.png";
import icon7 from "@/assets/images/circle/7@2x.png";
import icon8 from "@/assets/images/circle/8@2x.png";
import icon9 from "@/assets/images/circle/9@2x.png";
import icon10 from "@/assets/images/circle/10@2x.png";
import icon11 from "@/assets/images/circle/11@2x.png";
import icon12 from "@/assets/images/circle/12@2x.png";
import icon13 from "@/assets/images/circle/13@2x.png";
import icon14 from "@/assets/images/circle/14@2x.png";
import icon15 from "@/assets/images/circle/15@2x.png";
import icon16 from "@/assets/images/circle/16@2x.png";
import icon17 from "@/assets/images/circle/17@2x.png";
import icon18 from "@/assets/images/circle/18@2x.png";
import icon19 from "@/assets/images/circle/19@2x.png";
import noData from "@/assets/images/icon_empty_wuguanzhu@2x.png";
import noPath from "@/assets/images/icon_empty_wulianxi@2x.png";
import position from "@/assets/images/position.png";
import discredit from "@/assets/images/discredit.png";


const graphNodeIcon = [icon0, icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10, icon11, icon12, icon13, icon14, icon15, icon16, icon17, icon18, icon19];

const graphNode = {
    Top: {
        fillColor: "#FFF",
        radius: 36,
        image: longtou
    },
    Skeleton: {
        fillColor: "#FFF",
        radius: 20,
        image: longgujia
    },
    uboTop: {
        fillColor: "#FFF",
        radius: 16,
        image: kongzhiren
    },
    Nature: {
        fillColor: "#FFF",
        radius: 16,
        image: ziranren
    },
    default: {
        fillColor: "#9DC3FF",
        radius: 10
    }
}

const graphLink = {
    Investment: {
        label: "投资",
        fillColor: "#EDB250"
    },
    Investmented: {
        label: "股东",
        fillColor: "#FF9457"
    },
    Guarantee: {
        label: "增信",
        fillColor: "#63976A"
    },
    Guaranteeed: {
        label: "被增信",
        fillColor: "#93D8CA"
    },
    Hide: {
        label: "高管",
        fillColor: "#C18EE1"
    },
    Control: {
        label: "控制",
        fillColor: "#D15867"
    },
    default: {
        fillColor: "#EEE"
    }
}

const themeColor = '#FE7011';

const apiPath = '/kg-api-hfd';

export { apiPath, graphNode, graphLink, themeColor, graphNodeIcon, noData, noPath, position, discredit}