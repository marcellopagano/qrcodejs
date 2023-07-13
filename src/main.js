/* eslint-disable no-undef */
const QRCode = require('qrcode')
const jwtDecode = require('jwt-decode')
const canvas = document.getElementById('canvas')

const qrText = document.getElementById('qr-text')
const generateBtn = document.getElementById('generate')
const qrType = document.getElementById('qr-type')
const qrMessage = document.getElementById('qr-message')
const qrSave = document.getElementById('qr-save')

const qrCheck = (text, qrType) => {
  qrMessage.textContent = ''
  qrMessage.removeAttribute('class')
  try {
    if (String(qrText.value).trim() == '') throw new Error('error no value')
    switch (qrType) {
      case 'text':
        QRCode.toCanvas(canvas, text)
        qrMessage.classList.add('success')
        qrMessage.textContent = 'text success!'
        break;
      case 'jwt':
        QRCode.toCanvas(canvas, JSON.stringify(jwtDecode(text)))
        qrMessage.classList.add('success')
        qrMessage.textContent = 'jwt success!'
        break;
    }
  } catch (error) {
    qrMessage.classList.add('error')
    qrMessage.textContent = error.message
  }
}
generateBtn.addEventListener('click', () => {
  qrCheck(qrText.value, qrType.value)
})

qrSave.addEventListener('click', () => {
  qrSave.setAttribute('download', 'qr.png');
  qrSave.setAttribute('href', canvas.toDataURL("image/png"));
})

qrText.value = 'max 1000 characters'
QRCode.toCanvas(canvas, qrText.value)
