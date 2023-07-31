/* eslint-disable no-undef */
const QRCode = require('qrcode')
const canvas = document.getElementById('canvas')
const canvasQr = document.getElementById('canvas-qr')

const qrText = document.getElementById('qr-text')
const qrFrame = document.getElementById('qr-frame')
const generateBtn = document.getElementById('generate')
const qrMessage = document.getElementById('qr-message')
const qrSave = document.getElementById('qr-save')

const ctx = canvas.getContext("2d");
const width = 132
const height = 132

let frameArgs = []

const qrCheck = (text) => {
  qrMessage.textContent = ''
  qrMessage.removeAttribute('class')
  try {
    if (String(qrText.value).trim() == '') throw new Error('error no value')

    QRCode.toCanvas(canvasQr, text, { margin: 1 })
    frame(...frameArgs)
    qrMessage.classList.add('success')
    qrMessage.textContent = 'text success!'
  }
  catch (error) {
    qrMessage.classList.add('error')
    qrMessage.textContent = error.message
  }
}

qrFrame.addEventListener('change', (e) => {
  switch (e.target.value) {
    case 'no-frame':
      QRCode.toCanvas(canvasQr, qrText.value, { margin: 1 })
      frameArgs = ['no-frame', '']
      frame(...frameArgs)
      break;
    case 'menu-frame':
      frameArgs = ['', 'M E N U', 30]
      QRCode.toCanvas(canvasQr, qrText.value, { margin: 1 })
      frame(...frameArgs)
      break;
    case 'scanme-frame':
      frameArgs = ['', 'SCAN ME', 22]
      QRCode.toCanvas(canvasQr, qrText.value, { margin: 1 })
      frame(...frameArgs)
      break;
    case 'getapp-frame':
      frameArgs = ['', 'GET APP', 25]
      QRCode.toCanvas(canvasQr, qrText.value, { margin: 1 })
      frame(frameArgs)
      break;
    case 'viewpdf-frame':
      frameArgs = ['', 'VIEW PDF', 21]
      QRCode.toCanvas(canvasQr, qrText.value, { margin: 1 })
      frame(...frameArgs)
      break;
    case 'mycontact-frame':
      frameArgs = ['', 'MY CONTACT', 16, 125, '16px']
      QRCode.toCanvas(canvasQr, qrText.value, { margin: 1 })
      frame(...frameArgs)
      break;
    case 'socialmedia-frame':
      frameArgs = ['', 'SOCIAL MEDIA', 10, 125, '16px']
      QRCode.toCanvas(canvasQr, qrText.value, { margin: 1 })
      frame(...frameArgs)
      break;
  }
})

generateBtn.addEventListener('click', () => {
  qrCheck(qrText.value)
})

qrSave.addEventListener('click', () => {
  qrSave.setAttribute('download', 'qr.png');
  qrSave.setAttribute('href', canvas.toDataURL("image/png"));
})

qrText.value = 'max 1000 characters'
QRCode.toCanvas(canvasQr, qrText.value, { margin: 1 })
frame('no-frame')

function frame(frame = '', title = '', x = 0, y = 128, fontSize = '20px') {
  // clear all canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (frame != 'no-frame') {
    // draw rect
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.roundRect(0, 0, width + 5, height, [10, 10]);
    ctx.fill();

  }

  // merge canvas qr
  ctx.beginPath();
  ctx.drawImage(canvasQr, 5, 5, width - 5, height - 30);

  if (frame != 'no-frame')
    // set text
    ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.font = `${fontSize} arial`;
  ctx.fillText(`${title}`, x, y);
}

