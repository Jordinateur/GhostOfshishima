const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require('path')


    fs.readFile(path.resolve(__dirname,'folder','Crédit Agricole Brie Picardie.pdf'), async (err, pdfBuffer) => {
        if(err) console.log(err);
        if(err) return;
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        pdfDoc.removePage(0);
        const cap1 = fs.readFileSync(path.resolve(__dirname,'folder','cap1.png'))
        const cap2 = fs.readFileSync(path.resolve(__dirname,'folder','cap2.png'))
        const png1 = await pdfDoc.embedPng(cap1)
        const png2 = await pdfDoc.embedPng(cap2)
        const size = [pdfDoc.getPage(0).getSize().width, pdfDoc.getPage(0).getSize().height]
        const page = pdfDoc.insertPage(0, size)
        page.drawImage(png1, {
            x: 5,
            y: 5,
            width: png1.width,
            height: png1.height,
        })
        page.drawImage(png2, {
            x: 5,
            y: 25 + png1.height + 10,
            width: png2.width,
            height: png2.height,
        })
        const pdfFile = await pdfDoc.save();
        fs.writeFile("example.pdf", pdfFile, "utf8", (err, data) => {
            if (err) console.log(err);
            if (data) console.log(data);
        });
    
    })

