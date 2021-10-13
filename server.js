import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: 'https://vanthedev.com',
	}),
);

app.post('/contact', (req, res) => {
	console.log(req.body);
	async function main() {
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing

		// let testAccount = await nodemailer.createTestAccount();

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			port: 465,
			logger: true,
			debug: true,
			// host: 'smtp.gmail.com',
			// port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: 'vanthedev@gmail.com', // generated ethereal user
				pass: 'byington49', // generated ethereal password
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: `${req.body.name}<${req.body.email}>`, // sender address
			to: 'vanthedev@gmail.com', // list of receivers
			subject: req.body.subject, // Subject line
			text: req.body.message, // plain text body
			// html: '<b>Hello world?</b>', // html body
		});

		console.log('Message sent: %s', info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	}

	main().catch((err) => {
		console.error;
		res.status(400).json({
			error: err,
		});
	});

	res.status(200).json({
		ok: true,
		message: 'Your message was successfully sent 😎',
	});
});

app.listen(9000, () => {
	console.log('App listening on port 9000');
});

// async..await is not allowed in global scope, must use a wrapper
