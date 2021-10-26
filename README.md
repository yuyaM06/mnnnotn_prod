## 社員の健康管理アプリ~足りない一品をあなたに~
produced by みんなのおとん
このプロジェクトは，ハッカソン型開発演習にて作成したプログラムである．

## 仕様
`yarn start` で実行できる

## 追加でaddしたmodule
**material-ui/core**  
`yarn add @material-ui/core`
`yarn add @material-ui/icons`
`yarn add @material-ui/material`

**recharts**  
`yarn add recharts@1.8.5`  
`yarn add -D @types/recharts`  

**router**
`yarn add react-router-dom`

**react-bootstrap**
`yarn add react-bootstrap`

**redux-form**
`yarn add redux-form`
`yarn add -D @types/redux-form`

**react-loader-spinner**
`yarn add react-loader-spinner`

**react-router-dom**
`npx create-react-app my-app --template redux-typescript`で作成したため，  
typescriptとreduxの一式は既に用意された状態で作成可能



## jsonの内訳
外部データとして，社員（ログインユーザ）の勤務状況をjson形式で取ってくる．

personalinfo_*.json
```
{
  "comment": "総合職（症状該当無しで健康）",
  "gender": "m",
  "position": "Regular",
  "startTime": "9:00",
  "endTime": "17:30",
  "dailyWorkHours": 7.5,
  "teleworkDaysCount": 2,
  "holidaysCount": 1,
  "meetingHours": 1,
  "devHours": 3,
  "clericalWorkHours": 0,
  "seminarHours": 0,
  "trainingHours": 0,
  "breakTime": 0,
  "exerciseHours": 2,
  "steps": 5000,
  "sleepingHours": 7.0
}

```
- comment: jsonデータの説明
- gender: "m"→男性，"f"→女性
- position: "Regular"→総合職，"Profession"→専門職，"DeputyChief"→副主任，"Chief"→主任，"SeniorProfession"→上専，"Senior"→上席，"GM"→GM，"Director"→部長
- startTime: 出勤時刻
- endTime: 退勤時刻
- dailyWorkHours: 業務時間
- teleworkDaysCount: テレワークの日数
- holidaysCount: 休暇取得日数
- meetingHours: 会議参加時間
- devHours: 開発時間
- clericalWorkHours: 事務作業時間
- seminarHours: セミナー参加時間
- trainingHours: 研修参加時間
- breakTime: 休憩時間
- exerciseHours: 運動時間
- steps: 歩数
- sleepingHours: 睡眠時間
