const express = require('express');
const { Database } = require('quick.db');
const cors = require('cors');

const app = express();
const db = new Database();

app.use(cors());
app.use(express.json());

// Endpoint لإضافة البيانات
app.post('/save-data', (req, res) => {
    const { title, description, imageUrl, youtubeLink, scriptText } = req.body;

    // إضافة البيانات إلى قاعدة البيانات
    db.set('data', { title, description, imageUrl, youtubeLink, scriptText })
        .then(() => {
            res.status(200).json({ message: 'تم حفظ البيانات بنجاح!' });
        })
        .catch((error) => {
            res.status(500).json({ message: 'حدث خطأ في حفظ البيانات: ' + error.message });
        });
});

// تشغيل الخادم
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
