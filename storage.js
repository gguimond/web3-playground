import { Web3Storage } from './node_modules/web3.storage/dist/bundle.esm.min.js'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVDMEU3MzRFNzQ4MDUzNTg0Q2VhYzlGOTgzMzk4MURkMUE5N2Q1Y2MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mzc1Nzk0MzYyMDksIm5hbWUiOiJ0ZXN0In0.UM16Ryv5TJxHK900Fvj3P5RVzoP-Tr-S9cDP6Hi6qHM'
const storage = new Web3Storage({ token })

const get = (async (cid) => {
  const res = await storage.get(cid)
  const files = await res.files()
  let t = ''
  for (const file of files) {
    console.log(file)
    t +=`${file.cid} -- ${file.name} -- ${file.size}<br/>`
    t+= `<a href='${URL.createObjectURL(file)}' download='test'>download</a>`
  }
  document.getElementById('file').innerHTML = t
})
const store = (async () => {
  const cid = await storage.put([new File(['test'], 'test.txt')])
  console.log(cid)
  await get(cid)
})()

const list = (async () => {
  let t = ''
  for await (const upload of storage.list()) {
    t +=`${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}<br/>`
  }
  document.getElementById('files').innerHTML = t
})()