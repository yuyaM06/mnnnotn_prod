import React from "react";
import { useLocation } from 'react-router-dom';
import { Bar, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// 外部データとしてjsonファイルを定義
// 最終的にはapiを叩きたい
import pwInfoJsonR from "../json/personal_worktime_info_Regular.json";
import pwInfoJsonSP from "../json/personal_worktime_info_SeniorProfession.json";
import pwInfoJsonDC from "../json/personal_worktime_info_DeputyChief.json";

// jsonファイルの配列をchartに渡すための変数
let pwInfo: any

// カラーを用意する。
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const WorkTimeBarChart = (): JSX.Element => {

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
        <h2>あなたのワークスタイル</h2>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart width={800} height={200} data={pwInfo}>
          <XAxis dataKey="date" padding={{ right: 50, left: 50 }} />
          <YAxis
            yAxisId={1}
            domain={[0, 'dataMax + 1']}
            tickCount={8}
            label={{ value: "合計時間 [h]", angle: -90, dx: -20 }}
          />
          <YAxis
            yAxisId={2}
            domain={[0, 'dataMax + 1']}
            tickCount={8}
            orientation="right"
            label={{ value: "全社平均 [h]", angle: 90, dx: 10 }}
          />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar yAxisId={1} dataKey="meetingHours" name="会議" stackId="a" barSize={50} fill="#FF8042"
          />
          <Bar yAxisId={1} dataKey="devHours" name="開発" stackId="a" fill="#FFBB28" />
          <Bar yAxisId={1} dataKey="clericalWorkHours" name="事務作業" stackId="a" fill="#00C49F" />
          <Bar yAxisId={1} dataKey="seminarHours" name="セミナー" stackId="a" fill="#0088FE" />
          <Bar yAxisId={1} dataKey="trainingHours" name="研修" stackId="a" fill="#191970" />
          <Bar yAxisId={1} dataKey="breakTime" name="休憩" stackId="a" fill="#8a2be2" />
          <Line yAxisId={2} dataKey="aveSameOccupation" name="あなたと同じ職種平均" strokeWidth={2} dot={{strokeWidth: 3}}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
export default WorkTimeBarChart;
