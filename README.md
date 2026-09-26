# 首爾五天四夜行程

網站：https://fredck666.github.io/trip/

2026 年 9 月 7 日至 11 日的首爾旅行行程作品。由既有網站完整移轉，GitHub Pages 直接提供網站，不再嵌入外部網站。

## 功能
- 五天日期分頁與各日配色
- 行程時間軸、交通方式、地鐵出口與景點說明
- Leaflet / OpenStreetMap 互動地圖、編號地點與路線
- 行程完成勾選，在目前瀏覽器保存
- 手機與桌面排版

## 開發與更新
原始碼位於 `source/`，使用 Next.js、React、TypeScript、Radix UI、Tailwind CSS 和 Leaflet。

```sh
cd source
npm ci
npm run build
```

將 `source/out/` 內容複製到 repository 根目錄，保留 `.nojekyll`，提交至 `main` 即可更新 GitHub Pages。GitHub Pages 使用 main 分支根目錄發布。`basePath` 設為 `/trip`，圖片採靜態輸出。

地圖圖磚由 OpenStreetMap 提供，需要網路連線。完成紀錄只保存在使用者自己的瀏覽器，不會上傳；從舊網址移到新網址時，原瀏覽器紀錄不會自動移轉。
