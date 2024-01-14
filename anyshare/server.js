require('dotenv').config()
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const File = require('./models/File');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('public'));

const upload = multer({ dest: 'uploads' });

app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('file'), async (req, res) => {
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,
    }

    if (req.body.password !== null && req.body.password !== '') {
        fileData.password = await bcrypt.hash(req.body.password, 10);
    }

    const file = await File.create(fileData);

    res.render('index', { fileLink: `${req.headers.origin}/file/${file.id}` });
});

app.route('/file/:id').get(handleDownload).post(handleDownload);

async function handleDownload(req, res) {
    try {
        if (!(mongoose.Types.ObjectId.isValid(req.params.id))) {
            // It will suppress BSONError
            res.redirect('/');
            return;
        }

        const file = await File.findById(req.params.id);

        if (file.password != null) {
            if (req.body.password == null) {
                res.render('password');
                return;
            }
    
            if (!(await bcrypt.compare(req.body.password, file.password))) {
                res.render('password', { error: true });
                return;
            }
        }
    
        file.downloadCount++;
        await file.save();
    
        res.download(file.path, file.originalName);
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
}


async function main() {
    try {
      await mongoose
        .connect(MONGO_URI)
        .then(() => {
          console.log('Connected with MongoDB ✅');
        })
        .catch((err) => {
          console.error(`Failed to connect to MongoDB. Error: ${err}`);
        });
  
      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT} 🚀`);
      });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
}

main();