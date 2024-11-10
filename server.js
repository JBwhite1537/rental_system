const express = require('express');
const exceljs = require('exceljs');
const app = express();
const port = 3000;

// 設定靜態檔案路徑
app.use(express.static('public'));

// 解析 JSON 資料
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 重製 Excel 檔案
async function resetExcelFile() {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Rentals');
    worksheet.addRow(['使用者姓名', '器材名稱', '租用數量', '租用日期', '歸還日期']);
    await workbook.xlsx.writeFile('rentals.xlsx');
    console.log('Excel 檔案已重製');
}

// 重製 Excel 檔案（根據需求選擇是否執行）
// resetExcelFile();

// 接收表單資料
// 讀取 Excel 並返回租借狀況
app.get('/rental-status', async (req, res) => {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile('rentals.xlsx');
    const worksheet = workbook.getWorksheet(1);
    const rentals = [];

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {  // 跳過標題行
            rentals.push({
                user: row.getCell(1).value,
                equipment: row.getCell(2).value,
                quantity: row.getCell(3).value,
                rentDate: row.getCell(4).value,
                returnDate: row.getCell(5).value
            });
        }
    });

    res.json(rentals); // 返回租借狀況
});

app.post('/submit-rental', async (req, res) => {
    const { user, equipment, quantity, rentDate, returnDate } = req.body;

    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile('rentals.xlsx');
    const worksheet = workbook.getWorksheet(1);

    worksheet.addRow([user, equipment, quantity, rentDate, returnDate]);
    await workbook.xlsx.writeFile('rentals.xlsx');

    res.send('資料已成功提交');
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`伺服器正在運行於 http://localhost:${port}`);
});
