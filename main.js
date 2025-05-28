const bubbleTeaPrice = 55;
let currentRate = 0;

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

function calculate() {
  const usd = parseFloat(document.getElementById('usdInput').value);
  if (isNaN(usd) || usd < 0 || currentRate <= 0) {
    document.getElementById('result').innerText = "⚠️ 請輸入有效金額，並確認匯率已取得。";
    return;
  }

  const twd = usd * currentRate;
  const cups = Math.floor(twd / bubbleTeaPrice);
  const change = (twd % bubbleTeaPrice).toFixed(2);

  document.getElementById('result').innerText =
    `✅ 可以買 ${cups} 杯珍奶，剩下 ${change} 元台幣。`;
}

function reset() {
  document.getElementById('usdInput').value = '';
  document.getElementById('result').innerText = '';
}

window.onload = fetchExchangeRate;
