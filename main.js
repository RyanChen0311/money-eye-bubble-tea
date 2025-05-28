let currentRate = 0; // 即時匯率（1 USD = ? TWD）

// 取得匯率
async function fetchExchangeRate() {
  const rateDisplay = document.getElementById('exchangeRateDisplay');
  rateDisplay.innerText = "📈 匯率 (正在取得...)";
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await response.json();
    const rate = data.rates.TWD;

    if (rate) {
      currentRate = rate;
      rateDisplay.innerText = `📈 匯率 (1 USD = ${rate.toFixed(2)} TWD)`;
    } else {
      rateDisplay.innerText = "❌ 匯率資料無法取得";
    }
  } catch (err) {
    rateDisplay.innerText = "❌ 匯率取得失敗，請檢查網路連線。";
  }
}

// 計算可以買幾杯飲料
function calculate() {
  const usd = parseFloat(document.getElementById('usdInput').value);
  const price = parseFloat(document.getElementById('drinkSelect').value);

  if (isNaN(usd) || usd < 0 || currentRate <= 0) {
    document.getElementById('result').innerText = "⚠️ 請輸入有效金額，並確認匯率已取得。";
    return;
  }
  if (isNaN(price) || price <= 0) {
    document.getElementById('result').innerText = "⚠️ 請選擇有效的飲料價格。";
    return;
  }

  const twd = usd * currentRate;
  const cups = Math.floor(twd / price);
  const change = (twd % price).toFixed(2);

  document.getElementById('result').innerText =
    `✅ 以投入的 ${usd} 美元，可買 ${cups} 杯飲料，剩下 ${change} 元台幣。`;
}

// 重設表單
function reset() {
  document.getElementById('usdInput').value = '';
  document.getElementById('drinkSelect').selectedIndex = 0;
  document.getElementById('result').innerText = '';
}

// 載入時自動取得匯率
window.onload = fetchExchangeRate;
