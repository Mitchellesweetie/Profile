const express=require('express')
const port=3000
const path=require('path')
require('dotenv').config()

const app=express()
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.render('index.html')
})
app.get('/download-pdf', (req, res) => {
    const filePath = path.join(__dirname, 'files', 'CV.pdf');
    res.download(filePath, 'downloaded-sample.pdf', (err) => {
        if (err) {
            console.error('Error downloading the file:', err);
            res.status(500).send('Error downloading the file');
        }
    });
});


app.post('/email', (req, res) => {
    const { email, message } = req.body;

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Setup email data
    let mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Your email where you want to receive emails
        subject: 'New Message from Contact Form',
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
            res.status(500).send('Something went wrong.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully!');
        }
    });
});



app.listen(port,()=>{
    console.log('server is running http://localhost:3000/')
})