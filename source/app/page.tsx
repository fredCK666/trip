"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import type React from "react";
import { useEffect, useState } from "react";
import { BedDouble, Camera, CarTaxiFront, ChevronRight, Clock3, Footprints, Lightbulb, MapPin, Navigation, Plane, ShoppingBag, Sparkles, TrainFront, Utensils } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import type { MapPoint } from "@/components/itinerary-map";

const ItineraryMap=dynamic(()=>import("@/components/itinerary-map"),{ssr:false});

type Kind = "flight" | "train" | "walk" | "taxi" | "food" | "spot" | "hotel" | "shop";
type Stop = { time: string; title: string; detail?: string; kind: Kind; exit?: string };
type Day = { date: string; weekday: string; title: string; area: string; color: string; soft: string; stops: Stop[] };

const days: Day[] = [
  { date:"9/7", weekday:"一", title:"抵達首爾", area:"台中 → 仁川 → 弘大", color:"#ef5b6c", soft:"#fff0f2", stops:[
    {time:"14:50",title:"台中國際機場 T1",detail:"辦理報到、托運與出境",kind:"flight"},{time:"17:30",title:"LJ738 起飛",detail:"飛行約 2 小時 45 分",kind:"flight"},{time:"21:15",title:"仁川機場 T2",detail:"入境、領行李、儲值交通卡",kind:"flight"},{time:"22:40",title:"AREX 普通列車",detail:"仁川 T2 → 弘大入口站",kind:"train",exit:"3號出口"},{time:"23:45",title:"17 Seoul",detail:"辦理入住",kind:"hotel"},{time:"00:10",title:"橋村炸雞弘大店",detail:"步行前往；太晚抵達則改便利商店",kind:"food"}] },
  { date:"9/8", weekday:"二", title:"弘大與首爾夜景", area:"延南洞 → 弘大 → 明洞 → 南山", color:"#f59e42", soft:"#fff6e9", stops:[
    {time:"10:00",title:"Cafe Layered 延南店",detail:"司康與蛋糕早餐",kind:"food"},{time:"11:00",title:"京義線森林公園",detail:"沿公園往弘大方向散步",kind:"walk"},{time:"12:15",title:"Haru Film Yeontral Park",detail:"拍情侶照片",kind:"spot"},{time:"13:00",title:"Musso 弘大店",detail:"烤肉午餐",kind:"food"},{time:"14:10",title:"弘大步行街",detail:"服飾、街頭商店",kind:"shop"},{time:"15:00",title:"AK Plaza 弘大",detail:"公仔、動漫與商場",kind:"shop"},{time:"15:50",title:"Olive Young 弘大 Town",detail:"美妝採買",kind:"shop"},{time:"16:40",title:"搭地鐵 2 號線",detail:"弘大入口站 → 乙支路入口站",kind:"train",exit:"5／6號出口"},{time:"17:15",title:"明洞大教堂",detail:"教堂與階梯拍照",kind:"spot"},{time:"17:45",title:"明洞商圈",detail:"主街、換錢與小吃",kind:"shop"},{time:"19:00",title:"明洞餃子本店",detail:"刀削麵、蒸餃晚餐",kind:"food"},{time:"20:15",title:"南山纜車",detail:"從明洞餃子搭計程車前往",kind:"taxi"},{time:"20:40",title:"N 首爾塔",detail:"夜景、情人鎖與觀景台",kind:"spot"},{time:"22:30",title:"返回弘大住宿",detail:"下山後搭計程車",kind:"taxi"}] },
  { date:"9/9", weekday:"三", title:"宮殿與漢江夕陽", area:"景福宮 → 北村 → 益善洞 → 盤浦", color:"#2b9b78", soft:"#eaf8f2", stops:[
    {time:"09:00",title:"Isaac Toast 弘大店",detail:"簡單早餐",kind:"food"},{time:"09:35",title:"前往景福宮",detail:"2號線至乙支路三街，轉3號線",kind:"train",exit:"韓服4號／宮殿5號出口"},{time:"10:05",title:"韓服男景福宮店",detail:"換韓服、簡單編髮",kind:"spot"},{time:"10:25",title:"景福宮",detail:"勤政殿、慶會樓與香遠亭",kind:"spot"},{time:"12:20",title:"土俗村蔘雞湯",detail:"午餐",kind:"food"},{time:"13:35",title:"北村韓屋村",detail:"從土俗村搭計程車，走平緩路線",kind:"taxi"},{time:"15:00",title:"益善洞韓屋街",detail:"韓屋巷弄與拍照",kind:"spot"},{time:"15:40",title:"清水堂益善店",detail:"下午茶；排隊太久則略過",kind:"food"},{time:"16:20",title:"返回弘大",detail:"鐘路三街5號線，孔德轉AREX",kind:"train",exit:"弘大3號出口"},{time:"17:25",title:"前往盤浦漢江公園",detail:"從住宿搭計程車至 Some Sevit",kind:"taxi"},{time:"18:05",title:"Some Sevit 前方漢江草地",detail:"看夕陽、散步與拍照",kind:"spot"},{time:"19:45",title:"The Margaux Grill",detail:"JW Marriott Seoul 7樓晚餐",kind:"food"},{time:"21:15",title:"返回弘大住宿",detail:"搭計程車",kind:"taxi"}] },
  { date:"9/10", weekday:"四", title:"聖水與江南", area:"聖水洞 → 首爾林 → COEX → 奉恩寺", color:"#4878d0", soft:"#edf3ff", stops:[
    {time:"10:00",title:"Egg Drop 弘大入口店",detail:"早餐",kind:"food"},{time:"10:45",title:"搭地鐵 2 號線",detail:"弘大入口站 → 聖水站",kind:"train",exit:"聖水3號出口"},{time:"11:40",title:"Daelim Changgo",detail:"倉庫風空間與拍照",kind:"spot"},{time:"12:05",title:"Dior Seongsu",detail:"外觀與期間活動",kind:"spot"},{time:"12:30",title:"ADER ERROR Seongsu",detail:"品牌旗艦店",kind:"shop"},{time:"13:05",title:"Musinsa Standard Seongsu",detail:"韓國服飾",kind:"shop"},{time:"13:40",title:"Olive Young N Seongsu",detail:"美妝旗艦店",kind:"shop"},{time:"14:15",title:"聖水馬鈴薯排骨湯",detail:"午餐",kind:"food"},{time:"15:20",title:"Cafe Onion 聖水店",detail:"麵包與下午茶",kind:"food"},{time:"16:20",title:"首爾林",detail:"搭計程車；鏡子池與林蔭道",kind:"taxi"},{time:"17:50",title:"COEX Mall",detail:"從首爾林搭計程車",kind:"taxi"},{time:"18:25",title:"星空圖書館",detail:"中央書牆與二樓拍照",kind:"spot"},{time:"19:15",title:"奉恩寺",detail:"從COEX北側步行前往",kind:"walk"},{time:"20:10",title:"濟州午鮑魚 COEX店",detail:"晚餐",kind:"food"},{time:"21:20",title:"返回弘大",detail:"三成站搭2號線直達",kind:"train",exit:"弘大8／9號出口"}] },
  { date:"9/11", weekday:"五", title:"回台灣", area:"弘大 → 仁川 → 台中", color:"#8b5cc7", soft:"#f5efff", stops:[
    {time:"07:50",title:"起床與最後整理",detail:"確認護照、手機與充電器",kind:"hotel"},{time:"08:20",title:"弘大附近早餐",detail:"吃完回住宿拿行李",kind:"food"},{time:"09:25",title:"17 Seoul 退房",detail:"步行前往弘大入口站",kind:"walk"},{time:"09:50",title:"AREX 普通列車",detail:"弘大入口站 → 仁川機場 T1",kind:"train",exit:"從3號入口進站"},{time:"10:45",title:"仁川機場 T1",detail:"報到、托運、退稅與出境",kind:"flight"},{time:"13:55",title:"TW669 起飛",detail:"仁川 T1 → 台中",kind:"flight"},{time:"16:00",title:"抵達台中國際機場 T2",detail:"台灣時間",kind:"flight"}] },
];

