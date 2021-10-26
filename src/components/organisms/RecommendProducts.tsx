import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import postProductAction from '../postProductAction';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
// UI
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
// Loading Icon
import Loader from 'react-loader-spinner'
// 健康なワークスタイル用スタンプ（よくできました）
import YokudekiPNG from '../img/yokudeki.png'
// テスト用のjsonファイル
import ProductSample from '../json/products.json';
// DB サーバに投げる症状を分析するやつ
import { getSymptom } from '../getSymptom'
import { Description } from '@material-ui/icons';

// 外部データとしてjsonファイルを定義
// 最終的にはapiを叩きたい
import pwInfoJsonR from "../json/personal_worktime_info_Regular.json";
import pwInfoJsonSP from "../json/personal_worktime_info_SeniorProfession.json";
import pwInfoJsonDC from "../json/personal_worktime_info_DeputyChief.json";

// jsonファイルの配列をまとめて扱うための変数
let pwInfoJson: any

const prodStyle = {
  figure: {
    width: '100%'
  },
  prodName: {
    'font-weight': 'bold',
    fontSize: '24px'
  },
  prodDesc: {
    fontSize: '20px',
  },
  prodPrice: {
    fontSize: '20px',
    'font-weight': 'bold'
  },
  prodRelease: {
    fontSize: '20px',
  },
  prodRegion: {
    fontSize: '16px',
  },
  prodNutrition: {
    fontSize: '16px',
  },
  prodAllergy: {
    fontSize: '16px',
  }
};

const buttonStyle = {
  fontSize: '14px',
  width: '100%'
};

const coutionStyle = {
  title: {
    'font-weight': 'bold',
    fontSize: '18px',
    color: '#ff0000'
  },
  workStyle: {
    'font-weight': 'bold',
    fontSize: '18px'
  },
  symptom: {
    fontSize: '22px',
    'font-weight': 'bold',
    color: '#ff0000'
  },
  niceWorckStyle: {
    fontSize: '24px',
    'font-weight': 'bold',
    color: '#ff0000'
  },
  niceFigure: {
    width: '25vw',
  }
}





// Loadingしている風の時間 [msec]
const loadTime = 2000

// DBサーバ（APIサーバ）に投げる用のdata（post req.body）
const postData = {
  symptom: "睡眠不足"
}



// NULLハンドリング
// ・発売日
// ・商品説明
// ・栄養素（糖質、食物繊維）
const nullCheckDate = (date: string): string => {
  if (date == null) return "好評発売中"
  else {
    const fullDate: string = date.substr(0, 4) + "年" + date.substr(5, 2) + "月" + date.substr(8, 2)
    return fullDate
  }
}
const nullCheckDescription = (description: string): string => {
  if (description == null) return "ぜひお買い求めください。"
  else return description
}
const nullCheckNutrient = (nutrient: Number): Number => {
  if (nutrient == null) return 0
  else return nutrient
}
// DBから返ってくる配列を表示用に成形（insert comma）
// region, allergy
const insertCommaInArray = (array: Array<string>): string => {
  let withCommaString = ""
  let index
  for (index = 0; index < array.length - 1; index++)
    withCommaString += array[index] + ", "
  if (index == 0) withCommaString = "該当なし"
  else withCommaString += array[index]

  return withCommaString
}

// 消費税込み表示用変数（使ってない）
const includeTax = (price: number): number => {
  const tax = 10  //[%]
  const inTaxPrice: number = price * tax / 100
  return inTaxPrice
}

// 仮データ
//総合職（健康）
// symptoms: ["該当なし"]
// worstSymptom: "該当なし"
let workStyleResult = {
  flagArray: {
    earlyFlag: false,
    lateFlag: false,
    longMeetingFlag: false,
    longDevFlag: false,
    irregularWorkingFlag: false,
    teleworkFlag: false,
    overtimeFlag: false,
    lackOfExerciseFlag: false
  },
  isNiceWorkStyle: false,
  symptoms: [""],
  worstSymptom: ""
}

// パーソナル情報に基づく各種フラグをワークスタイルに言語化
const displayWorkStyleList = (flagArray: any): Array<JSX.Element> => {
  const items = []
  if (flagArray.earlyFlag) items.push(<li>朝が早い</li>)
  if (flagArray.lateFlag) items.push(<li>夜遅くまで働いている</li>)
  if (flagArray.longMeetingFlag) items.push(<li>会議時間が多い</li>)
  if (flagArray.longDevFlag) items.push(<li>開発時間が多い</li>)
  if (flagArray.irregularWorkingFlag) items.push(<li>不規則な勤務スタイル</li>)
  if (flagArray.overtimeFlag) items.push(<li>長時間労働</li>)
  if (flagArray.lackOfExerciseFlag) items.push(<li>運動不足</li>)

  return items
}

