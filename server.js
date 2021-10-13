import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());

app.post('/contact', (req, res) => {
	console.log(req.body);
	async function main() {
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			// host: 'localhost',
			// port: 587,
			// secure: false, // true for 465, false for other ports
			auth: {
				user: 'vanthedev@gmail.com', // generated ethereal user
				pass: 'byington49', // generated ethereal password
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"Fred Foo 👻" <cbongo83@hotmail.com>', // sender address
			to: 'vanthedev@gmail.com', // list of receivers
			subject: 'Hello ✔', // Subject line
			text: 'Hello world?', // plain text body
			html: '<b>Hello world?</b>', // html body
		});

		console.log('Message sent: %s', info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	}

	main().catch(console.error);

	res.status(200).json({
		ok: true,
	});
});

app.listen(9000, () => {
	console.log('App listening on port 9000');
});

// async..await is not allowed in global scope, must use a wrapper