const icons: Record<Kind, typeof Plane> = { flight:Plane, train:TrainFront, walk:Footprints, taxi:CarTaxiFront, food:Utensils, spot:Camera, hotel:BedDouble, shop:ShoppingBag };

const mapPoints:Record<string,MapPoint[]>={
  "9/7":[
    {title:"仁川機場 T2",time:"21:15",lat:37.4602,lng:126.4407},{title:"弘大入口站",time:"23:35",lat:37.5572,lng:126.9254},{title:"17 Seoul",time:"23:45",lat:37.55875,lng:126.92448},{title:"橋村炸雞弘大店",time:"00:10",lat:37.5531,lng:126.9215},
  ],
  "9/8":[
    {title:"Cafe Layered 延南店",time:"10:00",lat:37.5632,lng:126.9237},{title:"京義線森林公園",time:"11:00",lat:37.5647,lng:126.9228},{title:"Haru Film",time:"12:15",lat:37.5617,lng:126.9243},{title:"Musso 弘大店",time:"13:00",lat:37.5557,lng:126.9228},{title:"弘大步行街",time:"14:10",lat:37.5528,lng:126.9219},{title:"AK Plaza 弘大",time:"15:00",lat:37.5571,lng:126.9251},{title:"Olive Young 弘大 Town",time:"15:50",lat:37.5545,lng:126.9222},{title:"明洞大教堂",time:"17:15",lat:37.5632,lng:126.9873},{title:"明洞商圈",time:"17:45",lat:37.5609,lng:126.9856},{title:"明洞餃子本店",time:"19:00",lat:37.5625,lng:126.9857},{title:"南山纜車",time:"20:15",lat:37.5565,lng:126.9839},{title:"N 首爾塔",time:"20:40",lat:37.5512,lng:126.9882},
  ],
  "9/9":[
    {title:"Isaac Toast 弘大店",time:"09:00",lat:37.5537,lng:126.9215},{title:"韓服男景福宮店",time:"10:05",lat:37.5765,lng:126.9732},{title:"景福宮",time:"10:25",lat:37.5796,lng:126.9770},{title:"土俗村蔘雞湯",time:"12:20",lat:37.5774,lng:126.9715},{title:"北村韓屋村",time:"13:35",lat:37.5826,lng:126.9830},{title:"益善洞韓屋街",time:"15:00",lat:37.5742,lng:126.9900},{title:"清水堂益善店",time:"15:40",lat:37.5739,lng:126.9903},{title:"17 Seoul",time:"17:00",lat:37.55875,lng:126.92448},{title:"Some Sevit 漢江草地",time:"18:05",lat:37.5125,lng:126.9950},{title:"The Margaux Grill",time:"19:45",lat:37.5037,lng:127.0048},
  ],
  "9/10":[
    {title:"Egg Drop 弘大入口店",time:"10:00",lat:37.5570,lng:126.9244},{title:"聖水站",time:"11:30",lat:37.5446,lng:127.0560},{title:"Daelim Changgo",time:"11:40",lat:37.5413,lng:127.0565},{title:"Dior Seongsu",time:"12:05",lat:37.5423,lng:127.0556},{title:"ADER ERROR Seongsu",time:"12:30",lat:37.5411,lng:127.0596},{title:"Musinsa Standard",time:"13:05",lat:37.5415,lng:127.0574},{title:"Olive Young N Seongsu",time:"13:40",lat:37.5433,lng:127.0544},{title:"聖水馬鈴薯排骨湯",time:"14:15",lat:37.5429,lng:127.0546},{title:"Cafe Onion 聖水店",time:"15:20",lat:37.5445,lng:127.0580},{title:"首爾林",time:"16:20",lat:37.5444,lng:127.0374},{title:"COEX Mall",time:"17:50",lat:37.5117,lng:127.0592},{title:"星空圖書館",time:"18:25",lat:37.5115,lng:127.0590},{title:"奉恩寺",time:"19:15",lat:37.5150,lng:127.0577},{title:"濟州午鮑魚 COEX店",time:"20:10",lat:37.5118,lng:127.0588},
  ],
  "9/11":[
    {title:"17 Seoul",time:"09:25",lat:37.55875,lng:126.92448},{title:"弘大入口站",time:"09:50",lat:37.5572,lng:126.9254},{title:"仁川機場 T1",time:"10:45",lat:37.4490,lng:126.4510},
  ],
};

