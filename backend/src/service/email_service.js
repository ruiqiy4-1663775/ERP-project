const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs')

const dir = 'public/files';

// Create the directory if it doesn't exist
fs.mkdir(dir, { recursive: true }, (err) => {
  if (err) throw err;

  const doc = new PDFDocument();
  const path = `${dir}/invoice.pdf`;

  doc.pipe(fs.createWriteStream(path)); // Write to a file
  doc.text('Hello, world!');
  doc.end();
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'richyyu1003@gmail.com',
        pass: 'vamjbufibmzlbbvj'
    }
});

const signature = `
    <table style="color:rgb(34,34,34);border:none;border-collapse:collapse">
        <tbody>
            <tr style="height:105.794pt">
                <td style="border-right:1.4974pt solid rgb(213,173,0);vertical-align:top;padding:5pt 6pt 5pt 5pt;overflow:hidden">
                    <br><img src="https://bernardmarr.com/img/What%20is%20an%20Artificial%20Neural%20Networks.jpg" 
                        width="113" height="122" style="margin-left:0px;margin-top:0px"><br>
                </td>
                <td style="border-left:1.4974pt solid rgb(213,173,0);vertical-align:top;padding:5pt 5pt 5pt 6pt;overflow:hidden">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><b style="font-size:13.3333px;color:rgb(213,173,0);font-family:&quot;PT Serif&quot;,serif">Richy Yu</b><br></p>
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><font color="#000000" face="PT Serif, serif"><span style="font-size:13.3333px"><b>The company name</b></span></font></p>
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;
                        font-family:&quot;PT Serif&quot;,serif;color:rgb(213,173,0);background-color:transparent;
                        vertical-align:baseline">p:</span><span style="font-size:11pt;font-family:&quot;PT Serif&quot;
                        ,serif;color:rgb(213,173,0);background-color:transparent;vertical-align:baseline"> </span>
                        <span style="font-size:10pt;font-family:&quot;PT Serif&quot;,serif;color:rgb(0,0,0);
                        background-color:transparent;vertical-align:baseline">2064145622</span>
                    </p>
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;
                        font-family:&quot;PT Serif&quot;,serif;color:rgb(213,173,0);background-color:transparent;
                        vertical-align:baseline">w:</span><a href="https://lionsfloor.com/" style="color:rgb(17,85,204)" 
                        target="_blank"><span style="font-size:10pt;font-family:&quot;PT Serif&quot;,serif;
                        color:rgb(213,173,0);background-color:transparent;vertical-align:baseline"> </span>
                        <span style="font-size:10pt;font-family:&quot;PT Serif&quot;,serif;color:rgb(0,0,255);
                        background-color:transparent;vertical-align:baseline">company's website</span></a>
                    </p>
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:
                        11pt;font-family:&quot;PT Serif&quot;,serif;color:rgb(213,173,0);background-color:transparent;
                        vertical-align:baseline">a: </span><span style="font-size:10pt;font-family:&quot;
                        PT Serif&quot;,serif;color:rgb(0,0,0);background-color:transparent;vertical-align:baseline">
                        Company address | Los Angeles | CA 90017</span></p>
                </td>
            </tr>
        </tbody>
    </table>
`

function generateContent(orderInfo) {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: black; padding: 20px; background: white;">
            <h1>Order Confirmation</h1>
            <p>Thank you for your order! Here are the details:</p>
            <p><strong>Order Number:</strong> ${orderInfo.orderNumber}</p>
            <p><strong>Date:</strong> ${orderInfo.date}</p>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc;">
                <thead>
                <tr>
                    <th style="padding: 5px; border: 1px solid #ccc;">Product</th>
                    <th style="padding: 5px; border: 1px solid #ccc;">Quantity</th>
                    <th style="padding: 5px; border: 1px solid #ccc;">Unit Price</th>
                </tr>
                </thead>
                <tbody>
                    ${orderInfo.items.map(item => `
                    <tr>
                        <td style="padding: 5px;">${item.name}</td>
                        <td style="padding: 5px;">${item.quantity}</td>
                        <td style="padding: 5px;">$${item.price}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            <p><strong>Total:</strong> $${orderInfo.total}</p>
            <!-- Rest of the email content, including signature -->
            ${signature}
        </div>
    `;
    return htmlContent
}

function mailOptions(orderInfo, customerEmail) {
    const options = {
        from: '"My Company" <richyyu1003@gmail.com>',
        to: customerEmail,
        subject: 'Order Comfirmation',
        text: 'This is a notification email!',
        html: generateContent(orderInfo),
        attachments: [
            {
                filename: 'invoice.pdf',
                path: 'public/files/invoice.pdf' // Path to the PDF file
            }
        ]
    };

    return options;
}

function mailOrderConfirmation(orderInfo, customerEmail, orderId, ) {
    let options = mailOptions(orderInfo, customerEmail)
    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

module.exports = {mailOrderConfirmation}
