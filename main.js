let currentRate = 0;

async function fetchExchangeRate() {
  const rateDisplay = document.getElementById('exchangeRateDisplay');
  rateDisplay.innerText = "📈 匯率 (正在取得...)";

  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();
    currentRate = data.rates.TWD;
    rateDisplay.innerText = `📈 匯率 (1 USD = ${currentRate.toFixed(2)} TWD)`;
  } catch (e) {
    rateDisplay.innerText = "❌ 無法取得匯率，請檢查網路";
  }
}

function calculate() {
  const usd = parseFloat(document.getElementById('usdInput').value);
  const drinkPrice = parseFloat(document.getElementById('drinkSelect').value);
  const resultDiv = document.getElementById('result');

  if (isNaN(usd) || usd <= 0 || currentRate === 0) {
    resultDiv.innerText = "⚠️ 請輸入有效金額並確認匯率";
    return;
  }

  const twd = usd * currentRate;
  const cups = Math.floor(twd / drinkPrice);
  const change = (twd % drinkPrice).toFixed(2);

  resultDiv.innerText = `✅ 可以買 ${cups} 杯，剩下 ${change} 元台幣。`;
}

function reset() {
  document.getElementById('usdInput').value = '';
  document.getElementById('result').innerText = '';
}

// 綁定事件
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('calcBtn').addEventListener('click', calculate);
  document.getElementById('resetBtn').addEventListener('click', reset);
  document.getElementById('reloadBtn').addEventListener('click', fetchExchangeRate);
  fetchExchangeRate();
});