const guides: Record<string,{stay:string; do:string; route:string; transport?:string}> = {
  "橋村炸雞弘大店": {stay:"約60分鐘",do:"點蜂蜜原味或無骨炸雞，搭配醃蘿蔔與可樂。",route:"吃完沿楊花路往延南洞方向走回住宿。",transport:"從17 Seoul步行約10–15分鐘；若已超過00:40直接取消。"},
  "Cafe Layered 延南店": {stay:"約50分鐘",do:"司康、季節蛋糕和咖啡；用餐前先拍甜點櫃與店內陳設。",route:"吃完往京義線森林公園方向走，沿公園一路南下。",transport:"從住宿步行約5–10分鐘。"},
  "京義線森林公園": {stay:"約45分鐘",do:"散步、拍林蔭道與鐵道造型景觀，途中可逛延南洞小店。",route:"由延南洞段往弘大入口站方向走，不必折返。",transport:"全段平坦，以步行為主。"},
  "Haru Film Yeontral Park": {stay:"約25分鐘",do:"選簡單淺色背景拍情侶四格照，可先整理頭髮與衣服。",route:"拍完繼續往弘大商圈方向前進。"},
  "弘大步行街": {stay:"約50分鐘",do:"逛韓國服飾、文創小店，傍晚前較不擁擠。",route:"由主街一路往AK Plaza與弘大入口站方向逛。",transport:"與AK Plaza、Olive Young均可步行串聯。"},
  "AK Plaza 弘大": {stay:"約45分鐘",do:"逛動漫、公仔、K-POP與樓層期間店，累了可在商場休息。",route:"逛完由弘大入口站側出口前往Olive Young。"},
  "明洞大教堂": {stay:"約30分鐘",do:"先拍正面階梯，再繞到紅磚側牆；進教堂時保持安靜。",route:"拍完由明洞主街往明洞餃子方向逛。",transport:"乙支路入口站5／6號出口步行約10分鐘。"},
  "明洞商圈": {stay:"約65分鐘",do:"先逛主街與美妝店，再買小吃；伴手禮可先比價。",route:"由明洞大教堂往明洞10街前進，最後抵達明洞餃子。"},
  "N 首爾塔": {stay:"約80分鐘",do:"先在免費觀景平台看夜景，再拍情人鎖與八角亭；有體力再上室內觀景台。",route:"纜車上站→八角亭→情人鎖區→首爾塔→原路回纜車。",transport:"明洞餃子到纜車下部站為上坡，直接搭計程車最輕鬆。"},
  "韓服男景福宮店": {stay:"約20分鐘",do:"挑輕便韓服與簡單編髮，鞋子以好走為主。",route:"換裝後直接步行前往光化門或景福宮入口。",transport:"景福宮站4號出口較靠近租衣店。"},
  "景福宮": {stay:"約85分鐘",do:"依序拍光化門、勤政殿、慶會樓與香遠亭，不必走遍整座宮殿。",route:"光化門→勤政殿→慶會樓→香遠亭→出口。",transport:"直接參觀走景福宮站5號出口；穿韓服通常可免費入場。"},
  "北村韓屋村": {stay:"約65分鐘",do:"拍韓屋屋瓦與巷弄景色，降低音量並避開私人住宅門口。",route:"從較高處往安國站方向下坡，避免反覆爬坡。",transport:"從土俗村搭計程車到北村遊客中心最省體力。"},
  "益善洞韓屋街": {stay:"約40分鐘",do:"逛韓屋改造咖啡廳、飾品與文創店，巷弄很窄要慢慢走。",route:"由鐘路三街站側入口進入，繞一圈後在清水堂休息。"},
  "Some Sevit 前方漢江草地": {stay:"約75分鐘",do:"買飲料、沿漢江散步、看盤浦大橋與夕陽，天黑前拍照最好看。",route:"Some Sevit→河岸草地→月光廣場方向散步。",transport:"從弘大搭計程車約35–50分鐘；下車點設為세빛섬。"},
  "Daelim Changgo": {stay:"約25分鐘",do:"看紅磚倉庫建築與挑高空間，以拍照為主，不需停留太久。",route:"拍完沿延武場路步行前往Dior Seongsu。",transport:"聖水站3號出口開始走最順。"},
  "Dior Seongsu": {stay:"約25分鐘",do:"拍建築外觀並查看當期展覽；需要預約的活動不要現場久等。",route:"接著往ADER ERROR與Musinsa方向走。"},
  "ADER ERROR Seongsu": {stay:"約35分鐘",do:"每層空間裝置都不同，可慢慢逛服飾與拍照。",route:"逛完沿聖水商圈步行至Musinsa Standard。"},
  "首爾林": {stay:"約60分鐘",do:"走鏡子池、林蔭道與草地廣場，鹿園距離較遠可視體力取消。",route:"遊客中心→鏡子池→林蔭道→草地廣場。",transport:"從Cafe Onion搭短程計程車，避免轉車與多走路。"},
  "COEX Mall": {stay:"約35分鐘",do:"先確認星空圖書館、奉恩寺與晚餐位置，避免在商場內迷路。",route:"星空圖書館→COEX北側出口→奉恩寺→回商場晚餐。",transport:"從首爾林搭計程車約20–30分鐘。"},
  "星空圖書館": {stay:"約40分鐘",do:"先拍中央書牆，再搭手扶梯到二樓拍俯視角度。",route:"由中央廣場拍完後往奉恩寺站方向離開商場。"},
  "奉恩寺": {stay:"約45分鐘",do:"參觀大雄殿、燈籠與彌勒大佛；宗教場所保持安靜。",route:"從COEX北側穿過馬路進寺院，參觀後原路回商場。",transport:"靠近奉恩寺站7號出口。"},
};

