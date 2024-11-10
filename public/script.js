// 當滑鼠移動時觸發水波漣漪效果
document.addEventListener('mousemove', function(e) {
    // 創建水波漣漪的div元素
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    // 計算漣漪的開始位置
    ripple.style.left = `${e.clientX - 50}px`;  // 50 是圓形漣漪的半徑
    ripple.style.top = `${e.clientY - 50}px`;

    // 將漣漪元素添加到頁面
    document.body.appendChild(ripple);

    // 設定漣漪動畫的時間，1秒後刪除漣漪元素
    setTimeout(() => {
        ripple.remove();
    }, 1000);
});

// 這裡是你其他原本的 JavaScript 代碼部分
// 例如，處理表單提交、按鈕點擊等操作

// 假設你有一個提交表單的功能
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止默認表單提交行為
    const name = document.querySelector('#name').value;
    const studentId = document.querySelector('#student-id').value;
    const equipment = document.querySelector('#equipment').value;
    const quantity = document.querySelector('#quantity').value;
    const returnDate = document.querySelector('#return-date').value;
    const rentalDate = document.querySelector('#rental-date').value;

    // 這裡可以添加保存數據的邏輯，例如將數據發送到後端
    console.log('表單提交數據：', {
        name,
        studentId,
        equipment,
        quantity,
        returnDate,
        rentalDate
    });

    // 提交後顯示確認或清空表單
    alert('表單已成功提交！');
    // 清空表單
    document.querySelector('form').reset();
});
