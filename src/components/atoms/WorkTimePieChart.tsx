import React from "react";
import { useLocation } from 'react-router-dom';
// recharts
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
// 外部データとしてjsonファイルを定義
// 最終的にはapiを叩きたい
import pwInfoJsonR from "../json/personal_worktime_info_Regular.json";
import pwInfoJsonSP from "../json/personal_worktime_info_SeniorProfession.json";
import pwInfoJsonDC from "../json/personal_worktime_info_DeputyChief.json";

// jsonファイルの配列をchartに渡すための変数
let pwInfo: any

// カラーを用意する。
const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE", "#191970"];
// ラベルの位置や内容をカスタマイズ
const renderLabel = ({ name, value }: any) => {
  return name + "：" + value + " [h]";
};

let workSumData = [
  { name: "会議", value: 999 },
  { name: "開発", value: 999 },
  { name: "事務作業", value: 999 },
  { name: "セミナー", value: 999 },
  { name: "研修", value: 999 }
]

const sumWorkTime = (): object[] => {
  const workPattern = 5;                            //勤務内容パターン数
  let data: any[] = new Array(workPattern).fill(0); //勤務内容パターン数に合わせる

  for (let index = 0; index < pwInfo.length; index++) {
    const element = pwInfo[index];
    data[0] += element["meetingHours"];
    data[1] += element["devHours"];
    data[2] += element["clericalWorkHours"];
    data[3] += element["seminarHours"];
    data[4] += element["trainingHours"];
  }

  for (let index = 0; index < workPattern; index++) {
    workSumData[index].value = data[index];
  }

  return workSumData;
};

const WorkTimePieChart = (): JSX.Element => {

  const { state } = useLocation();
  switch(state) {
    case "f1111" :
      pwInfo = pwInfoJsonR.personalinfo
      break
    case "f2222" :
      pwInfo = pwInfoJsonSP.personalinfo
      break
    case "f3333" :
      pwInfo = pwInfoJsonDC.personalinfo
      break
    default:
    pwInfo = pwInfoJsonR.personalinfo
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h2>あなたの勤務時間割合 ~今週の統計~</h2>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart width={400} height={400}>
          <Pie
            data={sumWorkTime()}
            cx="50%"
            cy="45%"
            labelLine={true}
            outerRadius={150}
            fill="#8884d8"
            nameKey="name"  //セクターごとの名前 ≠ 表示名
            dataKey="value"
            label={renderLabel} //表示名
          >
            {workSumData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default WorkTimePieChart;
