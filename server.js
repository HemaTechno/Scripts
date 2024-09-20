const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// مسار لحفظ البيانات في script.json
app.post('/save-script', (req, res) => {
    const newScript = req.body;

    // قراءة البيانات المخزنة مسبقاً
    const filePath = path.join(__dirname, 'scrit.json');
    let scripts = [];

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        scripts = JSON.parse(data);
    }

    // إضافة السكربت الجديد
    scripts.push(newScript);

    // كتابة البيانات المحدثة إلى الملف
    fs.writeFileSync(filePath, JSON.stringify(scripts, null, 2));

    res.json({ message: 'Script saved successfully!' });
});

// تشغيل السيرفر على المنفذ 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