function Timeline({day,completed,onToggle}:{day:Day;completed:Set<string>;onToggle:(id:string,checked:boolean)=>void}) { return <section className="timeline" style={{"--day":day.color,"--day-soft":day.soft} as React.CSSProperties}>
  <div className="day-heading"><div className="day-number"><span>{day.date}</span><small>星期{day.weekday}</small></div><div><p className="eyebrow">DAY ROUTE</p><h2>{day.title}</h2><p>{day.area}</p></div></div>
  <div className="stops">{day.stops.map((stop,index)=>{const Icon=icons[stop.kind];const guide=guides[stop.title];const id=`${day.date}-${index}-${stop.title}`;const done=completed.has(id);return <article className={`stop ${done?"is-complete":""}`} key={`${stop.time}-${stop.title}`}><time>{stop.time}</time><div className="rail"><span className="marker"><Icon/></span>{index<day.stops.length-1&&<span className="line"/>}</div><div className="stop-card"><div className="stop-main"><div><h3>{stop.title}</h3>{stop.detail&&<p>{stop.detail}</p>}</div><div className="stop-actions">{stop.exit&&<span className="exit"><MapPin/>{stop.exit}</span>}<label className="check-label"><Checkbox className="complete-check" checked={done} onCheckedChange={(value)=>onToggle(id,value===true)} aria-label={`標記${stop.title}為已完成`}/><span>{done?"已完成":"完成"}</span></label></div></div>{guide&&<div className="guide"><div><Clock3/><span><b>建議停留</b>{guide.stay}</span></div><div><Lightbulb/><span><b>到這裡可以</b>{guide.do}</span></div><div><Navigation/><span><b>建議逛法</b>{guide.route}</span></div>{guide.transport&&<div><TrainFront/><span><b>交通細節</b>{guide.transport}</span></div>}</div>}</div></article>})}</div>
  <ItineraryMap points={mapPoints[day.date]??[]} color={day.color}/>
</section> }

