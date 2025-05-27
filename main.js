
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>金錢眼球珍珠奶茶</title>
  <style>
    body { margin: 0; font-family: sans-serif; background: #eef; }
    #container { width: 100vw; height: 100vh; overflow: hidden; position: relative; }
    #ui {
      position: absolute;
      top: 20px;
      left: 20px;
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }
    .stat-item { margin: 8px 0; }
    button { margin-top: 10px; padding: 10px 20px; font-weight: bold; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
  <div id="container">
    <div id="ui">
      <div class="stat-item">總美元：$<span id="totalUSD">0</span></div>
      <div class="stat-item">總台幣：NT$<span id="totalNT">0</span></div>
      <div class="stat-item">珍奶杯數：<span id="teaCount">0</span></div>
      <div class="stat-item">珍珠數量：<span id="groundPearls">0</span></div>
      <div class="stat-item">
        投入金額：<input type="number" id="usdAmount" value="1" min="0.01" step="0.01" style="width: 80px;" />
      </div>
      <button id="addMoney">投入美元</button>
      <button id="reset">重置</button>
    </div>
  </div>
  <script type="module" src="main.js"></script>
</body>
</html>