const RecommendProducts = (): JSX.Element => {

  const { state } = useLocation();
  switch(state) {
    case "f1111" :
      pwInfoJson = pwInfoJsonR
      break
    case "f2222" :
      pwInfoJson = pwInfoJsonSP
      break
    case "f3333" :
      pwInfoJson = pwInfoJsonDC
      break
    default:
    pwInfoJson = pwInfoJsonR
  }

  const dispatch = useDispatch()
  /* 分析ボタン */
  const buttonAlert = async () => {

    // ワークスタイルを元に発症しそうな症状を取得
    workStyleResult = getSymptom(pwInfoJson)
    //console.log(workStyleResult)
    postData.symptom = workStyleResult.worstSymptom
    console.log(postData)

    // await new Promise(resolve => setTimeout(resolve, loadTime)) //loadTimeだけ待つ
    dispatch(postProductAction(postData))

  }

  const productState = useSelector((state: RootState) => state.postProductReducer)

  // state.productShowFlag = false

  return (
    <div style={{margin: '20px'}}>

      <Grid container alignItems="center" justify="center">
        <Grid item xs>
          <Button onClick={buttonAlert} style={buttonStyle} size="small" variant="contained" color="primary">
            あなたのワークスタイルを分析
          </Button>
        </Grid>
      </Grid>

      <br />

      <Box >
        <Grid container spacing={1} style={{ display: productState.productShowFlag ? '' : 'none' }}>
          <Grid item xs>
            {!workStyleResult.isNiceWorkStyle && <p style={coutionStyle.title}>Caution!!</p>}
            {workStyleResult.isNiceWorkStyle && <p style={coutionStyle.title}>おめでとうございます。</p>}
            <p>あなたは<br />
              {!workStyleResult.isNiceWorkStyle &&
                <ul style={coutionStyle.workStyle}>{displayWorkStyleList(workStyleResult.flagArray)}</ul>}
              {workStyleResult.isNiceWorkStyle && <p style={coutionStyle.niceWorckStyle}> 素晴らしく健康 </p>}
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;なワークスタイルのようです。</p>
            <Link to={{ pathname: "/HealthColumnPage", state: insertCommaInArray(workStyleResult.symptoms) }}>詳しく見る。</Link>
          </Grid>


          <Grid item xs style={{ textAlign: "center", display: productState.productShowFlag ? '' : 'none' }}>
            {!workStyleResult.isNiceWorkStyle && <p>このままでは、こんな症状の原因になりそう、、</p>}
            {!workStyleResult.isNiceWorkStyle && <p style={coutionStyle.symptom}>{insertCommaInArray(workStyleResult.symptoms)}</p>}
            {workStyleResult.isNiceWorkStyle && <img src={YokudekiPNG} style={coutionStyle.niceFigure} />}
          </Grid>
        </Grid>
      </Box>


      <Grid container alignItems="center" justify="center">
        <Grid item xs={1} style={{ display: (productState.loadingFlag && !productState.productShowFlag) ? '' : 'none' }}>
          <Loader
            type="Audio"
            color="#191970"
            height={180}
            width={180}
            timeout={loadTime} //loadTimeだけ画面表示
          />
        </Grid>
      </Grid>


      <p style={{ fontSize: '25px', display: productState.productShowFlag ? '' : 'none' }}>
        そんなあなたにオススメの商品は...</p>

      <Box>
        <Grid container spacing={1}
          style={{ border: '2px solid #000000', display: productState.productShowFlag ? '' : 'none' }}>
          <Grid item xs style={{ display: productState.productShowFlag ? '' : 'none' }}>
            <img src={productState.figURL} style={prodStyle.figure} />
          </Grid>

          <Grid item xs style={{ display: productState.productShowFlag ? '' : 'none' }}>
            <p style={prodStyle.prodName}>{productState.prodName}</p>
            <p style={prodStyle.prodDesc}>{nullCheckDescription(productState.description)}</p>
            <p style={prodStyle.prodPrice}>{productState.price} 円（税抜）</p>
            <p style={prodStyle.prodRelease}>発売日：{nullCheckDate(productState.date)}</p>
            <p style={prodStyle.prodRegion}>販売地域：{insertCommaInArray(productState.region)}</p>
            <p style={prodStyle.prodNutrition}>熱量：{nullCheckNutrient(productState.calory)} kcal, タンパク質：{nullCheckNutrient(productState.protein)} g <br />
              脂質：{nullCheckNutrient(productState.lipid)} g, 炭水化物：{nullCheckNutrient(productState.carbonhydrates)} g<br />
              糖質：{nullCheckNutrient(productState.sugar)} g, 食物繊維：{nullCheckNutrient(productState.fiber)} g</p>
            <p style={prodStyle.prodNutrition}>食塩相当量：{nullCheckNutrient(productState.scequiv)} g</p>
            <p style={prodStyle.prodAllergy}>本製品に含まれるアレルギー物質：{insertCommaInArray(productState.allergy)}</p>
          </Grid>
        </Grid>
      </Box>

    </div>
  );
}

export default RecommendProducts;