export default function Home(){
  const [completed,setCompleted]=useState<Set<string>>(new Set());
  useEffect(()=>{try{const saved=localStorage.getItem("seoul-trip-completed");if(saved)setCompleted(new Set(JSON.parse(saved)));}catch{}},[]);
  const toggle=(id:string,checked:boolean)=>setCompleted(current=>{const next=new Set(current);if(checked)next.add(id);else next.delete(id);try{localStorage.setItem("seoul-trip-completed",JSON.stringify([...next]));}catch{}return next;});
  return <main>
  <header className="hero"><Image src="/trip/assets/funliday-000.jpg" alt="春日首爾南山與N首爾塔" fill priority sizes="100vw"/><div className="hero-shade"/><div className="hero-content"><div className="trip-mark"><Sparkles/> SEOUL 2026</div><h1>首爾五天四夜</h1><p>9月7日 — 9月11日</p><div className="flight-strip"><span><Plane/>台中</span><ChevronRight/><span>首爾</span><span className="flight-code">5 DAYS · 4 NIGHTS</span></div></div></header>
  <section className="planner"><div className="intro"><div><p className="eyebrow">OUR TRIP</p><h2>每天一條清楚動線</h2></div><p>選擇日期，查看當天的時間、交通與出口。</p></div>
    <Tabs defaultValue="9/7" className="trip-tabs"><TabsList className="day-tabs">{days.map(day=><TabsTrigger key={day.date} value={day.date} style={{"--tab":day.color,"--tab-soft":day.soft} as React.CSSProperties}><span>{day.date}</span><small>週{day.weekday}</small></TabsTrigger>)}</TabsList>{days.map(day=><TabsContent key={day.date} value={day.date}><Timeline day={day} completed={completed} onToggle={toggle}/></TabsContent>)}</Tabs>
  </section><footer><MapPin/> Seoul, Korea <span>·</span> 2026.09.07—09.11</footer>
</main>}
